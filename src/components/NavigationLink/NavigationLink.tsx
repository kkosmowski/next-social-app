'use client';

import Link from 'next/link';

import type { NavLink, RouteAccess } from '@/types/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import useIntl from '@/app/hooks/useIntl';
import type { DynamicRoute } from '@/app/utils/dynamicRoute';

type Props = Omit<NavLink, 'route'> & {
  route: DynamicRoute;
};

function hasAccess(access: RouteAccess, isLoggedIn: boolean | undefined) {
  if (access === 'all') return true;
  if (access === 'guest-only') return !isLoggedIn;
  if (access === 'logged-only') return isLoggedIn;
}

function NavigationLink({ route, label, access }: Props) {
  const { t } = useIntl();
  const { isLoggedIn } = useAuth();

  if (hasAccess(access, isLoggedIn)) {
    return <Link href={route}>{t(label)}</Link>;
  }
  return <></>;
}

export default NavigationLink;
