import type { Comment, SubComment } from '@/types/comment';
import CommentActions from '@/components/CommentActions';
import ItemDetails from '@/components/ItemDetails';
import ItemContent from '@/components/ItemContent';
import type { Locale } from '@/types/i18n';

type Props = {
  comment: Comment | SubComment;
  locale: Locale;
  onEdit: VoidFunction;
  onReply: VoidFunction;
  onDelete: VoidFunction;
};

function CommentItem({ locale, comment, onEdit, onReply, onDelete }: Props) {
  const { id, content, user, created, updated, likes } = comment;
  return (
    <>
      <ItemDetails
        locale={locale}
        created={created}
        updated={updated}
        user={user}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <ItemContent content={content} smallPadding />
      <CommentActions commentId={id} likes={likes} onReply={onReply} />
    </>
  );
}

export default CommentItem;
