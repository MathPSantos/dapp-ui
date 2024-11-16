import {
  ConnectWalletDialog,
  ConnectWalletDialogProvider,
  ConnectWalletDialogTrigger,
} from "../ui/connect-wallet-dialog";

export default function ConnectWalletDialogDemo() {
  return (
    <ConnectWalletDialogProvider>
      <ConnectWalletDialogTrigger>Connect Wallet</ConnectWalletDialogTrigger>
      <ConnectWalletDialog>
        
      </ConnectWalletDialog>
    </ConnectWalletDialogProvider>
  );
}
