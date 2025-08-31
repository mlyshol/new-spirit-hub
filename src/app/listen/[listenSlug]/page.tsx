// app/listen/[listenSlug]/page.tsx
import type { Metadata } from 'next';
import DetailPage from '../../../components/DetailPage';
import RelatedContent from '../../../components/RelatedContent';
import type { Item } from '../../../types';
import { safeFetchItems } from '../../../lib/safeFetch';
import { buildMetadata } from '../../../lib/metadata';

const accent = 'listen';

// ✅ Single source of truth for params type
type ListenPageParams = { listenSlug: string };

// Centralized fetch so metadata + page share the same logic
async function fetchListenDetail(slug: string) {
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

// ✅ Params type matches folder name exactly
export async function generateMetadata(
  { params }: { params: ListenPageParams }
): Promise<Metadata> {
  const { item } = await fetchListenDetail(params.listenSlug);

  return buildMetadata({
    title: item.title,
    description: item.description
      ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 160)
      : 'Listen to inspiring faith‑centered content on The Spirit Hub.',
  });
}

// ✅ Page component uses the same params type
export default async function ListenDetailPage(
  { params }: { params: ListenPageParams }
) {
  const { item, relatedItems } = await fetchListenDetail(params.listenSlug);

  return (
    <>
      <DetailPage
        title={item.title}
        description={item.description}
        href={item.href}
        type={item.type}
        originalDate={item.originalDate}
        publishedDate={item.publishedDate}
        category={item.category}
        date={item.date}
        image={item.image}
        accent={item.accent}
      >
        {item.description && (
          <div dangerouslySetInnerHTML={{ __html: item.description }} />
        )}
        {item.embedCode && (
          <div
            className="mt-8 aspect-w-16 aspect-h-9 w-full max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: item.embedCode }}
          />
        )}
      </DetailPage>

      <RelatedContent items={relatedItems} />
    </>
  );
}