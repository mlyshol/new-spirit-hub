import { Accent } from '../types';
import SmartImage from '../components/SmartImage';

type ContentCardProps = {
  title: string;
  shortDescription?: string;
  description: string;
  image?: string;
  href: string;
  type: string;
  accent: Accent;
  badgeAccent?: Accent;
};

export default function ContentCard({
  title,
  shortDescription,
  description,
  image,
  href,
  type,
  accent,
  badgeAccent,
}: ContentCardProps) {
  // If accent is 'search', use badgeAccent (item's pillar) for fallback image
  const effectiveAccent = accent === 'search' && badgeAccent ? badgeAccent : accent;
  const fallbackImage = `/images/default_${effectiveAccent}.jpg`;
  const displayImage = image || fallbackImage;

  return (
    <a
      href={href}
      className="block rounded-lg overflow-hidden shadow-card hover:-translate-y-1 transition-smooth relative"
    >

      <SmartImage
        src={displayImage}
        alt={title}
        aspect="aspect-[16/9]"
        bgColor="bg-gray-300"
      />

      <div className={`absolute top-4 left-4 bg-${badgeAccent || accent} text-white text-xs font-semibold px-3 py-1 rounded`}>
        {type}
      </div>

      <div className="p-6">
        <h3 className={`text-xl font-heading mb-2`}>{title}</h3>
        <p className="text-sm text-neutral mb-4">{shortDescription || description?.slice(0, 100) + '…'}</p>
      </div>
    </a>
  );
}