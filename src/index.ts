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
    return HttpMicroservice(settings)(middleware, appOnlyMiddleware)(routes);
  };
