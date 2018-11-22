import {standard_handler} from '@/lib/handler';
import {MetaUser} from '@/store/meta/types';

export async function login(username: string, password: string): Promise<MetaUser> {
  const options = {
    url: `/login`,
    method: 'post',
    data: {
      username,
      password,
    },
  };
  const res = await standard_handler(options);
  return res.data;
}
