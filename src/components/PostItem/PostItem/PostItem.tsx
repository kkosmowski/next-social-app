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
  onEdit: VoidFunction;
  onComment: (element: HTMLDivElement | null) => void;
  onDelete: VoidFunction;
};

function PostItem(props: Props) {
  const { templateRef, locale, id, title, content, user, tags, likes, created, updated, onEdit, onComment, onDelete } =
    props;

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

        <PostActions postId={id} likes={likes} onComment={() => onComment(templateRef.current)} />
      </article>

      <div className={styles.commentTemplate} ref={templateRef} />
    </>
  );
}

export default PostItem;
