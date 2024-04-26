import type { ServerComponentProps } from '@/types/common';
import api from '@/api';
import endpoints from '@/consts/endpoints';
import dynamicEndpoint from '@/app/utils/dynamicEndpoint';
import type { GetUserResponse } from '@/types/user';
import BackButton from '@/components/BackButton';
import UserDetails from '@/components/UserDetails';
import validateLocale from '@/i18n/validateLocale';

async function getUserData(username: string) {
  return api.get<GetUserResponse>(dynamicEndpoint(endpoints.user, { username }));
}

async function UserPage({ params }: ServerComponentProps<{}, { username: string }>) {
  const { username, locale } = params;

  const user = await getUserData(username);

  return (
    <section className="page-section">
      <BackButton />

      <UserDetails user={user} locale={validateLocale(locale)} />
    </section>
  );
}

export default UserPage;
