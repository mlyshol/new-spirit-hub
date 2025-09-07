import DetailPage from 'src/components/DetailPage';
import RelatedContent from 'src/components/RelatedContent';
import { Item } from 'src/types';
import { safeFetchItems } from 'src/lib/safeFetch';
import { buildMetadata } from 'src/lib/metadata';
import type { Metadata, ResolvingMetadata } from 'next';

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

// Shared fetch helper
async function getListenData(slug: string) {
  return safeFetchItems<{ item: Item; relatedItems: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/listen/${slug}`,
    fallback
  );
}

export async function generateMetadata(
  { params }: PageParams,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { listenSlug } = await params;
  const { item } = await getListenData(listenSlug);

  // Strip HTML tags from description for meta
  const plainDescription = item.description
    ? item.description.replace(/<[^>]+>/g, '').trim()
    : '';

  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/listen/${listenSlug}`;

  return {
    ...buildMetadata({
      title: item.title,
      description: plainDescription
    }),
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: item.title,
      description: plainDescription,
      url: canonicalUrl,
      type: 'music.radio_station', // or 'music.song' if appropriate
      images: item.image ? [{ url: item.image, alt: item.title }] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: plainDescription,
      images: item.image ? [item.image] : []
    }
  };
}

export default async function ListenDetail({ params }: PageParams) {
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