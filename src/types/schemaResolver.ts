import type { IExecutableSchemaDefinition } from "@graphql-tools/schema";

export type SchemaResolver = {
  schema: IExecutableSchemaDefinition["typeDefs"];
  resolver: IExecutableSchemaDefinition["resolvers"];
};

export type SchemaResolvers = SchemaResolver[];
