'use client';

import type { ReactPortal } from 'react';
import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

import type { Post } from '@/types/post';
import CommentSection from '@/components/CommentSection';
import useBoolean from '@/hooks/useBoolean';
import api from '@/api';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import endpoints from '@/consts/endpoints';
import { handleError } from '@/utils/handleError';
import useIntl from '@/app/hooks/useIntl';
import { useConfirmation } from '@/contexts/ConfirmationProvider';
import AddNewComment from '@/components/AddNewComment';
import type { Comment, SubComment } from '@/types/comment';

import PostItemEditor from './PostItemEditor';
import PostItem from './PostItem';

function PostItemController(post: Post) {
  const [isEditMode, { set: setEditMode, unset: unsetEditMode }] = useBoolean(false);
  const router = useRouter();
  const { t, locale } = useIntl();
  const { ask } = useConfirmation();
  const templateRef = useRef<HTMLDivElement | null>(null);
  const [Portal, setPortal] = useState<ReactPortal | null>(null);

  const handleAddComment = (element: HTMLDivElement | null, comment?: Comment | SubComment) => {
    if (!element) return;

    setPortal(createPortal(<AddNewComment post={post} comment={comment} onClose={() => setPortal(null)} />, element));
  };

  const handleDelete = async () => {
    try {
      await api.delete(dynamicEndpoint(endpoints.post, { postId: post.id }));
      router.refresh();
    } catch (e) {
      const error = handleError(e);
      console.error(t(error.message));
    }
  };

  const confirmDelete = () => {
    ask(
      {
        title: 'POSTS.DELETE.CONFIRM.TITLE',
        description: 'POSTS.DELETE.CONFIRM.DESCRIPTION',
      },
      { onConfirm: handleDelete },
    );
  };

  return (
    <section>
      {isEditMode ? (
        <PostItemEditor {...post} onClose={unsetEditMode} />
      ) : (
        <PostItem
          templateRef={templateRef}
          {...post}
          locale={locale}
          onEdit={setEditMode}
          onComment={handleAddComment}
          onDelete={confirmDelete}
        />
      )}
      {Portal}

      <CommentSection post={post} onReply={handleAddComment} />
    </section>
  );
}

export default PostItemController;
