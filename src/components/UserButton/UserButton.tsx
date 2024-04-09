'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Backdrop from '@/components/Backdrop';
import useIntl from '@/app/hooks/useIntl';
import { Routes } from '@/consts/navigation';
import type { NavLink } from '@/types/navigation';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { useAuth } from '@/contexts/AuthProvider';

import styles from './UserButton.module.css';

const userButtonOptions: NavLink[] = [
  {
    key: Routes.profile,
    route: ({ localeCode }) => dynamicRoute(Routes.profile, { localeCode }),
    label: 'NAV.USER.PROFILE',
    access: 'logged-only',
  },
  {
    key: Routes.editProfile,
    route: ({ localeCode }) => dynamicRoute(Routes.editProfile, { localeCode }),
    label: 'NAV.USER.EDIT',
    access: 'logged-only',
  },
  {
    key: Routes.settings,
    route: ({ localeCode }) => dynamicRoute(Routes.settings, { localeCode }),
    label: 'NAV.USER.SETTINGS',
    access: 'logged-only',
  },
];

function UserButton() {
  const { t, localeCode } = useIntl();
  const { user, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((visible) => !visible);
  };

  return (
    <section className={styles.wrapper}>
      <button className={`${styles.button} xs-icon`} onClick={toggleMenu}>
        {user?.avatarUrl ? (
          <Image src={user.avatarUrl} className={styles.avatar} width={24} height={24} alt={t('NAV.USER.AVATAR_ALT')} />
        ) : (
          <span className={styles.avatar}>{user?.username.slice(0, 1) ?? '-'}</span>
        )}
        <span className={styles.name}>Krzysztof</span>
      </button>

      {menuVisible && (
        <>
          <Backdrop onClick={toggleMenu} />
          <menu className={styles.floatingMenu} onClick={toggleMenu}>
            {userButtonOptions.map(({ key, route, label }) => (
              <Link key={key} href={route({ localeCode })} className={styles.menuItem}>
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
