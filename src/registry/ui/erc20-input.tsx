import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { readContracts } from "@wagmi/core";

import { NumericalInput, NumericalInputProps } from "./numerical-input";
import { config } from "@/lib/wagmi";
import { erc20Abi } from "viem";

type ERC20InputProps = NumericalInputProps & {
  token?: string;
  chainId?: number;
};

const ERC20Input = React.forwardRef<HTMLInputElement, ERC20InputProps>(
  ({ token, chainId, ...props }, ref) => {
    const { data, isLoading } = useErc20Token({ token, chainId });

    const prependSymbol = React.useMemo(
      () => (data?.symbol ? `${data.symbol} ` : undefined),
      [data?.symbol]
    );

    return (
      <NumericalInput
        {...props}
        ref={ref}
        prependSymbol={prependSymbol}
        disabled={isLoading || props.disabled}
        maxDecimals={data?.decimals}
      />
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
