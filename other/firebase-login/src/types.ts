export interface IFirebaseLoginButtonProps {
  onWalletVerified: (token: string) => Promise<void>;
}
