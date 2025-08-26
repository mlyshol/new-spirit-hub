'use client';

import { useState, useMemo, ReactNode, Dispatch, SetStateAction } from 'react';
import ContentGrid from './ContentGrid';
import { Item, Accent } from '../types';

type PillarPageProps = {
  accent: Accent;
  emoji: string;
  title: string;
  description: string;
  items?: Item[];
  contentHtml?: string;
  children?: ReactNode;
  hideGrid?: boolean;
  searchEnabled?: boolean;
  showFilters?: boolean;
  filters?: { label: string; value: 'all' | Accent; color: string }[];
  query?: string;
  onSearchChange?: Dispatch<SetStateAction<string>>;
  filter?: 'all' | Accent;
  onFilterChange?: Dispatch<SetStateAction<'all' | Accent>>;
  loading?: boolean;
};

const accentClasses: Record<Accent, string> = {
  watch: 'bg-watch text-white',
  listen: 'bg-listen text-white',
  read: 'bg-read text-white',
  search: 'bg-search text-white',
  about: 'bg-about text-white',
  support: 'bg-support text-white',
};

export default function PillarPage({
  accent,
  emoji,
  title,
  description,
  items = [],
  contentHtml,
  children,
  hideGrid = false,
  searchEnabled = false,
  showFilters = false,
  filters = [
    { label: 'All', value: 'all', color: 'neutral' },
    { label: '🎥 Watch', value: 'watch', color: 'watch' },
    { label: '🎧 Listen', value: 'listen', color: 'listen' },
    { label: '📖 Read', value: 'read', color: 'read' },
  ],
  query: controlledQuery,
  onSearchChange,
  filter: controlledFilter,
  onFilterChange,
  loading = false,
}: PillarPageProps) {
  const [internalQuery, setInternalQuery] = useState('');
  const [internalFilter, setInternalFilter] = useState<'all' | Accent>('all');

  const query = controlledQuery ?? internalQuery;
  const setQuery = onSearchChange ?? setInternalQuery;

  const filter = controlledFilter ?? internalFilter;
  const setFilter = onFilterChange ?? setInternalFilter;

  const filteredItems = useMemo(() => {
    if (!searchEnabled) return items;
    return items.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase()) ||
        item.type?.toLowerCase().includes(query.toLowerCase());

      const matchesFilter = filter === 'all' || item.accent === filter;
      return matchesQuery && matchesFilter;
    });
  }, [items, query, filter, searchEnabled]);

  return (
    <div>
      {/* Hero */}
      <section className={`text-center mb-2 py-8 ${accentClasses[accent]}`}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading mb-4">
          {emoji} {title}
        </h1>
        <p className="text-base sm:text-lg">{description}</p>
      </section>

      {/* Optional HTML content */}
      {contentHtml && (
        <div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 prose prose-sm sm:prose-lg lg:prose-xl prose-neutral"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}

      {/* Optional Search UI */}
      {searchEnabled && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <input
            type="text"
            placeholder="Search by title, description, or type..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full border border-gray-300 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-search"
          />
          {showFilters && (
            <div className="flex flex-wrap gap-3 justify-center">
              {filters.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setFilter(btn.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition
                    ${
                      filter === btn.value
                        ? `bg-${btn.color} text-white border-${btn.color} hover:opacity-90`
                        : `bg-white text-${btn.color} border-${btn.color} hover:bg-${btn.color} hover:text-white`
                    }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom children */}
      {children && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      )}

      {/* Grid */}
      {!hideGrid && !loading && filteredItems.length > 0 && (
        <ContentGrid
          items={filteredItems}
          accent={searchEnabled && filter !== 'all' ? filter : accent}
          headingAccent={accent}
          useItemBadgeAccent={searchEnabled && filter === 'all'}
        />
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      )}

      {/* Empty state */}
      {!loading && filteredItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">No results found.</div>
      )}
    </div>
  );
}