import Link from 'next/link';

import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import type { Model } from '@/types/common';
import type { User } from '@/types/user';
import ItemControls from '@/components/ItemControls';
import ItemDate from '@/components/ItemDate';
import type { Locale } from '@/types/i18n';

import styles from './ItemDetails.module.css';

type Props = Pick<Model, 'id' | 'created' | 'updated'> & {
  locale: Locale;
  noSpacing?: boolean;
  noEditInfo?: boolean;
  user: User;
} & (
    | {
        noControls?: never;
        onEdit: VoidFunction;
        onDelete: VoidFunction;
      }
    | { noControls: true; onEdit?: never; onDelete?: never }
  );

function ItemDetails({
  locale,
  noSpacing,
  noEditInfo,
  id,
  user,
  created,
  updated,
  noControls,
  onEdit,
  onDelete,
}: Props) {
  return (
    <section className={`${styles.details} ${noSpacing && styles.noSpacing}`}>
      <address className={styles.author}>
        <Link href={dynamicRoute(Routes.user, { username: user.username, locale })}>{user.username}</Link>
      </address>

      <ItemDate id={id} noEditInfo={noEditInfo} created={created} updated={updated} />

      {!noControls && <ItemControls authorId={user.id} onEdit={onEdit} onDelete={onDelete} />}
    </section>
  );
}

export default ItemDetails;
