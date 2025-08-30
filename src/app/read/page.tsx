import PillarPage from '../../components/PillarPage';
import { Item } from '../../types';
import { safeFetchItems } from '../../lib/safeFetch';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read',
};


export default async function ReadPage() {
  const fallback = { items: [] as Item[] }; // or placeholder
        const { items } = await safeFetchItems<{ items: Item[] }>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/items?accent=read`,
          fallback
        );

  return (
    <PillarPage
      accent="read"
      emoji="📖"
      title="Read"
      description="Articles, studies, and written reflections."
      items={items}
    />
  );
}