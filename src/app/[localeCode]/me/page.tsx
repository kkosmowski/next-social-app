import { redirect } from 'next/navigation';

import session from '@/app/api/[utils]/SessionClient';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { Routes } from '@/consts/navigation';
import UserDetails from '@/components/UserDetails';

import styles from './page.module.css';
import YourPosts from './YourPosts';
import YourComments from './YourComments';
import YourLikes from './YourLikes';

async function MePage() {
  const { isLoggedIn, user } = await session.getData();

  if (!isLoggedIn) {
    redirect(dynamicRoute(Routes.home));
  }

  return (
    <section className={`page-section ${styles.wrapper}`}>
      <UserDetails user={user} />
      <YourPosts />
      <YourComments />
      <YourLikes />
    </section>
  );
}

export default MePage;
