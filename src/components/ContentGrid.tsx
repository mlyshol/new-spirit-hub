// src/components/ContentGrid.tsx
import ContentCard from './ContentCard';
import { Item, Accent } from '../types';

type ContentGridProps = {
  items?: Item[];                          // made optional for safety
  accent: Accent;
  title?: string;
  headingAccent?: Accent;
  useItemBadgeAccent?: boolean;
};

export default function ContentGrid({
  items = [],                              // default to empty array
  accent,
  title,
  headingAccent,
  useItemBadgeAccent = false,
}: ContentGridProps) {
  const headingColor = headingAccent ?? accent;
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <section className="max-w-6xl mx-auto py-4 px-4">
      {title && (
        <h2 className={`text-3xl font-heading mb-8 text-${headingColor}`}>
          {title}
        </h2>
      )}

      {hasItems ? (
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
      ) : (
        // Fallback state
        <div className="text-center text-gray-500 py-12">
          <p className="mb-4 font-medium">
            Content temporarily unavailable
          </p>
          <p>Check back later for new updates</p>
        </div>
      )}
    </section>
  );
}