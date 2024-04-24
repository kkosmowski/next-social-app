import Link from 'next/link';

import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import formatDate from '@/utils/formatDate';
import type { Model } from '@/types/common';
import type { User } from '@/types/user';

import styles from './ItemDetails.module.css';

type Props = Pick<Model, 'created'> & {
  user: User;
};

function ItemDetails({ user, created }: Props) {
  return (
    <section className={styles.details}>
      <address className={styles.author}>
        <Link href={dynamicRoute(Routes.user, { username: user.username })}>{user.username}</Link>
      </address>

      <time className={styles.date}>{formatDate(created, 'd-MM-yyyy hh:mm')}</time>
    </section>
  );
}

export default ItemDetails;
