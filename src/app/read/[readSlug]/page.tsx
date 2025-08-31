// app/read/[readSlug]/page.tsx
import type { Metadata } from 'next';
import CuratedRead from '../../../components/CuratedRead';
import RelatedContent from '../../../components/RelatedContent';
import { Item } from '../../../types';
import { safeFetchItems } from '../../../lib/safeFetch';
import { buildMetadata } from '../../../lib/metadata';

const accent = 'read';

// Centralized fetch so metadata + page share the same logic
async function fetchReadDetail(slug: string) {
  const fallback: { item: Item; relatedItems: Item[] } = {
    item: {
      title: 'Content temporarily unavailable',
      description: 'Please check back later.',
      href: '#',
      type: 'Not Available',
      accent,
      published: false,
    },
    relatedItems: [],
  };

  return safeFetchItems<{ item: Item; relatedItems: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/${accent}/${slug}`,
    fallback
  );
}

export async function generateMetadata(
  { params }: { params: { readSlug: string } }
): Promise<Metadata> {
  const { item } = await fetchReadDetail(params.readSlug);

  return buildMetadata({
    title: item.title,
    description: item.description
      ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 160)
      : 'Read inspiring faith‑centered content on The Spirit Hub.',
  });
}

export default async function ReadDetail({
  params,
}: {
  params: { readSlug: string };
}) {
  const { item, relatedItems } = await fetchReadDetail(params.readSlug);

  return (
    <>
      <CuratedRead {...item} />
      <RelatedContent items={relatedItems} />
    </>
  );
}