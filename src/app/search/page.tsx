'use client';

import { useState, useEffect } from 'react';
import PillarPage from '../../components/PillarPage';
import { Item, Accent } from '../../types';
import { safeFetchItems } from '../../lib/safeFetch';

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
      title="Search"
      description="Browse all content across Watch, Listen, and Read."
      items={items}
      searchEnabled
      showFilters
      query={query}                // ✅ controlled query
      onSearchChange={setQuery}    // ✅ passes setter to PillarPage
      filter={filter}              // ✅ controlled filter
      onFilterChange={setFilter}   // ✅ passes setter to PillarPage
      loading={loading}
    />
  );
}