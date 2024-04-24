'use client';

import useIntl from '@/app/hooks/useIntl';
import AddNewPost from '@/components/AddNewPost';
import useBoolean from '@/hooks/useBoolean';

import styles from './PostsFeedHeader.module.css';

function PostsFeedHeader() {
  const { t } = useIntl();
  const [isAddingPost, { set: setAddingPost, unset: unsetAddingPost }] = useBoolean(false);

  return (
    <>
      <header className={styles.header}>
        <h2>{t('POSTS.TITLE')}</h2>
        {!isAddingPost && (
          <button className="ghost primary" onClick={setAddingPost}>
            + {t('POSTS.CREATE')}
          </button>
        )}
      </header>

      {isAddingPost && <AddNewPost onClose={unsetAddingPost} />}
    </>
  );
}

export default PostsFeedHeader;
