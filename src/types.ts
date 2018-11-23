import { TConfig } from '@locational/config-validation/build/module/lib/config_types/TConfig';
import { DoumaUser} from '@locational/douma-types';

export interface Instance {
  _id: string;
  name: string;
}

interface BasicUser {
    _id?:string;
    name:string;
    username:string;
}

export interface Permission {
    _id?:string;
    user_id:string;
    instance_id?:string;
    value:string;
}


export type InstanceConfig = TConfig;
export type User = BasicUser | DoumaUser;
