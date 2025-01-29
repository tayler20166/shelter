import { useState } from 'react';
import { GridSort } from '@/types/Interfaces';

export default function SortingSelector({ onSortChange }: { onSortChange: (sortValue: GridSort) => void }) {
  const [sortOption, setSortOption] = useState<GridSort>({
    field: 'breed',
    order: 'asc',
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = e.target.value.split(':');
    const newSortOption: GridSort = {
      field,
      order: order as 'asc' | 'desc',
    };
    setSortOption(newSortOption);
    onSortChange(newSortOption);
  };

  return (
    <div data-testid="sorting-selector" className="flex items-center space-x-2">
      <label htmlFor="sort" className="font-semibold">Sort by:</label>
      <select
        id="sort"
        value={`${sortOption.field}:${sortOption.order}`}
        onChange={handleSortChange}
        className="dark:bg-[#1e1f23] border p-2 rounded"
      >
        <option value="breed:asc">Breed ↑ (Ascending)</option>
        <option value="breed:desc">Breed ↓ (Descending)</option>
      </select>
    </div>
  );
}