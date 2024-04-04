import type { NavLink } from '@/types/navigation';
import dynamicRoute from '@/app/utils/dynamicRoute';

export enum Routes {
  home = '/:localeCode/',
  messages = '/:localeCode/messages',
  profile = '/:localeCode/me',
  editProfile = '/:localeCode/edit-profile',
  settings = '/:localeCode/settings',
}

export const navigationLinks: NavLink[] = [
  {
    key: Routes.home,
    route: ({ localeCode }) => dynamicRoute(Routes.home, { localeCode }),
    label: 'NAV.HOME',
    access: 'all',
  },
  {
    key: Routes.messages,
    route: ({ localeCode }) => dynamicRoute(Routes.messages, { localeCode }),
    label: 'NAV.MESSAGES',
    access: 'logged-only',
  },
];
