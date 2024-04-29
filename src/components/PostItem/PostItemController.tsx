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
import { LS_FALSE } from '@/consts/common';

import PostItemEditor from './PostItemEditor';
import PostItem from './PostItem';

const commentsVisibilityKey = (postId: string) => `${postId}_comments_visible`;

function loadCommentsVisibility(post: Post) {
  if (!post.comments.length) {
    return true;
  }
  return localStorage.getItem(commentsVisibilityKey(post.id)) !== LS_FALSE;
}

function PostItemController(post: Post) {
  const [isEditMode, { set: setEditMode, unset: unsetEditMode }] = useBoolean(false);
  const [commentsVisible, { toggle: toggleCommentsVisibility }] = useBoolean(loadCommentsVisibility(post));
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

  const handleToggleComments = () => {
    toggleCommentsVisibility((value) => {
      const key = commentsVisibilityKey(post.id);
      if (value) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, LS_FALSE);
      }
    });
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
          commentsVisible={commentsVisible}
          onEdit={setEditMode}
          onComment={handleAddComment}
          onDelete={confirmDelete}
          onToggleComments={handleToggleComments}
        />
      )}
      {Portal}

      <CommentSection visible={commentsVisible} items={post.comments} onReply={handleAddComment} />
    </section>
  );
}

export default PostItemController;
