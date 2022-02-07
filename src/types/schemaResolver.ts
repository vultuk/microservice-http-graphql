import type { IExecutableSchemaDefinition } from "@graphql-tools/schema";

export type SchemaResolvers = {
  schema: IExecutableSchemaDefinition["typeDefs"];
  resolvers: IExecutableSchemaDefinition["resolvers"];
};
