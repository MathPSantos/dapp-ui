import { ERC20InputWithLabel } from "@/registry/example/erc20-input-with-label";
import { NumericalInputWithLabel } from "@/registry/example/numerical-input-with-label";

export default function Home() {
  return (
    <div className="container py-14">
      <ERC20InputWithLabel />
      <NumericalInputWithLabel />
    </div>
  );
}
