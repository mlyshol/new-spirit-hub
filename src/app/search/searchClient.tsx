'use client';

import { useState, useEffect } from 'react';
import PillarPage from '../../components/PillarPage';
import { Item, Accent } from '../../types';
import { safeFetchItems } from '../../lib/safeFetch';

const PAGE_TITLE = 'Search';
const PAGE_DESCRIPTION =
  'Browse all content across Watch, Listen, and Read.';

export default function SearchPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Accent | 'all'>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filter !== 'all') params.append('accent', filter);
        if (query.trim()) params.append('q', query.trim());
        const fallback = { items: [] as Item[] }; // or placeholder
        const { items } = await safeFetchItems<{ items: Item[] }>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/items?${params.toString()}`,
          fallback
        );
        setItems(items);
      } catch (err) {
        console.error(err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [query, filter]);

  return (
    <PillarPage
      accent="search"
      emoji="🔍"
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      items={items}
      searchEnabled
      showFilters
      query={query}
      onSearchChange={setQuery}
      filter={filter}
      onFilterChange={setFilter}
      loading={loading}
    />
  );
}