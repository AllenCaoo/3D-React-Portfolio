import type { BookshelfCategory } from '../../config/categories';

interface CategoryContentProps {
  category: BookshelfCategory | null;
  onBack: () => void;
}

const CategoryContent = ({ category, onBack }: CategoryContentProps) => {
  if (!category) return null;

  return (
    <div className="library-contentPanel">
      <button className="library-contentPanel__back" onClick={onBack}>
        ← Back
      </button>
      <h2 className="library-contentPanel__title">{category.label}</h2>
      <p className="library-contentPanel__body">{category.content}</p>
    </div>
  );
};

export default CategoryContent;
