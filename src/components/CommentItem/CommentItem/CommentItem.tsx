import type { Comment, SubComment } from '@/types/comment';
import CommentActions from '@/components/CommentActions';
import ItemDetails from '@/components/ItemDetails';
import ItemContent from '@/components/ItemContent';
import type { Locale } from '@/types/i18n';
import isSubComment from '@/utils/isSubComment';

type Props = {
  comment: Comment | SubComment;
  repliesVisible: boolean;
  locale: Locale;
  onEdit: VoidFunction;
  onReply: VoidFunction;
  onDelete: VoidFunction;
  onToggleReplies?: VoidFunction;
};

function CommentItem({ locale, repliesVisible, comment, onEdit, onReply, onDelete, onToggleReplies }: Props) {
  const { id, content, user, created, updated, likes } = comment;
  const _isSubComment = isSubComment(comment);
  const repliesCount = _isSubComment ? 0 : comment.subComments.length;

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
      <CommentActions
        commentId={id}
        isSubComment={_isSubComment}
        repliesCount={repliesCount}
        repliesVisible={repliesVisible}
        likes={likes}
        onReply={onReply}
        onToggleReplies={onToggleReplies}
      />
    </>
  );
}

export default CommentItem;
