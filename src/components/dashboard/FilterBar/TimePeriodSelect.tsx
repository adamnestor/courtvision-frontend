import { TimePeriod } from "../../../types/dashboard";

interface TimePeriodSelectProps {
  value: TimePeriod;
  onChange: (value: TimePeriod) => void;
}

export const TimePeriodSelect = ({
  value,
  onChange,
}: TimePeriodSelectProps) => {
  const options: TimePeriod[] = ["L5", "L10", "L15", "L20", "SEASON"];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TimePeriod)}
      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
