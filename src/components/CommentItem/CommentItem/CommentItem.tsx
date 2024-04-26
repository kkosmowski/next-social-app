import type { Comment } from '@/types/comment';
import CommentActions from '@/components/CommentActions';
import ItemDetails from '@/components/ItemDetails';
import ItemContent from '@/components/ItemContent';
import type { Locale } from '@/types/i18n';

type Props = Comment & {
  locale: Locale;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
};

function CommentItem({ locale, id, content, user, created, updated, likes, onEdit, onDelete }: Props) {
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
      <CommentActions commentId={id} likes={likes} />
    </>
  );
}

export default CommentItem;
