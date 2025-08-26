// src/components/ContentGrid.tsx
import ContentCard from './ContentCard';
import { Item, Accent } from '../types';

type ContentGridProps = {
  items: Item[];
  accent: Accent;                         // page accent (e.g., 'search' on Search page)
  title?: string;                         // optional section title
  headingAccent?: Accent;                 // color for the section title (defaults to accent)
  useItemBadgeAccent?: boolean;           // use item.accent for badges when mixing pillars
};

export default function ContentGrid({
  items,
  accent,
  title,
  headingAccent,
  useItemBadgeAccent = false,
}: ContentGridProps) {
  const headingColor = headingAccent ?? accent;

  return (
    <section className="max-w-6xl mx-auto py-4 px-4">
      {title && (
        <h2 className={`text-3xl font-heading mb-8 text-${headingColor}`}>
          {title}
        </h2>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => {
          const badgeAccent =
            useItemBadgeAccent && item.accent ? item.accent : accent;

          return (
            <ContentCard
              key={i}
              title={item.title}
              shortDescription={item.shortDescription ?? ''}
              description={item.description}
              image={item.image}
              href={item.href}
              type={item.type}
              accent={accent}
              badgeAccent={badgeAccent}
            />
          );
        })}
      </div>
    </section>
  );
}