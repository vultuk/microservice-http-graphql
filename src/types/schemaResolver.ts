import type { IExecutableSchemaDefinition } from "@graphql-tools/schema";

export type SchemaResolver = {
  schema: IExecutableSchemaDefinition["typeDefs"];
  resolvers: IExecutableSchemaDefinition["resolvers"];
};

export type SchemaResolvers = SchemaResolver[];
