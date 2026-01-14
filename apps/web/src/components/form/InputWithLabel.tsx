import type { InputWithLabelProps } from "@/types/props/InputWithLabelProps";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import TextError from "../TextError";

type TextColor = "text-primary" | "text-secondary";

const styles = (textColor: TextColor) => ({
  div: "flex flex-col justify-between w-full gap-y-2 w-max-5/6 min-h-15",
  label: `text-sm md:text-lg ${textColor}`,
  input: "text-xs md:text-sm cursor-pointer",
});

export default function InputWithLabel({
  id,
  placeholder,
  inputType = "text",
  label,
  primaryColor = false,
  error,
  ...rest
}: InputWithLabelProps) {
  const textColor = primaryColor ? "text-primary" : "text-secondary";
  const stylesCustom = styles(textColor);
  return (
    <div className={stylesCustom.div}>
      <Label className={stylesCustom.label} htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        placeholder={placeholder}
        type={inputType}
        {...rest}
        className={stylesCustom.input}
      />
      {error && <TextError error={error} />}
    </div>
  );
}
