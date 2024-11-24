"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { WalletAddressResolver } from "../ui/wallet-address-resolver";
import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
  LogOutIcon,
} from "lucide-react";
import { useDisconnect } from "wagmi";

const ADDRESS = "0x983a83750F9a4596796549718e2686B82455919B";

export default function WalletAddressResolverWithButtonDemo() {
  const { disconnect } = useDisconnect();
  const { copy, isCopy } = useCopyToClipboard();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <WalletAddressResolver address={ADDRESS} />
          <ChevronDownIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <WalletAddressResolver address={ADDRESS} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => copy(ADDRESS)}>
          <CopyIcon className="size-4 mr-2" />
          Copy address
          {isCopy && <CheckIcon className="size-4 ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={`https://etherscan.io/address/${ADDRESS}`} target="_blank">
            <ExternalLinkIcon className="size-4 mr-2" />
            View on Etherscan
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => disconnect()}>
          <LogOutIcon className="size-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { useState } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

function useCopyToClipboard(): {
  copiedText: CopiedValue;
  copy: CopyFn;
  isCopy: boolean;
} {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [isCopy, setIsCopy] = useState(false);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);

      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 1500);

      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  return {
    copiedText,
    copy,
    isCopy,
  };
}
