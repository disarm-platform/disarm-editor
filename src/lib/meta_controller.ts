import { standard_handler } from '@/lib/handler';
import { LoggedInUser } from '@/store';

interface UserFromServer {
  deployment_admin: boolean;
  key: string;
  username: string;
  _id: string;
}

export async function login(username: string, password: string): Promise<UserFromServer> {
  const options = {
    url: `/login`,
    method: 'post',
    data: {
      username,
      password,
    },
  };
  const res = await standard_handler(options as any);
  return res.data;
}
