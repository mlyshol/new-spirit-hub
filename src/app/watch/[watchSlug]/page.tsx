import DetailPage from '../../../components/DetailPage';
import RelatedContent from '../../../components/RelatedContent';
import { Item } from '../../../types';
import { safeFetchItems } from '../../../lib/safeFetch';
import type { Metadata, ResolvingMetadata } from 'next';

interface PageParams {
  params: { watchSlug: string };
}

const siteName = 'The Spirit Hub';

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

// Shared fetch logic
async function getVideoData(slug: string) {
  return safeFetchItems<{ item: Item; relatedItems: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/watch/${slug}`,
    fallback
  );
}

// ✅ Inline metadata without buildMetadata
export async function generateMetadata(
  { params }: PageParams,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { item } = await getVideoData(params.watchSlug);

  const fullTitle = item.title
    ? `${item.title} – ${siteName}`
    : siteName;
  const description =
    item.description || 'Faith‑centered content to inspire and connect.';

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      siteName
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description
    }
  };
}

export default async function VideoDetail({ params }: PageParams) {
  const { watchSlug } = params;
  const { item, relatedItems } = await getVideoData(watchSlug);

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