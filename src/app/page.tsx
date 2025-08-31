// app/page.tsx
import ContentGrid from 'src/components/ContentGrid';
import { safeFetchItems } from 'src/lib/safeFetch';
import { Item } from 'src/types';
import type { Metadata } from 'next';
import { buildMetadata } from 'src/lib/metadata';

const PAGE_TITLE = 'Home';
const PAGE_DESCRIPTION =
  'Watch. Listen. Read. Christ-centered content to guide and encourage your walk. Step into the Hub.';
export function generateMetadata(): Metadata {
  return buildMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  });
}
  
export default async function Home() {
  // Fetch latest posts from your Express API
  const fallback = { items: [] as Item[] }; // or placeholder
  const { items:latestPosts } = await safeFetchItems<{ items: Item[] }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/latest-posts`,
    fallback
  );

  return (
    <div>
      {/* Hero Section */}
      <section
        className="
          relative 
          h-[50vh] sm:h-[40vh] lg:h-[30vh] 
          flex items-center justify-center 
          text-center text-white
        "
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-2xl px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading mb-4">
            Watch. Listen. Read.
          </h1>
          <p className="text-base sm:text-lg mb-8">
            Christ-centered content to guide and encourage your walk. Step into the Hub.
          </p>
          <a
            href="/search"
            className="
              btn-primary bg-search 
              px-6 sm:px-8 py-3 sm:py-4 
              rounded-lg font-medium 
              block sm:inline-block w-full sm:w-auto
            "
          >
            Discover More
          </a>
        </div>
      </section>

      {/* Latest Posts Grid */}
      <section className="max-w-6xl mx-auto py-4 px-4">
        <h2 className="text-3xl font-heading">New on Spirit Hub</h2>
        <ContentGrid
          items={latestPosts}
          accent="search"
          headingAccent="search"
          useItemBadgeAccent={true}
        />
      </section>
    </div>
  );
}