import type { Endpoint } from '@/consts/endpoints';
import type { Distinct } from '@/types/common';

export type DynamicEndpointValues = Record<string, string | number | boolean>;

export type DynamicEndpoint = Distinct<Endpoint, 'DynamicEndpoint'>;

function dynamicEndpoint(route: Endpoint, values: DynamicEndpointValues): DynamicEndpoint {
  let result: string = route;

  for (const key in values) {
    const newValue = String(values[key]);
    result = result.replaceAll(`:${key}`, newValue);
  }

  return result as DynamicEndpoint;
}

export default dynamicEndpoint;
