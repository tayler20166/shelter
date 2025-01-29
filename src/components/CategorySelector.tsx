type CategorySelectorProps = {
    items: string[];
    activeItems: string[];
    onItemClick: (item: string) => void;
};

export default function CategorySelector({ items, activeItems, onItemClick }: CategorySelectorProps) {
    return (
        <ul className="bg-white drop-shadow-xl px-3 max-h-[400px] overflow-auto custom-scrollbar mb-4 py-4">
            {items.map((item: string) => (
                <li key={item} className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        id={item}
                        checked={activeItems.includes(item)}
                        onChange={() => onItemClick(item)}
                        className="custom-checkbox"
                    />
                    <label htmlFor={item} className={`cursor-pointer ${activeItems.includes(item) ? 'text-[#14b1bb] font-bold' : ''}`}>
                        {item}
                    </label>
                </li>
            ))}
        </ul>
    );
}

