// app/read/[readSlug]/page.tsx
import CuratedRead from 'src/components/CuratedRead';
import RelatedContent from 'src/components/RelatedContent';
import { Item } from 'src/types';
import { safeFetchItems } from 'src/lib/safeFetch';

export default async function ReadDetail({
  params
}: {
  params: Promise<{ readSlug: string }>;
}) {
  const { readSlug } = await params;
  const accent = 'read';
  const slug = readSlug;
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

    const {item,relatedItems } = await safeFetchItems<{item:Item; relatedItems: Item[] }>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/${accent}/${slug}`,
        fallback
      );

  return (
    <>
      <CuratedRead {...item} />
      <RelatedContent items={relatedItems} />
    </>
  );
}