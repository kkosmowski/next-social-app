'use client';

import { useRouter } from 'next/navigation';

import useIntl from '@/app/hooks/useIntl';
import { useAuth } from '@/contexts/AuthProvider';
import { useConfirmation } from '@/contexts/ConfirmationProvider/ConfirmationProvider';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import { handleError } from '@/utils/handleError';

import styles from './PostControls.module.css';

type Props = {
  postId: string;
  authorId: string;
};

function PostControls({ postId, authorId }: Props) {
  const { t } = useIntl();
  const { user } = useAuth();
  const { ask } = useConfirmation();
  const router = useRouter();

  if (authorId !== user?.id) {
    return null;
  }

  const deletePost = async () => {
    try {
      await api.delete(dynamicEndpoint(endpoints.post, { postId }));
      router.refresh();
    } catch (e) {
      const error = handleError(e);
      console.error(t(error.message));
    }
  };

  const handleDelete = () => {
    ask(
      {
        title: 'POSTS.DELETE.CONFIRM.TITLE',
        description: 'POSTS.DELETE.CONFIRM.DESCRIPTION',
      },
      { onConfirm: deletePost },
    );
  };

  return (
    <aside className={styles.wrapper}>
      {'|'}
      <button className="primary ghost">{t('COMMON.EDIT')}</button>
      <button className="error ghost" onClick={handleDelete}>
        {t('COMMON.DELETE')}
      </button>
    </aside>
  );
}

export default PostControls;
