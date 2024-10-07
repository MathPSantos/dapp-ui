"use client";

import { useState } from "react";

import { ERC20Input } from "../ui/erc20-input";

export function ERC20InputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="grid w-full max-w-sm items-center">
      <ERC20Input
        token="0xdac17f958d2ee523a2206206994597c13d831ec7"
        chainId={1}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
