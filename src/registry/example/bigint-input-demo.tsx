"use client";

import { useState } from "react";

import { BigIntInput } from "@/registry/ui/bigint-input";

export default function BigIntInputDemo() {
  const [value, setValue] = useState<bigint | null>();

  return <BigIntInput value={value} onChange={setValue} />;
}
