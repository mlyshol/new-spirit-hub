// app/listen/[listenSlug]/page.tsx
import DetailPage from '../../../components/DetailPage';
import RelatedContent from '../../../components/RelatedContent';
import { Item } from '../../../types';

export default async function ListenDetail({
  params
}: {
  params: Promise<{ listenSlug: string }>;
}) {
  // ✅ Await params before destructuring (matches your VideoDetail pattern)
  const { listenSlug } = await params;
  const accent = 'listen';
  const slug = listenSlug;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/${accent}/${slug}`,
    { cache: 'no-store' }
  );

  if (!res.ok) throw new Error('Failed to fetch detail');

  const { item, relatedItems }: { item: Item; relatedItems: Item[] } =
    await res.json();

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