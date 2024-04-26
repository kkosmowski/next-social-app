import type { Route } from '@/types/navigation';
import type { Distinct } from '@/types/common';

export type DynamicRouteValues = Record<string, string | number>;

export type DynamicRoute = Distinct<Route, 'DynamicRoute'>;

function dynamicRoute(route: Route, values: DynamicRouteValues): DynamicRoute {
  let result: string = route;

  for (const key in values) {
    const newValue = String(values[key]);
    result = result.replaceAll(`:${key}`, newValue);
  }

  return result as DynamicRoute;
}

export default dynamicRoute;
