import {
  Microservice as HttpMicroservice,
  Route,
} from '@vultuk/microservice-http';
import { ApolloServer } from 'apollo-server-express';
import { Settings } from './types/graphQLSettings';
import { SchemaResolvers } from './types/schemaResolver';

export * from './types/graphQLSettings';

export const Microservice =
  (settings?: Settings) =>
  (middleware?: any[], appOnlyMiddleware?: any[]) =>
  (routes: Route[], schemaResolvers?: SchemaResolvers): Promise<() => void> => {
    routes.forEach((route) => {
      // Check we aren't trying to use GraphQL at the same time as another Route
      if (settings?.path && settings?.path === '/') {
        throw new Error(`Can't register the GraphQL server on the path '/'`);
      }

      if (settings && route.path === settings.path) {
        throw new Error(
          `Can't set up GraphQL on the same route as a ${route.method} route`
        );
      }
    });

    if (
      schemaResolvers &&
      schemaResolvers.schema &&
      schemaResolvers.resolvers
    ) {
      console.error(
        'No Graphql Schema or Resolvers passed. This service will not serve GraphQL requests.'
      );
      const server = new ApolloServer({
        typeDefs: schemaResolvers.schema,
        resolvers: schemaResolvers.resolvers,
        context: ({ req }) => {
          return { req, res: req.res };
        },
      });

      return server.start().then(() => {
        return HttpMicroservice(settings)(middleware, [
          ...(appOnlyMiddleware || []),
          (app: any) => {
            server.applyMiddleware({
              app,
              path: settings?.path || '/graphql',
            });
          },
        ])(routes);
      });
    } else {
      return new Promise((resolve, rej) => {
        resolve(
          HttpMicroservice(settings)(middleware, appOnlyMiddleware)(routes)
        );
      });
    }
  };
