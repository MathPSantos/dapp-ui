import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { useIsMobile } from "@/registry/hooks/use-mobile";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ConnectWalletContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
};

const ConnectWalletContext = React.createContext<ConnectWalletContext | null>(
  null
);

function useConnectWalletDialog() {
  const context = React.useContext(ConnectWalletContext);
  if (!context) {
    throw new Error(
      "useConnectWallet must be used within a ConnectWalletProvider."
    );
  }
  return context;
}

type ConnectWalletProviderProps = {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const ConnectWalletDialogProvider = ({
  children,
  open: openProp,
  onOpenChange: setOpenProp,
}: ConnectWalletProviderProps) => {
  const isMobile = useIsMobile();
  const [_open, _setOpen] = React.useState(false);

  const open = openProp ?? _open;

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      if (setOpenProp) {
        return setOpenProp?.(typeof value === "function" ? value(open) : value);
      }

      _setOpen(value);
    },
    [setOpenProp, open]
  );

  const contextValue = React.useMemo(
    () => ({
      open,
      setOpen,
      isMobile,
    }),
    [open, setOpen, isMobile]
  );

  return (
    <ConnectWalletContext.Provider value={contextValue}>
      {children}
    </ConnectWalletContext.Provider>
  );
};

const ConnectWalletDialog = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ children, ...props }, ref) => {
  const { open, setOpen, isMobile } = useConnectWalletDialog();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent {...props} ref={ref}>
          <div className="size-full">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent {...props} ref={ref}>
        {children}
      </DialogContent>
    </Dialog>
  );
});

const ConnectWalletDialogTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ children, onClick, ...props }, ref) => {
  const { setOpen } = useConnectWalletDialog();

  return (
    <Button
      ref={ref}
      onClick={(event) => {
        onClick?.(event);
        setOpen(true);
      }}
      {...props}
    >
      {children}
    </Button>
  );
});

const ConnectWalletClose = React.forwardRef<>

export {
  ConnectWalletDialog,
  ConnectWalletDialogTrigger,
  ConnectWalletDialogProvider,
  useConnectWalletDialog,
};
