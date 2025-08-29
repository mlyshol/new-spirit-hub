import { Item } from '../types';

export type DetailPageProps = Item & {
  children: React.ReactNode;
};

export default function DetailPage({
  title,
  type,
  category,
  date,
  originalDate,
  publishedDate,
  image,
  accent,
  children,
}: DetailPageProps) {
  const fallbackImage = `/images/default_${accent}.jpg`;
  const displayImage = fallbackImage;

  const formatDate = (d?: string) =>
    d
      ? new Date(d).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null;

  return (
    <article>
      {/* Hero Section */}
      <section
        className="relative h-[20vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url('${displayImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-heading mb-2">{title}</h1>
          <p className="text-sm text-white/80">
            <span
              className={`bg-${accent} text-white px-2 py-1 rounded mr-2 text-xs font-semibold`}
            >
              {type}
            </span>
            {originalDate && <>Originally released: {formatDate(originalDate)}</>}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-3xl mx-auto py-8 px-4 prose prose-lg prose-neutral">
        {children}
        {publishedDate && (
          <div className="text-sm text-neutral-500">
            Published on Spirit Hub: {formatDate(publishedDate)}
          </div>
        )}
      </section>
    </article>
  );
}