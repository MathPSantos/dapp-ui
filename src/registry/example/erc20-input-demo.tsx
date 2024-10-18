"use client";

import { useState } from "react";

import { ERC20Input } from "@/registry/ui/erc20-input";

export default function ERC20InputDemo() {
  const [value, setValue] = useState("");

  return (
    <ERC20Input
      token="0xdac17f958d2ee523a2206206994597c13d831ec7"
      chainId={1}
      value={value}
      onChange={setValue}
    />
  );
}
