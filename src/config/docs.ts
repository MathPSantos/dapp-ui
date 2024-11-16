import { ReactElement } from "react";

export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: ReactElement;
  label?: string;
};

export type NavItemWithChildren = NavItem & {
  items: NavItemWithChildren[];
};

export type MainNavItem = NavItem;
export type SidebarNavItem = NavItemWithChildren;

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export const docsConfig: DocsConfig = {
  mainNav: [],
  sidebarNav: [
    // {
    //   title: "Getting Started",
    //   items: [
    //     {
    //       title: "Introduction",
    //       href: "/docs",
    //       items: [],
    //     },
    //     {
    //       title: "Ethereum (EVM)",
    //       items: [],
    //     },
    //     {
    //       title: "Solana",
    //       items: [],
    //     },
    //   ],
    // },
    {
      title: "Ethereum (EVM)",
      items: [
        // {
        //   title: "Getting  Started",
        //   href: "/docs/ethereum",
        //   items: [],
        // },
        {
          title: "BigInt Input",
          href: "/docs/ethereum/bigint-input",
          items: [],
        },
        {
          title: "ERC20 Input",
          href: "/docs/ethereum/erc20-input",
          items: [],
        },
        {
          title: "Connect Wallet Dialog",
          href: "/docs/ethereum/connect-wallet-dialog",
          items: [],
        },
        // {
        //   title: "ENS Name Resolver",
        //   href: "/docs/ethereum/ens-name-resolver",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "ENS Avatar Resolver",
        //   href: "/docs/ethereum/ens-avatar-resolver",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "Block Observer",
        //   href: "/docs/ethereum/block-observer",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "Chain Switcher",
        //   href: "/docs/ethereum/chain-switcher",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "Chain Logo",
        //   href: "/docs/ethereum/chain-logo",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "Sign Message Modal",
        //   href: "/docs/ethereum/sign-message",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "Token Input",
        //   href: "/docs/ethereum/token-input",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "Address Input",
        //   href: "/docs/ethereum/address-input",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "Pending Transactions",
        //   href: "/docs/ethereum/pending-transactions",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "Send Transaction",
        //   href: "/docs/ethereum/send-transaction",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "Swap Tokens Form",
        //   href: "/docs/ethereum/swap-tokens-form",
        //   items: [],
        //   disabled: true,
        // },
        // {
        //   title: "IPFS Image Loader",
        //   href: "/docs/ethereum/ipfs-image-loader",
        //   items: [],
        //   disabled: true,
        // },
      ],
    },
    // {
    //   title: "Solana",
    //   items: [
    //     {
    //       title: "Connect Wallet Modal",
    //       href: "/docs/solana/connect-wallet-modal",
    //       items: [],
    //       disabled: true,
    //     },
    //   ],
    // },
  ],
};
