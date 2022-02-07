import { Settings as HttpSettings } from '@vultuk/microservice-http';

export type GraphQLSettings = {
  path: string;
};

export type Settings = HttpSettings & GraphQLSettings;
