import { TConfig } from '@disarm/config-validation/build/module/lib/config_types/TConfig';
import { DoumaUser} from '@locational/douma-types';
import {TApplets} from '@disarm/config-validation/build/module/lib/config_types/TApplets';

export interface Instance {
  _id: string;
  name: string;
}

export interface Permission {
    _id?: string;
    user_id: string;
    instance_id: string;
    value: string;
}

export interface DevBasicUser {
  // This is just for dev, need to use DoumaUser
  _id: string | null;
  name: string;
  username: string;
}

export interface NewUserWithPassword extends DevBasicUser {
  password: string;
}

export interface DevUserWithPermissions extends DevBasicUser {
  permissions: FlatPermissionsRow;
}

export interface FlatPermissionsRow {
  [index: string]: boolean; // e.g. {'write:irs_plan': true}
}


export type InstanceConfig = TConfig;

export interface EditableInstanceConfig extends InstanceConfig {
  unsaved_changes: boolean;
}

export type DoumaUser = DoumaUser;


export interface ValidationMessage {
  message: string;
  status: 'Green' | 'Red' | 'Blue';
  source_node?: string;
  target_node?: string;
}
