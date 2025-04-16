export type UserId = {
  id: string;
};

export type TUser = {
  sub: string;
  username: string;
  roles: string;
  iat: number;
  exp: number;
}
