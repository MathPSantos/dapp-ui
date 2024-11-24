import React from "react";
import { useIsMobile } from "@/registry/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { VariantProps, cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
ConnectWalletDialog.displayName = "ConnectWalletDialog";

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
ConnectWalletDialogTrigger.displayName = "ConnectWalletDialogTrigger";

const ConnectWalletDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-4 space-y-1.5 md:p-0", className)} {...props} />
);

const ConnectWalletDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-4 flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2 md:p-0",
      className
    )}
    {...props}
  />
);

const ConnectWalletDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogTitle>,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>(({ className, ...props }, ref) => {
  const { isMobile } = useConnectWalletDialog();

  if (isMobile) {
    return (
      <DrawerTitle
        ref={ref}
        className={cn(
          "text-lg font-semibold leading-none tracking-tight",
          className
        )}
        {...props}
      />
    );
  }

  return (
    <DialogTitle
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
});
ConnectWalletDialogTitle.displayName = "ConnectWalletDialogTitle";

const ConnectWalletDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogDescription>,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>(({ className, ...props }, ref) => {
  const { isMobile } = useConnectWalletDialog();

  if (isMobile) {
    return (
      <DrawerDescription
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  }

  return (
    <DialogDescription
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
ConnectWalletDialogDescription.displayName = "ConnectWalletDialogDescription";

const connectWalletButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

const ConnectWalletDialogButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(
  (
    {
      asChild = false,
      variant = "default",
      size = "default",
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : Button;

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
ConnectWalletDialogButton.displayName = "ConnectWalletDialogButton";

export {
  ConnectWalletDialog,
  ConnectWalletDialogTrigger,
  ConnectWalletDialogProvider,
  ConnectWalletDialogHeader,
  ConnectWalletDialogFooter,
  ConnectWalletDialogTitle,
  ConnectWalletDialogDescription,
  ConnectWalletDialogButton,
  useConnectWalletDialog,
};
