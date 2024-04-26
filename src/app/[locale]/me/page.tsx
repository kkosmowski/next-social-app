import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import session from '@/app/api/[utils]/SessionClient';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import UserDetails from '@/components/UserDetails';
import type { ServerComponentProps } from '@/types/common';
import validateLocale from '@/i18n/validateLocale';

import styles from './page.module.css';
import YourPosts from './YourPosts';
import YourComments from './YourComments';
import YourLikes from './YourLikes';

async function MePage({ params: { locale } }: ServerComponentProps) {
  const { isLoggedIn, user } = await session.refreshData(cookies().toString());

  if (!isLoggedIn) {
    redirect(dynamicRoute(Routes.home, { locale }));
  }

  return (
    <section className={`page-section ${styles.wrapper}`}>
      <UserDetails user={user} locale={validateLocale(locale)} />
      <YourPosts />
      <YourComments />
      <YourLikes />
    </section>
  );
}

export default MePage;
