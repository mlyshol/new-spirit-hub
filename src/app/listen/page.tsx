import PillarPage from '../../components/PillarPage';
import { Item } from '../../types';

export default async function ListenPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/items?accent=listen`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch listen items: ${res.statusText}`);
  }

  const { items }: { items: Item[] } = await res.json();

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