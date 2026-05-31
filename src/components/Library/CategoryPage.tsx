import type { BookshelfCategory } from '../../config/categories';

interface CategoryPageProps {
  category: BookshelfCategory;
  onClose: () => void;
}

const CategoryPage = ({ category, onClose }: CategoryPageProps) => (
  <div className="library-page-backdrop" onClick={onClose}>
    <div className="library-page" onClick={e => e.stopPropagation()}>
      <button className="library-page__close" onClick={onClose}>✕</button>
      <h1 className="library-page__title">{category.label}</h1>
      <p className="library-page__body">{category.content}</p>
    </div>
  </div>
);

export default CategoryPage;
