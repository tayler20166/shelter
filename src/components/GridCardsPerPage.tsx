type GridCardsPerPageProps = {
  options: number[];
  activeOption: number;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};


export default function GridCardsPerPage({ options, activeOption, handleChange }: GridCardsPerPageProps) {
  return (
    <div data-testid="posts-per-page-selector" className="pt-2">
      <label htmlFor="posts-per-page">Cards per page:</label>
      <select className="dark:bg-[#1e1f23]" id="posts-per-page" value={activeOption} onChange={handleChange}>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}