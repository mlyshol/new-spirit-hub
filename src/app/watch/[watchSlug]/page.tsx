// app/watch/[watchSlug]/page.tsx
import type { Metadata } from 'next';
import DetailPage from '../../../components/DetailPage';
import RelatedContent from '../../../components/RelatedContent';
import { Item } from '../../../types';
import { safeFetchItems } from '../../../lib/safeFetch';
import { buildMetadata } from '../../../lib/metadata';

const accent = 'watch';   
async function fetchWatchDetail(slug: string) {
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
  { params }: { params: { watchSlug: string } }
){
  const { item } = await fetchWatchDetail(params.watchSlug);

  return buildMetadata({
    title: item.title,
    description: item.description
      ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 160)
      : 'Watch inspiring faith‑centered content on The Spirit Hub.',
  });
}

export default async function VideoDetail({
  params,
}: {
  params: { watchSlug: string };
}) {
  const { item, relatedItems } = await fetchWatchDetail(params.watchSlug);

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