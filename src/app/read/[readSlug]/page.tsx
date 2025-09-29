import CuratedRead from 'src/components/CuratedRead';
import RelatedContent from 'src/components/RelatedContent';
import { Item } from 'src/types';
import { safeFetchItems } from 'src/lib/safeFetch';
import { buildMetadata } from 'src/lib/metadata';
import type { Metadata, ResolvingMetadata } from 'next';

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
function truncateForMeta(text: string, maxLength = 150): string {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > maxLength ? clean.slice(0, maxLength - 1).trim() + '…' : clean;
}

export async function generateMetadata(
  { params }: PageParams,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { readSlug } = await params;
  const { item } = await getReadData(readSlug);

  // Strip HTML tags from description for meta
  const plainDescription = item.description
    ? item.description.replace(/<[^>]+>/g, '').trim()
    : '';
  const metaDescription = truncateForMeta(plainDescription, 150);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/read/${readSlug}`;

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
      type: 'article',
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

export default async function ReadDetail({ params }: PageParams) {
  const { readSlug } = await params;
  const { item, relatedItems } = await getReadData(readSlug);

  return (
    <>
      <CuratedRead {...item} />
      <RelatedContent items={relatedItems} />
    </>
  );
}