import * as React from "react";
import { useEnsName } from "wagmi";

const WalletAddressResolver = ({
  address,
  prefix,
  suffix,
}: {
  address: string;
  prefix?: number;
  suffix?: number;
}) => {
  const { data: ensName } = useEnsName({ address: address as `0x${string}` });

  const displayName = React.useMemo(() => {
    if (!ensName) return shortenAddress(address, { prefix, suffix });
    return ensName;
  }, [address, ensName]);

  return displayName;
};

export { WalletAddressResolver };

type Params = {
  prefix?: number;
  suffix?: number;
  separator?: "braces" | "brackets" | "parenthesis";
};

const opening = {
  braces: "{",
  brackets: "[",
  parenthesis: "(",
};

const closing = {
  braces: "}",
  brackets: "]",
  parenthesis: ")",
};

export function shortenAddress(
  address: string,
  { prefix, suffix, separator }: Params = {}
) {
  const nTotalIsLongerThanAddress =
    (prefix || 0) + (suffix || 0) > address.length;

  return !nTotalIsLongerThanAddress
    ? `${address.slice(0, 2 + (prefix || 4))}${
        separator ? opening[separator] : ""
      }…${separator ? closing[separator] : ""}${address.slice(
        address.length - (suffix || 4)
      )}`
    : address;
}
