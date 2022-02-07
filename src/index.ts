import {
  Microservice as HttpMicroservice,
  Route,
} from "@vultuk/microservice-http";
import { Settings } from "./types/graphQLSettings";
import { SchemaResolvers } from "./types/schemaResolver";

export * from "./types/graphQLSettings";

export const Microservice =
  (settings?: Settings) =>
  (middleware?: any[], appOnlyMiddleware?: any[]) =>
  (routes: Route[], schemaResolvers?: SchemaResolvers) => {
    routes.forEach((route) => {
      // Check we aren't trying to use GraphQL at the same time as another Route
      if (settings && route.path === settings.path) {
        throw new Error(
          `Can't set up GraphQL on the same route as a ${route.method} route`
        );
      }
    });

    return HttpMicroservice(settings)(middleware, appOnlyMiddleware)(routes);
  };
