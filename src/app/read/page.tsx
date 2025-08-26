import PillarPage from '../../components/PillarPage';
import { Item } from '../../types';

export default async function ReadPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/items?accent=read`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch read items: ${res.statusText}`);
  }

  const { items }: { items: Item[] } = await res.json();

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