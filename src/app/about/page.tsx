import PillarPage from '../../components/PillarPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};



export default function AboutPage() {
  return (
    <PillarPage
      accent="about"
      emoji="ℹ️"
      title="About"
      description="Making faith‑centered content beautiful, accessible, and inspiring."
      hideGrid
      items={[]}
    >
      <section className="max-w-3xl mx-auto py-4 px-4 prose prose-lg prose-neutral">
        <h2 className="text-3xl font-bold text-about mb-4">Our Mission</h2>
        <p className="prose prose-lg prose-neutral mb-4">
          Spirit Hub exists to make faith‑centered content accessible, engaging, and
          beautifully presented. We believe in the power of storytelling, teaching,
          and worship to inspire transformation in everyday life.
        </p>
        <h2 className="text-3xl font-bold text-about mb-4">Our Story</h2>
        <p className="prose prose-lg prose-neutral mb-4">
          Born from a desire to bring clarity and beauty to the way Christian content
          is shared online, Spirit Hub blends modern design with timeless truth.
          Whether you’re here to watch, listen, or read, our goal is to help you
          encounter God’s Word in a way that resonates deeply.
        </p>

        <h2 className="text-3xl font-bold text-about mb-4">Our Vision</h2>
        <p className="prose prose-lg prose-neutral mb-4">
          We envision a global community where believers can easily discover,
          experience, and share content that strengthens their faith and connects
          them with others on the journey.
        </p>
      </section>
    </PillarPage>
  );
}