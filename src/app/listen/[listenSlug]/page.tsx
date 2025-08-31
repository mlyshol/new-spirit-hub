import DetailPage from 'src/components/DetailPage';
import RelatedContent from 'src/components/RelatedContent';
import { Item } from 'src/types';
import { safeFetchItems } from 'src/lib/safeFetch';

// Keep params as a Promise type
interface PageParams {
  params: Promise<{ listenSlug: string }>;
}

const fallback: { item: Item; relatedItems: Item[] } = {
  item: {
    title: 'Content temporarily unavailable',
    description: 'Please check back later.',
    href: '#',
    type: 'Not Available',
    accent: 'listen',
    published: false
  },
  relatedItems: []
};

// Shared fetch helper so you can reuse it in generateMetadata later if needed
async function getListenData(slug: string) {
  return safeFetchItems<{ item: Item; relatedItems: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/listen/${slug}`,
    fallback
  );
}

export default async function ListenDetail({ params }: PageParams) {
  // ✅ Await the promise before destructuring
  const { listenSlug } = await params;

  const { item, relatedItems } = await getListenData(listenSlug);

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