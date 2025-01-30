type SidebarProps = {
    items: string[];
    activeItems: string[];
    onItemClick: (item: string) => void;
};

export default function Sidebar({ items, activeItems, onItemClick }: SidebarProps) {
    return (
        <ul className="bg-white drop-shadow-xl px-3">
            {items.map((item: string) => (
                <li key={item} onClick={() => onItemClick(item)}
                    className={`cursor-pointer ${activeItems.includes(item) ? 'bg-blue-500 text-white' : ''}`}>{item}</li>
            ))}
        </ul>
    );
}