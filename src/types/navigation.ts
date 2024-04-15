import type { Routes } from '@/consts/navigation';
import type { TranslationKey } from '@/types/i18n';
import type { DynamicRoute, DynamicRouteValues } from '@/app/utils/dynamicRoute';

export type Route = Routes;
export type RouteAccess = 'guest-only' | 'logged-only' | 'all';

export type NavLink = {
  key: Route;
  route: (values: DynamicRouteValues) => DynamicRoute;
  label: TranslationKey;
  access: RouteAccess;
};
