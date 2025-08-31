import DetailPage from '../../../components/DetailPage';
import RelatedContent from '../../../components/RelatedContent';
import { Item } from '../../../types';
import { safeFetchItems } from '../../../lib/safeFetch';
import { buildMetadata } from 'src/lib/metadata';
import type { Metadata, ResolvingMetadata } from 'next';

interface PageParams {
  params: { watchSlug: string };
}

const fallback: { item: Item; relatedItems: Item[] } = {
  item: {
    title: 'Content temporarily unavailable',
    description: 'Please check back later.',
    href: '#',
    type: 'Not Available',
    accent: 'watch',
    published: false
  },
  relatedItems: []
};

// ✅ Shared fetch logic so both page + metadata use the same data
async function getVideoData(slug: string) {
  return safeFetchItems<{ item: Item; relatedItems: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/watch/${slug}`,
    fallback
  );
}

// ✅ Production‑safe dynamic metadata
// export async function generateMetadata(
//   { params }: PageParams,
//   _parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { item } = await getVideoData(params.watchSlug);

//   return buildMetadata({
//     title: item.title,
//     description: item.description
//   });
// }

export default async function VideoDetail({ params }: PageParams) {
  const { item, relatedItems } = await getVideoData(params.watchSlug);

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