import { useState } from 'react';

interface AgeFilterProps {
  onAgeChange: (range: { ageMin: string | number; ageMax: string | number }) => void;
}

export default function AgeSelector({ onAgeChange }: AgeFilterProps) {
  const [ageMin, setAgeMin] = useState<number | ''>('');
  const [ageMax, setAgeMax] = useState<number | ''>('');
  const [error, setError] = useState<string | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? '' : Number(value);

    if (name === 'ageMin') {
      setAgeMin(numericValue);
    } else if (name === 'ageMax') {
      setAgeMax(numericValue);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ageMin !== '' && ageMax !== '' && ageMin > ageMax) {
      setError('Minimum age cannot be greater than maximum age.');
      return;
    }
    onAgeChange({ ageMin, ageMax });
  };

  return (
    <div className="bg-white drop-shadow-xl px-3 max-h-[400px] overflow-auto custom-scrollbar py-4">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ageMin" className="block mb-1">Minimum Age:</label>
          <input
            type="number"
            id="ageMin"
            name="ageMin"
            value={ageMin}
            onChange={handleChange}
            placeholder="Enter min age"
            className="block border border-1 rounded-md border-[#afafaf] mb-2 px-1"
          />
        </div>
        <div>
          <label htmlFor="ageMax" className="block mb-1">Maximum Age:</label>
          <input
            type="number"
            id="ageMax"
            name="ageMax"
            value={ageMax}
            onChange={handleChange}
            placeholder="Enter max age"
             className="block border border-1 rounded-md border-[#afafaf] mb-2 px-1"
          />
        </div>
        <button type="submit" className="border-[1px] border-[#efefef] rounded-md bg-[#14b1bb] py-1 px-4 text-white">Submit</button>
        <div>{error}</div>
      </form>
    </div>
  );
}