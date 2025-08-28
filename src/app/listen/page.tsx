import PillarPage from '../../components/PillarPage';
import { Item } from '../../types';
import { safeFetchItems } from '../../lib/safeFetch';

export default async function ListenPage() {
  const fallback = { items: [] as Item[] }; // or placeholder
    const { items } = await safeFetchItems<{ items: Item[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/items?accent=listen`,
      fallback
    );
  return (
    <PillarPage
      accent="listen"
      emoji="🎧"
      title="Listen"
      description="Podcasts, worship sets, and devotionals to inspire your faith."
      items={items}
    />
  );
}