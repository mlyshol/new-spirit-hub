"use client";

import { useState } from 'react';
import ContentCard from './ContentCard';
import { Item, Accent } from '../types';

type ContentGridProps = {
  items?: Item[];
  accent: Accent;
  title?: string;
  headingAccent?: Accent;
  useItemBadgeAccent?: boolean;
  initialLimit?: number; // how many to show at first
  loadStep?: number;     // how many to add each click
};

export default function ContentGrid({
  items = [],
  accent,
  title,
  headingAccent,
  useItemBadgeAccent = false,
  initialLimit = 6,
  loadStep = 6,
}: ContentGridProps) {
  const headingColor = headingAccent ?? accent;
  const hasItems = Array.isArray(items) && items.length > 0;

  const [visibleCount, setVisibleCount] = useState(initialLimit);

  const visibleItems = items.slice(0, visibleCount);
  const canLoadMore = visibleCount < items.length;

  return (
    <section className="max-w-6xl mx-auto py-4 px-4">
      {title && (
        <h2 className={`text-3xl font-heading mb-8 text-${headingColor}`}>
          {title}
        </h2>
      )}

      {hasItems ? (
        <>
          <div className="grid md:grid-cols-3 gap-8">
            {visibleItems.map((item, i) => {
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

          {canLoadMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount(c => c + loadStep)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
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