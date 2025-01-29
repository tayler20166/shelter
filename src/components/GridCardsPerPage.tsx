type GridCardsPerPageProps = {
  options: number[];
  activeOption: number;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  idPrefix?: string;
};


export default function GridCardsPerPage({ options, activeOption, handleChange, className, idPrefix }: GridCardsPerPageProps) {
  return (
    <div data-testid="posts-per-page-selector" className={`pt-2 ${className || ''}`}>
      <label htmlFor={`${idPrefix}-posts-per-page`}>Cards per page:</label>
      <select className="dark:bg-[#1e1f23]" id={`${idPrefix}-posts-per-page`} value={activeOption} onChange={handleChange}>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}