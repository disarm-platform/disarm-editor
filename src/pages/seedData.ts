import {InstanceConfig} from '@/types';

export const sample_users = [
  {
    _id: '1',
    name: 'Sihle',
    username: 'sm',
  },
  {
    _id: '2',
    name: 'Thokozani',
    username: 'tn',
  },
  {
    _id: '3',
    name: 'Bob',
    username: 'bob',
  },
];

export const sample_permissions = [
  {
    _id: '0',
    user_id: '1',
    instance_id: 'my_id',
    value: 'write:irs_plan',
  },
];

export const sample_config: InstanceConfig = {
  _id: 'some_id',
  instance_id: 'my_id',
  applets: {meta: {}, irs_record_point: {metadata: {show: false, optional_fields: []}}, irs_plan: {table_output: []}},
};
