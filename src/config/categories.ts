export interface BookshelfCategory {
  id: string;
  label: string;
  content: string;
}

export const CATEGORIES: BookshelfCategory[] = [
  { id: 'about-me',    label: 'About Me',    content: 'Learn about who I am, my background, and what drives me.' },
  { id: 'photography', label: 'Photography', content: 'A collection of my photography work and visual storytelling.' },
  { id: 'interest-1',  label: 'Interest 1',  content: 'Placeholder content for Interest 1.' },
  { id: 'interest-2',  label: 'Interest 2',  content: 'Placeholder content for Interest 2.' },
  { id: 'interest-3',  label: 'Interest 3',  content: 'Placeholder content for Interest 3.' },
  { id: 'interest-4',  label: 'Interest 4',  content: 'Placeholder content for Interest 4.' },
  { id: 'interest-5',  label: 'Interest 5',  content: 'Placeholder content for Interest 5.' },
];

export function getCategoryById(id: string | null): BookshelfCategory | null {
  if (!id) return null;
  return CATEGORIES.find(c => c.id === id) ?? null;
}
