'use client';

import { useState } from 'react';

import useIntl from '@/app/hooks/useIntl';
import AddNewPost from '@/components/AddNewPost';

import styles from './PostsFeedHeader.module.css';

function PostsFeedHeader() {
  const { t } = useIntl();
  const [isAddingNewPost, setIsAddingNewPost] = useState(false);

  const toggleAddingNewPost = () => {
    setIsAddingNewPost((value) => !value);
  };

  return (
    <>
      <header className={styles.header}>
        <h2>{t('POSTS.TITLE')}</h2>
        {!isAddingNewPost && (
          <button className="ghost primary" onClick={toggleAddingNewPost}>
            + {t('POSTS.CREATE')}
          </button>
        )}
      </header>

      {isAddingNewPost && <AddNewPost onClose={toggleAddingNewPost} />}
    </>
  );
}

export default PostsFeedHeader;
