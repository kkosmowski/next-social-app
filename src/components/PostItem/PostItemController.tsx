'use client';

import type { Post } from '@/types/post';
import CommentSection from '@/components/CommentSection';
import useBoolean from '@/hooks/useBoolean';

import PostItem from './PostItem';
import PostItemEditor from './PostItemEditor';

function PostItemController(post: Post) {
  const [isEditMode, { set: setEditMode, unset: unsetEditMode }] = useBoolean(false);
  const [isAddingComment, { set: setAddingComment, unset: unsetAddingComment }] = useBoolean(false);

  return (
    <article>
      {isEditMode ? (
        <PostItemEditor {...post} onClose={unsetEditMode} />
      ) : (
        <PostItem {...post} onEdit={setEditMode} onComment={setAddingComment} />
      )}

      <CommentSection post={post} isAddingNewComment={isAddingComment} onCloseAddingComment={unsetAddingComment} />
    </article>
  );
}

export default PostItemController;
