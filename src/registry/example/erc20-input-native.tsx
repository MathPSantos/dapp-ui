"use client";

import { useState } from "react";

import { ERC20Input } from "@/registry/ui/erc20-input";

export default function ERC20InputNative() {
  const [value, setValue] = useState<bigint | null>();

  return (
    <>
      <ERC20Input
        token="0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" // Wrapped token address
        prependSymbol="BNB" // Native token symbol
        chainId={56}
        value={value}
        onChange={setValue}
      />
    </>
  );
}
