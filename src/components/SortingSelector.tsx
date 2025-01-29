import { GridSort } from '@/types/Interfaces';

type SortingSelectorProps = {
  options: GridSort[],
  activeOption: GridSort,
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  idPrefix?: string;
};

export default function SortingSelector({ onSortChange, className, options, activeOption, idPrefix }: SortingSelectorProps) {

  return (
    <div data-testid="sorting-selector" className={`flex items-center space-x-2 ${className || ''}`}>
      <label htmlFor={`${idPrefix}-sort`} className="font-semibold">Sort by:</label>
      <select
        id={`${idPrefix}-sort`}
        value={`${activeOption.field}:${activeOption.order}`}
        onChange={onSortChange}
        className="dark:bg-[#1e1f23] border p-2 rounded"
      >
        {options.map((option) => (
          <option key={`${option.field}:${option.order}`} value={`${option.field}:${option.order}`}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}