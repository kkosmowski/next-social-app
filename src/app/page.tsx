import { redirect } from 'next/navigation';

import { Routes } from '@/consts/navigation';
import dynamicRoute from '@/app/utils/dynamicRoute';
import { defaultLocale } from '@/i18n/config';

async function RootRoute() {
  redirect(dynamicRoute(Routes.home, { locale: defaultLocale }));
}

export default RootRoute;
