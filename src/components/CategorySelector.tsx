type CategorySelectorProps = {
    items: string[];
    activeItems: string[];
    onItemClick: (item: string) => void;
    idPrefix?: string;
};

export default function CategorySelector({ items, activeItems, onItemClick, idPrefix }: CategorySelectorProps) {
    return (
        <ul data-testid="category-selector" className="dark:bg-[#1e1f23] bg-white drop-shadow-xl px-3 max-h-[400px] overflow-auto custom-scrollbar mb-4 py-4">
            {items.map((item: string) => (
                <li key={item} className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        id={`${idPrefix}-${item}`}
                        checked={activeItems.includes(item)}
                        onChange={() => onItemClick(item)}
                        className="custom-checkbox"
                    />
                    <label htmlFor={`${idPrefix}-${item}`} className={`cursor-pointer ${activeItems.includes(item) ? 'text-[#14b1bb] font-bold' : ''}`}>
                        {item}
                    </label>
                </li>
            ))}
        </ul>
    );
}

