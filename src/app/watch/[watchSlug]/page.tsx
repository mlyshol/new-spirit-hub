import DetailPage from '../../../components/DetailPage';
import RelatedContent from '../../../components/RelatedContent';
import { Item } from '../../../types';
import { safeFetchItems } from '../../../lib/safeFetch';

export default async function VideoDetail({ params }: { params: Promise<{ watchSlug: string }> }) {
  const { watchSlug } = await params;
  const accent = 'watch';
  const slug = watchSlug;
  const formatDate = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null;
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
  
      const {item,relatedItems } = await safeFetchItems<{item:Item; relatedItems: Item[] }>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/item-detail/${accent}/${slug}`,
          fallback
        );


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