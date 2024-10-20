import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { readContracts } from "@wagmi/core";

import { BigIntInput, BigIntInputProps } from "./bigint-input";
import { config } from "@/lib/wagmi";
import { erc20Abi } from "viem";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type ERC20InputProps = BigIntInputProps & {
  token?: string;
  chainId?: number;
};

const ERC20Input = React.forwardRef<HTMLInputElement, ERC20InputProps>(
  ({ token, chainId, className, ...props }, ref) => {
    const { data, isLoading } = useErc20Token({ token, chainId });

    return (
      <div className="flex rounded-lg">
        <BigIntInput
          ref={ref}
          maxDecimals={data?.decimals}
          className={cn("order-1 -ml-px rounded-l-none peer", className)}
          {...props}
        />
        <span className="order-0 -z-10 inline-flex items-center rounded-l-lg border border-input bg-background px-3 text-sm text-muted-foreground peer-disabled:opacity-50 border-r-0">
          {isLoading ? <Skeleton className="h-5 w-6" /> : data?.symbol}
        </span>
      </div>
    );
  }
);
ERC20Input.displayName = "ERC20Input";

export { ERC20Input };

function useErc20Token(params: { token?: string; chainId?: number }) {
  return useQuery({
    queryKey: ["ERC20_TOKEN", params],
    queryFn: async () => {
      if (!params.token) return undefined;

      const contract = {
        chainId: params.chainId as (typeof config)["chains"][number]["id"],
        address: params.token as `0x${string}`,
        abi: erc20Abi,
      } as const;

      const [name, symbol, decimals] = await readContracts(config, {
        allowFailure: false,
        contracts: [
          { ...contract, functionName: "name" },
          { ...contract, functionName: "symbol" },
          { ...contract, functionName: "decimals" },
        ],
      });

      return { name, symbol, decimals };
    },
    enabled: !!params.token,
  });
}
