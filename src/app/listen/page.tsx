import PillarPage from '../../components/PillarPage';
import { Item } from '../../types';
import { safeFetchItems } from '../../lib/safeFetch';
import type { Metadata } from 'next';
import { buildMetadata } from '../../lib/metadata';

const PAGE_TITLE = 'Listen';
const PAGE_DESCRIPTION =
  'Podcasts, worship sets, and devotionals to inspire your faith.';

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}

export default async function ListenPage() {
  const fallback = { items: [] as Item[] };
    const { items } = await safeFetchItems<{ items: Item[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/items?accent=listen`,
      fallback
    );
  return (
    <PillarPage
      accent="listen"
      emoji="🎧"
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      items={items}
    />
  );
}