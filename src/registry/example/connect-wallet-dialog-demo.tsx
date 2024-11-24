import { useConnect } from "wagmi";
import {
  ConnectWalletDialog,
  ConnectWalletDialogButton,
  ConnectWalletDialogDescription,
  ConnectWalletDialogHeader,
  ConnectWalletDialogProvider,
  ConnectWalletDialogTitle,
  ConnectWalletDialogTrigger,
} from "../ui/connect-wallet-dialog";

export default function ConnectWalletDialogDemo() {
  const { connectors, connect, isPending } = useConnect();

  return (
    <ConnectWalletDialogProvider>
      <ConnectWalletDialogTrigger>Connect Wallet</ConnectWalletDialogTrigger>
      <ConnectWalletDialog>
        <ConnectWalletDialogHeader>
          <ConnectWalletDialogTitle>
            Connect your wallet
          </ConnectWalletDialogTitle>
          <ConnectWalletDialogDescription>
            You need to connect EVM wallet.
          </ConnectWalletDialogDescription>
        </ConnectWalletDialogHeader>
        <main className="grid grid-cols-2 gap-4">
          {connectors.map((connector) => (
            <ConnectWalletDialogButton
              key={connector.id}
              variant="ghost"
              onClick={() => connect({ connector })}
              disabled={isPending}
            >
              {connector.name}
            </ConnectWalletDialogButton>
          ))}
        </main>
      </ConnectWalletDialog>
    </ConnectWalletDialogProvider>
  );
}
