import { lazy } from "react";

export const Index: Record<string, any> = {
  "button-demo": {
    name: "button-demo",
    files: ["src/registry/example/button-demo"],
    component: lazy(() => import("@/registry/example/button-demo")),
  },
};
