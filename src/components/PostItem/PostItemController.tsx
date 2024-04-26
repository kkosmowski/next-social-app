'use client';

import { useRouter } from 'next/navigation';

import type { Post } from '@/types/post';
import CommentSection from '@/components/CommentSection';
import useBoolean from '@/hooks/useBoolean';
import api from '@/api';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import endpoints from '@/consts/endpoints';
import { handleError } from '@/utils/handleError';
import useIntl from '@/app/hooks/useIntl';
import { useConfirmation } from '@/contexts/ConfirmationProvider';

import PostItemEditor from './PostItemEditor';
import PostItem from './PostItem';

function PostItemController(post: Post) {
  const [isEditMode, { set: setEditMode, unset: unsetEditMode }] = useBoolean(false);
  const [isAddingComment, { set: setAddingComment, unset: unsetAddingComment }] = useBoolean(false);
  const router = useRouter();
  const { t, locale } = useIntl();
  const { ask } = useConfirmation();

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
          {...post}
          locale={locale}
          onEdit={setEditMode}
          onComment={setAddingComment}
          onDelete={confirmDelete}
        />
      )}

      <CommentSection post={post} isAddingNewComment={isAddingComment} onCloseAddingComment={unsetAddingComment} />
    </section>
  );
}

export default PostItemController;
