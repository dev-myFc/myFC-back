export const jwtConstants = {
  secret: 'ppcMyFcSecretItWillBeChanged',
};

export interface JwtPayload {
  id: string;
  password: string;
  nickname: string;
  email: string;
}
