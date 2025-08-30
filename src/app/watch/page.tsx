import PillarPage from '../../components/PillarPage';
import { Item } from '../../types';
import { safeFetchItems } from '../../lib/safeFetch';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Watch – The Spirit Hub',
  };
}

export default async function WatchPage() {
  const fallback = { items: [] as Item[] }; // or placeholder
      const { items } = await safeFetchItems<{ items: Item[] }>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/items?accent=watch`,
        fallback
      );

  return (
    <PillarPage
      accent="watch"
      emoji="🎥"
      title="Watch"
      description="Messages, devotionals, and inspiring video content."
      items={items}
    />
  );
}