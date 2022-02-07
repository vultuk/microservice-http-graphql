import {
  Microservice as HttpMicroservice,
  Route,
} from '@vultuk/microservice-http';
import { Settings } from './types/graphQLSettings';

export * from './types/graphQLSettings';

export const Microservice =
  (settings?: Settings) =>
  (middleware?: any[], appOnlyMiddleware?: any[]) =>
  (routes: Route[]) => {
    return HttpMicroservice(settings)(middleware, appOnlyMiddleware)(routes);
  };
