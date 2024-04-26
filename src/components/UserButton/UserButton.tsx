'use client';

import Image from 'next/image';
import Link from 'next/link';

import Backdrop from '@/components/Backdrop';
import useIntl from '@/app/hooks/useIntl';
import { Routes } from '@/consts/navigation';
import type { NavLink } from '@/types/navigation';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { useAuth } from '@/contexts/AuthProvider';
import useBoolean from '@/hooks/useBoolean';

import styles from './UserButton.module.css';

const userButtonOptions: NavLink[] = [
  {
    key: Routes.profile,
    route: ({ locale }) => dynamicRoute(Routes.profile, { locale }),
    label: 'NAV.USER.PROFILE',
    access: 'logged-only',
  },
  {
    key: Routes.editProfile,
    route: ({ locale }) => dynamicRoute(Routes.editProfile, { locale }),
    label: 'NAV.USER.EDIT',
    access: 'logged-only',
  },
  {
    key: Routes.settings,
    route: ({ locale }) => dynamicRoute(Routes.settings, { locale }),
    label: 'NAV.USER.SETTINGS',
    access: 'logged-only',
  },
];

function UserButton() {
  const { t, locale } = useIntl();
  const { user, logout } = useAuth();
  const [menuVisible, { set: showMenu, unset: hideMenu }] = useBoolean(false);

  return (
    <section className={styles.wrapper}>
      <button className={`${styles.button} xs-icon`} onClick={showMenu}>
        {user?.avatarUrl ? (
          <Image src={user.avatarUrl} className={styles.avatar} width={24} height={24} alt={t('NAV.USER.AVATAR_ALT')} />
        ) : (
          <span className={styles.avatar}>{user?.username.slice(0, 1) ?? '-'}</span>
        )}
        <span className={styles.name}>{user?.username}</span>
      </button>

      {menuVisible && (
        <>
          <Backdrop onClick={hideMenu} />
          <menu className={styles.floatingMenu} onClick={hideMenu}>
            {userButtonOptions.map(({ key, route, label }) => (
              <Link key={key} href={route({ locale })} className={styles.menuItem}>
                {t(label)}
              </Link>
            ))}

            <button className={`${styles.menuItem} ghost`} onClick={logout}>
              {t('NAV.USER.LOGOUT')}
            </button>
          </menu>
        </>
      )}
    </section>
  );
}

export default UserButton;
