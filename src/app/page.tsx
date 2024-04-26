import { redirect } from 'next/navigation';

import { Routes } from '@/consts/navigation';
import dynamicRoute from '@/app/utils/dynamicRoute';
import type { ServerComponentProps } from '@/types/common';

async function RootRoute({ params: { locale } }: ServerComponentProps) {
  redirect(dynamicRoute(Routes.home, { locale }));
}

export default RootRoute;
