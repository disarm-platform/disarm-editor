import {standard_handler} from '@/lib/handler';
import {LoggedInUser} from '@/store';

export async function login(username: string, password: string): Promise<LoggedInUser> {
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
