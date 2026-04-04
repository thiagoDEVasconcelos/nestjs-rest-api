import { SetMetadata } from '@nestjs/common';
import { ROUTE_POLICY_KEY } from '../auth.constants';

export const SetRoutePolicy = (policy: string) => {
  return SetMetadata(ROUTE_POLICY_KEY, policy);
};
