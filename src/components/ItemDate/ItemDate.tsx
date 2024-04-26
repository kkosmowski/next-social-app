'use client';

import History from '@mui/icons-material/History';

import formatDate from '@/utils/formatDate';
import useIntl from '@/app/hooks/useIntl';
import type { Model } from '@/types/common';

import styles from './ItemDate.module.css';

function ItemDate({ created, updated }: Pick<Model, 'created' | 'updated'>) {
  const { t } = useIntl();
  const isEdited = created !== updated;

  return (
    <time className={styles.date}>
      {formatDate(created, 'd-MM-yyyy hh:mm')}
      {isEdited && (
        <span className={styles.edited} title={formatDate(updated, 'd-MM-yyyy hh:mm')}>
          &nbsp;
          <span className="md-only">{t('COMMON.EDITED')}</span>
          <History className="xs-only" />
        </span>
      )}
    </time>
  );
}

export default ItemDate;
