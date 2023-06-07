export interface UserState {
  user: User | null;
}

export type User = {
  username: string;
  role: string;
  token?: string;
};
