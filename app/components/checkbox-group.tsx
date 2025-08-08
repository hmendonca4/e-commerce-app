import type { ChangeEvent } from "react";

type CheckboxOption = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  direction?: "row" | "column";
};

export default function CheckboxGroup({
  name,
  options,
  selectedValues,
  onChange,
  direction = "column",
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const nextValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);

    onChange(nextValues);
  };

  return (
    <div
      className={`flex ${
        direction === "row" ? "flex-row gap-4" : "flex-col gap-2"
      }`}
    >
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            name={name}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={handleChange}
            className="form-checkbox w-4 h-4"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
