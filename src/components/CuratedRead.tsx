import DetailPage from './DetailPage';
import { Item } from '../types';

type CuratedReadProps = Item;

export default function CuratedRead({
  title,
  source,
  description,
  href,
  sourceUrl,
  type,
  originalDate,
  publishedDate,
  category,
  date,
  image,
  accent,
  embedCode,
}: CuratedReadProps) {
  return (
    <DetailPage
      title={title}
      description={description}
      href={href}
      sourceUrl={sourceUrl || ''}
      type={type}
      originalDate={originalDate}
      publishedDate={publishedDate}
      category={category || ''} // using description here as the category/summary line
      date={date}
      accent="read"
      image={image} // DetailPage already falls back to default_read.jpg if missing
    >
      {embedCode ? (
          <div dangerouslySetInnerHTML={{ __html: embedCode}} />
        ) : null}

      <p className="mt-8">
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-read font-medium"
        >
          Read the full article on {source} →
        </a>
      </p>
    </DetailPage>
  );
}