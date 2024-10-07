import { cn, escapeRegExp } from "@/lib/utils";
import * as React from "react";

export type NumericalInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "ref" | "onChange" | "as"
> & {
  value: string | number;
  maxDecimals?: number;
  onChange?: (value: string) => void;
  prependSymbol?: string;
};

export const NumericalInput = React.forwardRef<
  HTMLInputElement,
  NumericalInputProps
>(
  (
    {
      className,
      maxDecimals,
      onChange,
      value,
      placeholder = "0",
      prependSymbol,
      ...props
    },
    ref
  ) => {
    const locale = useLocale();

    const enforcer = React.useCallback(
      (newInput: string) => {
        if (newInput === "" || inputRegex.test(escapeRegExp(newInput))) {
          if (isInputGreaterThanDecimals(newInput, maxDecimals)) return;

          onChange?.(newInput);
        }
      },
      [maxDecimals, onChange]
    );

    const valueFormattedWithLocale = React.useMemo(() => {
      const [searchValue, replaceValue] = localeUsesComma(locale)
        ? [/\./g, ","]
        : [/,/g, "."];
      return value.toString().replace(searchValue, replaceValue);
    }, [value]);

    const _value = React.useMemo(() => {
      return prependSymbol
        ? prependSymbol + valueFormattedWithLocale
        : valueFormattedWithLocale;
    }, [prependSymbol, valueFormattedWithLocale]);

    return (
      <input
        {...props}
        ref={ref}
        value={_value}
        onChange={(event) => {
          if (prependSymbol) {
            const value = event.target.value;
            const formattedValue = value.toString().includes(prependSymbol)
              ? value
                  .toString()
                  .slice(prependSymbol.length, value.toString().length + 1)
              : value;
            enforcer(formattedValue.replace(/,/g, "."));
          }
          enforcer(event.target.value.replace(/,/g, "."));
        }}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        minLength={1}
        maxLength={79}
        spellCheck="false"
        placeholder={placeholder}
      />
    );
  }
);
NumericalInput.displayName = "NumericalInput";

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

function localeUsesComma(locale: string) {
  const decimalSeparator = new Intl.NumberFormat(locale).format(1.1)[1];
  return decimalSeparator === ",";
}

function isInputGreaterThanDecimals(value: string, maxDecimals?: number) {
  const decimalGroups = value.split(".");
  return (
    !!maxDecimals &&
    decimalGroups.length > 1 &&
    decimalGroups[1].length > maxDecimals
  );
}

function useLocale() {
  const [locale, setLocale] = React.useState("en-US");

  React.useEffect(() => {
    setLocale(navigator.language);
  }, []);

  return locale;
}