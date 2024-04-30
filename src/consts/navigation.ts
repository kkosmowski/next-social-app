import type { NavLink } from '@/types/navigation';
import dynamicRoute from '@/app/utils/dynamicRoute';

export enum Routes {
  home = '/:locale/',
  messages = '/:locale/messages',
  profile = '/:locale/me',
  editProfile = '/:locale/edit-profile',
  settings = '/:locale/settings',

  login = '/:locale/login',

  user = '/:locale/users/:username',

  post = '/:locale/post/:postId',

  taggedPosts = '/:locale/tag/:tagName',
}

export const navigationLinks: NavLink[] = [
  {
    key: Routes.home,
    route: ({ locale }) => dynamicRoute(Routes.home, { locale }),
    label: 'NAV.HOME',
    access: 'all',
  },
  {
    key: Routes.messages,
    route: ({ locale }) => dynamicRoute(Routes.messages, { locale }),
    label: 'NAV.MESSAGES',
    access: 'logged-only',
  },
];
