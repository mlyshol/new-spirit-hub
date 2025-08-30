import type { Metadata } from 'next';
import DetailPage from '../../../components/DetailPage';
import RelatedContent from '../../../components/RelatedContent';
import { Item } from '../../../types';
import { safeFetchItems } from '../../../lib/safeFetch';

const accent = 'listen';

export async function generateMetadata(
  { params }: { params: { listenSlug: string } }
): Promise<Metadata> {
  const slug = params.listenSlug;

  const fallback: { item: Item; relatedItems: Item[] } = {
    item: {
      title: 'Content temporarily unavailable',
      description: 'Please check back later.',
      href: '#',
      type: 'Not Available',
      accent,
      published: false
    },
    relatedItems: []
  };

  const { item } = await safeFetchItems<{ item: Item; relatedItems: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/${accent}/${slug}`,
    fallback
  );

  return {
    title: `${item.title} – The Spirit Hub`,
    description: item.description
      ? stripHtml(item.description).slice(0, 160)
      : 'Listen to inspiring faith‑centered content on The Spirit Hub.'
  };
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

export default async function ListenDetail({ params }: { params: { listenSlug: string } }) {
  const slug = params.listenSlug;

  const fallback: { item: Item; relatedItems: Item[] } = {
    item: {
      title: 'Content temporarily unavailable',
      description: 'Please check back later.',
      href: '#',
      type: 'Not Available',
      accent,
      published: false
    },
    relatedItems: []
  };

  const { item, relatedItems } = await safeFetchItems<{ item: Item; relatedItems: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/${accent}/${slug}`,
    fallback
  );

  return (
    <>
      <DetailPage {...item}>
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