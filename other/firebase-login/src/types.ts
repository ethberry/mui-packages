export interface IFirebaseLoginButtonProps {
  onTokenVerified: (token: string) => Promise<void>;
}
