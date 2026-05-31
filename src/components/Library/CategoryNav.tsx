import { CATEGORIES } from '../../config/categories';

interface CategoryNavProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const CategoryNav = ({ selectedId, onSelect, onClose }: CategoryNavProps) => {
  return (
    <div className="library-categoryNav">
      <div className="library-categoryNav__tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`library-categoryTab${selectedId === cat.id ? ' library-categoryTab--active' : ''}`}
            onClick={() => onSelect(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <button className="library-closeBtn" onClick={onClose}>
        ✕ Close
      </button>
    </div>
  );
};

export default CategoryNav;
