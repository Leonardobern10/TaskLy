export const toggleItem = (
  item: string,
  value: string[],
  onChange: (value: string[]) => void
) => {
  if (value.includes(item)) {
    onChange(value.filter((v) => v !== item));
  } else {
    onChange([...value, item]);
  }
  console.log(value);
};
