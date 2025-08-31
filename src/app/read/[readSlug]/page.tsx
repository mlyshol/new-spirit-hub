import CuratedRead from 'src/components/CuratedRead';
import RelatedContent from 'src/components/RelatedContent';
import { Item } from 'src/types';
import { safeFetchItems } from 'src/lib/safeFetch';

// Keep params as a Promise type
interface PageParams {
  params: Promise<{ readSlug: string }>;
}

const fallback: { item: Item; relatedItems: Item[] } = {
  item: {
    title: 'Content temporarily unavailable',
    description: 'Please check back later.',
    href: '#',
    type: 'Not Available',
    accent: 'read',
    published: false
  },
  relatedItems: []
};

// Shared fetch helper
async function getReadData(slug: string) {
  return safeFetchItems<{ item: Item; relatedItems: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/read/${slug}`,
    fallback
  );
}

export default async function ReadDetail({ params }: PageParams) {
  // ✅ Await the promise before destructuring
  const { readSlug } = await params;

  const { item, relatedItems } = await getReadData(readSlug);

  return (
    <>
      <CuratedRead {...item} />
      <RelatedContent items={relatedItems} />
    </>
  );
}