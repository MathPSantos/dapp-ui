"use client";

import { useState } from "react";
import { NumericalInput } from "../ui/numerical-input";

export function NumericalInputDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="grid w-full max-w-sm items-center">
      <NumericalInput placeholder="0" value={value} onChange={setValue} />
    </div>
  );
}
