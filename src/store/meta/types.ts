export interface MetaUser {
  username: string;
  api_key: string;
}

export interface MetaState {
  user: MetaUser | null;
}
