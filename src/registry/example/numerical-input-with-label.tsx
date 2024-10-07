"use client";

import { useState } from "react";
import { NumericalInput } from "../ui/numerical-input";
import { Label } from "@/components/ui/label";

export function NumericalInputWithLabel() {
  const [value, setValue] = useState("");

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="quantity">Quantity</Label>
      <NumericalInput
        id="quantity"
        placeholder="0"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
