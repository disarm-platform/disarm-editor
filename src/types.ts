import { TConfig } from '@locational/config-validation/build/module/lib/config_types/TConfig';
import { DoumaUser} from '@locational/douma-types';
import {TApplets} from '@locational/config-validation/build/module/lib/config_types/TApplets';

export interface Instance {
  _id: string;
  name: string;
}

export interface Permission {
    _id?: string;
    user_id: string;
    instance_id?: string;
    value: string;
}

export type Applets = TApplets;

export type InstanceConfig = TConfig;
export type DoumaUser = DoumaUser;

