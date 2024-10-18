// @ts-nocheck
import { lazy } from "react";

export const Index: Record<string, any> = {
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
};
