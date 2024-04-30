import type { ServerComponentProps } from '@/types/common';
import PostsFeed from '@/components/PostsFeed';
import getIntl from '@/app/utils/getIntl';

import styles from './page.module.css';

type Props = ServerComponentProps<{}, { tagName: string }>;

async function TaggedPostsPage({ params }: Props) {
  const { t } = await getIntl(params.locale);

  return (
    <section className="page-section">
      <h2 className={styles.title}>
        {t('POSTS.WITH_TAG.TITLE', { tagName: params.tagName, em: (str) => <em>{str}</em> })}
      </h2>

      <PostsFeed hideHeader simplified small params={{ tagName: params.tagName }} />
    </section>
  );
}

export default TaggedPostsPage;
