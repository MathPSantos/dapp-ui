// @ts-nocheck
import { lazy } from "react";

export const Index: Record<string, any> = {
  "bigint-input": {
    name: "bigint-input",
    files: ["src/registry/ui/bigint-input.tsx"],
    component: lazy(() => import("@/registry/ui/bigint-input")),
  },
  "bigint-input-demo": {
    name: "bigint-input-demo",
    files: ["src/registry/example/bigint-input-demo.tsx"],
    component: lazy(() => import("@/registry/example/bigint-input-demo")),
  },
  "erc20-input": {
    name: "erc20-input",
    files: ["src/registry/ui/erc20-input.tsx"],
    component: lazy(() => import("@/registry/ui/erc20-input")),
  },
  "erc20-input-demo": {
    name: "erc20-input-demo",
    files: ["src/registry/example/erc20-input-demo.tsx"],
    component: lazy(() => import("@/registry/example/erc20-input-demo")),
  },
  "erc20-input-native": {
    name: "erc20-input-native",
    files: ["src/registry/example/erc20-input-native.tsx"],
    component: lazy(() => import("@/registry/example/erc20-input-native")),
  },
  "connect-wallet-dialog": {
    name: "connect-wallet-dialog",
    files: ["src/registry/ui/connect-wallet-dialog.tsx"],
    component: lazy(() => import("@/registry/ui/connect-wallet-dialog")),
  },
  "connect-wallet-dialog-demo": {
    name: "connect-wallet-dialog-demo",
    files: ["src/registry/example/connect-wallet-dialog-demo.tsx"],
    component: lazy(
      () => import("@/registry/example/connect-wallet-dialog-demo")
    ),
  },
  "wallet-address-resolver": {
    name: "wallet-address-resolver",
    files: ["src/registry/ui/wallet-address-resolver.tsx"],
    component: lazy(() => import("@/registry/ui/wallet-address-resolver")),
  },
  "wallet-address-resolver-demo": {
    name: "wallet-address-resolver-demo",
    files: ["src/registry/example/wallet-address-resolver-demo.tsx"],
    component: lazy(
      () => import("@/registry/example/wallet-address-resolver-demo")
    ),
  },
  "wallet-address-resolver-with-button-demo": {
    name: "wallet-address-resolver-with-button-demo",
    files: [
      "src/registry/example/wallet-address-resolver-with-button-demo.tsx",
    ],
    component: lazy(
      () =>
        import("@/registry/example/wallet-address-resolver-with-button-demo")
    ),
  },
};
