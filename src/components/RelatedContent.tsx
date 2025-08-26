import ContentCard from './ContentCard';
import { Item, Accent } from '../types';

type RelatedContentProps = {
  items: Item[];
};

export default function RelatedContent({ items }: RelatedContentProps) {
  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-heading mb-6 text-neutral">You Might Also Like</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <ContentCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}
