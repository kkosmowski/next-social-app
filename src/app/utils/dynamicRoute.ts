import type { Route } from '@/types/navigation';
import type { Distinct } from '@/types/common';
import session from '@/app/api/[utils]/SessionClient';

export type DynamicRouteValues = Record<string, string | number>;

export type DynamicRoute = Distinct<Route, 'DynamicRoute'>;

function dynamicRoute(route: Route, values?: DynamicRouteValues): DynamicRoute {
  const _values: DynamicRouteValues = {
    ...values,
    localeCode: session.getLocaleCode(),
  };
  let result: string = route;

  for (const key in _values) {
    const newValue = String(_values[key]);
    result = result.replaceAll(`:${key}`, newValue);
  }

  return result as DynamicRoute;
}

export default dynamicRoute;
