import { Category } from "../../../types/dashboard";

interface CategorySelectProps {
  value: Category;
  onChange: (value: Category) => void;
  availableCategories?: Category[];
}

export const CategorySelect = ({
  value,
  onChange,
  availableCategories = ["ALL", "POINTS", "ASSISTS", "REBOUNDS"],
}: CategorySelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Category)}
      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm
                dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
    >
      {availableCategories.map((option) => (
        <option key={option} value={option}>
          {option === "ALL"
            ? "All Categories"
            : option.charAt(0) + option.slice(1).toLowerCase()}
        </option>
      ))}
    </select>
  );
};
