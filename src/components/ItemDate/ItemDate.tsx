'use client';

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
      {isEdited && <span title={formatDate(updated, 'd-MM-yyyy hh:mm')}> {t('COMMON.EDITED')}</span>}
    </time>
  );
}

export default ItemDate;
