import PillarPage from '../../components/PillarPage';
import { Item } from '../../types';
import { safeFetchItems } from '../../lib/safeFetch';
import type { Metadata } from 'next';
import { buildMetadata } from '../../lib/metadata';

const PAGE_TITLE = 'Watch';
const PAGE_DESCRIPTION =
  'Messages, devotionals, and inspiring video content.';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}

export default async function WatchPage() {
  const fallback = { items: [] as Item[] };
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