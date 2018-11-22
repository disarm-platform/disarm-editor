import { TConfig } from '@locational/config-validation/build/module/lib/config_types/TConfig';

export interface Instance {
  _id: string;
  name: string;
}

export type InstanceConfig = TConfig;
