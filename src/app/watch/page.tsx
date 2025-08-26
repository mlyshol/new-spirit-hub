import PillarPage from '../../components/PillarPage';
import { Item } from '../../types';

export default async function WatchPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/items?accent=watch`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch watch items: ${res.statusText}`);
  }

  const { items } = await res.json(); // ✅ destructure from API object

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