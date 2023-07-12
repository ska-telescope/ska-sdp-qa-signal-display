export type User = {
  username: string;
  role: string;
  token?: string;
};

export interface UserState {
  user: User | null;
}
