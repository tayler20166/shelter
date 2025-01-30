import { AgeRange } from '@/types/Interfaces';
import { useState } from 'react';

interface AgeFilterProps {
  ageRange: AgeRange;
  onAgeChange: (ageRange: AgeRange) => void;
  handleAgeRangeSubmit: (ageRange: AgeRange) => void;
}

export default function AgeSelector({ ageRange, onAgeChange, handleAgeRangeSubmit }: AgeFilterProps) {
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onAgeChange({
      ...ageRange,
      [name]: value === '' ? '' : Number(value),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { ageMin, ageMax } = ageRange;

    if (ageMin !== '' && ageMax !== '' && Number(ageMin) > Number(ageMax)) {
      setError('Minimum age cannot be greater than maximum age.');
      return;
    }

    setError('');
    handleAgeRangeSubmit(ageRange);
  };

  return (
    <div data-testid="age-selector" className="dark:bg-[#1e1f23] bg-white drop-shadow-xl px-3 max-h-[400px] overflow-auto custom-scrollbar py-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ageMin" className="block mb-1">Minimum Age:</label>
          <input
            type="number"
            id="ageMin"
            name="ageMin"
            min="0"
            max="25"
            value={ageRange.ageMin}
            onChange={handleChange}
            placeholder="Enter min age"
            className="block w-full border border-1 rounded-md border-[#afafaf] mb-2 px-1"
          />
        </div>
        <div>
          <label htmlFor="ageMax" className="block mb-1">Maximum Age:</label>
          <input
            type="number"
            id="ageMax"
            name="ageMax"
            min="0"
            max="25"
            value={ageRange.ageMax}
            onChange={handleChange}
            placeholder="Enter max age"
            className="block w-full border border-1 rounded-md border-[#afafaf] mb-2 px-1"
          />
        </div>
        <button type="submit" className="border-[1px] border-[#efefef] rounded-md bg-[#14b1bb] py-1 px-4 text-white">
          Submit
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </div>
  );
}