"use client";

import { useState } from "react";

import { ERC20Input } from "../ui/erc20-input";
import { Label } from "@/components/ui/label";

export function ERC20InputWithLabel() {
  const [value, setValue] = useState("");

  return (
    <div className="grid w-full max-w-sm items-center">
      <Label htmlFor="token">USDT</Label>
      <ERC20Input
        id="token"
        token="0xdac17f958d2ee523a2206206994597c13d831ec7"
        chainId={1}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
