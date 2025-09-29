import DetailPage from '../../../components/DetailPage';
import RelatedContent from '../../../components/RelatedContent';
import { Item } from '../../../types';
import { safeFetchItems } from '../../../lib/safeFetch';
import { buildMetadata } from 'src/lib/metadata';
import type { Metadata, ResolvingMetadata } from 'next';

interface PageParams {
  params: Promise<{ watchSlug: string }>;
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

// Shared fetch so both metadata + page use the same data
async function getVideoData(slug: string) {
  return safeFetchItems<{ item: Item; relatedItems: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/watch/${slug}`,
    fallback
  );
}
function truncateForMeta(text: string, maxLength = 150): string {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > maxLength ? clean.slice(0, maxLength - 1).trim() + '…' : clean;
}
// ✅ Runs before render, sets metadata dynamically
export async function generateMetadata(
  { params }: PageParams,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { watchSlug } = await params;
  const { item } = await getVideoData(watchSlug);

  // Strip HTML tags from description for meta
  const plainDescription = item.description
    ? item.description.replace(/<[^>]+>/g, '').trim()
    : '';
  const metaDescription = truncateForMeta(plainDescription, 150);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/watch/${watchSlug}`;

  return {
    ...buildMetadata({
      title: item.title,
      description: metaDescription
    }),
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: item.title,
      description: metaDescription,
      url: canonicalUrl,
      type: 'video.other',
      images: item.image ? [{ url: item.image, alt: item.title }] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: metaDescription,
      images: item.image ? [item.image] : []
    }
  };
}

export default async function VideoDetail({ params }: PageParams) {
  const { watchSlug } = await params;
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