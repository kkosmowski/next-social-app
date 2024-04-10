import { redirect } from 'next/navigation';

import type { PageProps } from '@/types/common';
import session from '@/app/api/[utils]/SessionClient';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import UserDetails from '@/components/UserDetails';
import validateLocaleCode from '@/i18n/validateLocaleCode';

import styles from './page.module.css';
import YourPosts from './YourPosts';
import YourComments from './YourComments';
import YourLikes from './YourLikes';

async function MePage({ params: { localeCode } }: PageProps) {
  const { isLoggedIn, user } = await session.getData();

  if (!isLoggedIn) {
    redirect(dynamicRoute(Routes.home, { localeCode }));
  }

  return (
    <section className={`page-section ${styles.wrapper}`}>
      <UserDetails user={user} localeCode={validateLocaleCode(localeCode)} />
      <YourPosts />
      <YourComments />
      <YourLikes />
    </section>
  );
}

export default MePage;
