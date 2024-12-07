import { Threshold } from "../../../types/dashboard";

interface ThresholdSelectProps {
  value: Threshold | null;
  onChange: (value: Threshold) => void;
  options: number[];
}

export const ThresholdSelect = ({
  value,
  onChange,
  options,
}: ThresholdSelectProps) => {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(Number(e.target.value))}
      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}+
        </option>
      ))}
    </select>
  );
};
