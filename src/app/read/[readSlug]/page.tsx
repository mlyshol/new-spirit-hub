// app/read/[readSlug]/page.tsx
import CuratedRead from '../../../components/CuratedRead';
import RelatedContent from '../../../components/RelatedContent';
import { Item } from '../../../types';

export default async function ReadDetail({
  params
}: {
  params: Promise<{ readSlug: string }>;
}) {
  // ✅ Await params before destructuring (matches your VideoDetail pattern)
  const { readSlug } = await params;
  const accent = 'read';
  const slug = readSlug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/${accent}/${slug}`,
    { cache: 'no-store' }
  );

  if (!res.ok) throw new Error('Failed to fetch detail');

  const { item, relatedItems }: { item: Item; relatedItems: Item[] } =
    await res.json();

  return (
    <>
      <CuratedRead {...item} />
      <RelatedContent items={relatedItems} />
    </>
  );
}