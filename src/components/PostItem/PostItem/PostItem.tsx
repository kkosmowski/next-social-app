import type { MutableRefObject } from 'react';

import type { Post } from '@/types/post';
import TagsList from '@/components/TagsList';
import PostActions from '@/components/PostActions';
import ItemDetails from '@/components/ItemDetails';
import ItemContent from '@/components/ItemContent';
import type { Locale } from '@/types/i18n';

import styles from './PostItem.module.css';

type Props = Post & {
  templateRef: MutableRefObject<HTMLDivElement | null>;
  locale: Locale;
  commentsVisible: boolean;
  onEdit: VoidFunction;
  onComment: (element: HTMLDivElement | null) => void;
  onDelete: VoidFunction;
  onToggleComments: VoidFunction;
};

function PostItem(props: Props) {
  const {
    templateRef,
    locale,
    id,
    title,
    content,
    user,
    tags,
    comments,
    likes,
    created,
    updated,
    commentsVisible,
    onEdit,
    onComment,
    onDelete,
    onToggleComments,
  } = props;

  const totalCommentsCount = comments.reduce((total, comment) => total + 1 + comment.subComments.length, 0);

  return (
    <>
      <article className={`${styles.wrapper} card`}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </header>

        <ItemDetails
          locale={locale}
          user={user}
          created={created}
          updated={updated}
          onEdit={onEdit}
          onDelete={onDelete}
        />

        <ItemContent content={content} />

        <TagsList tags={tags} />

        <PostActions
          postId={id}
          likes={likes}
          commentsVisible={commentsVisible}
          commentsCount={totalCommentsCount}
          onComment={() => onComment(templateRef.current)}
          onToggleComments={onToggleComments}
        />
      </article>

      <div className={styles.commentTemplate} ref={templateRef} />
    </>
  );
}

export default PostItem;
