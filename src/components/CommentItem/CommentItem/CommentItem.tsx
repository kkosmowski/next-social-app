import type { Comment } from '@/types/comment';
import CommentActions from '@/components/CommentActions';
import ItemDetails from '@/components/ItemDetails';
import ItemContent from '@/components/ItemContent';

type Props = Comment & {
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

function CommentItem({ id, content, user, created, updated, likes, onEdit, onDelete }: Props) {
  return (
    <>
      <ItemDetails created={created} updated={updated} user={user} onEdit={onEdit} onDelete={onDelete} />
      <ItemContent content={content} smallPadding />
      <CommentActions commentId={id} likes={likes} />
    </>
  );
}

export default CommentItem;
