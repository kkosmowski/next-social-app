'use client';

import History from '@mui/icons-material/History';
import Link from 'next/link';

import formatDate from '@/utils/formatDate';
import useIntl from '@/app/hooks/useIntl';
import type { Model } from '@/types/common';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';

import styles from './ItemDate.module.css';

type Props = Pick<Model, 'id' | 'created' | 'updated'> & {
  noEditInfo?: boolean;
};

function ItemDate({ id, created, updated, noEditInfo }: Props) {
  const { t, locale } = useIntl();
  const isEdited = created !== updated;

  return (
    <Link href={dynamicRoute(Routes.post, { postId: id, locale })}>
      <time className={styles.date}>
        {formatDate(created, 'd-MM-yyyy hh:mm')}
        {isEdited && !noEditInfo && (
          <span className={styles.edited} title={formatDate(updated, 'd-MM-yyyy hh:mm')}>
            &nbsp;
            <span className="md-only">{t('COMMON.EDITED')}</span>
            <History className="xs-only" />
          </span>
        )}
      </time>
    </Link>
  );
}

export default ItemDate;
