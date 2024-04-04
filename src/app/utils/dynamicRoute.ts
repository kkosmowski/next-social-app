import type { Route } from '@/types/navigation';

export type DynamicRouteValues = Record<string, string | number>;

function dynamicRoute(route: Route, values: DynamicRouteValues): string {
  let result: string = route;

  for (const key in values) {
    const newValue = String(values[key]);
    result = result.replaceAll(`:${key}`, newValue);
  }

  return result;
}

export default dynamicRoute;
