import type { Post } from '@/types/post';
import TagsList from '@/components/TagsList';
import ItemDetails from '@/components/ItemDetails';
import ItemContent from '@/components/ItemContent';
import type { Locale } from '@/types/i18n';

import styles from './PostItemSimplified.module.css';

type Props = Post & {
  small?: boolean;
  locale: Locale;
};

function PostItemSimplified(props: Props) {
  const { locale, small, id, title, content, user, tags, created, updated } = props;

  return (
    <>
      <article className={`${styles.wrapper} card ${small && styles.small}`}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </header>

        <ItemDetails
          noSpacing={small}
          noEditInfo
          noControls
          id={id}
          locale={locale}
          user={user}
          created={created}
          updated={updated}
        />

        <ItemContent noSpacing={small} content={content} />

        <TagsList locale={locale} tags={tags} />
      </article>
    </>
  );
}

export default PostItemSimplified;
