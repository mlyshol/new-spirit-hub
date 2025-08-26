'use client';

import { useState, useEffect } from 'react';
import PillarPage from '../../components/PillarPage';
import { Item, Accent } from '../../types';

export default function SearchPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Accent | 'all'>('all');
  const [loading, setLoading] = useState(false);

  const filters: { label: string; value: Accent | 'all'; color: string }[] = [
  { label: 'All', value: 'all', color: 'neutral' },
  { label: '🎥 Watch', value: 'watch', color: 'watch' },
  { label: '🎧 Listen', value: 'listen', color: 'listen' },
  { label: '📖 Read', value: 'read', color: 'read' },
  ];

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filter !== 'all') params.append('accent', filter);
        if (query.trim()) params.append('q', query.trim());

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/items?${params.toString()}`,
          { cache: 'no-store' }
        );

        if (!res.ok) throw new Error(`Failed to fetch items: ${res.statusText}`);

        const data = await res.json();
        setItems(Array.isArray(data) ? data : data.items);
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
      filters={filters}
      loading={loading}
    />
  );
}