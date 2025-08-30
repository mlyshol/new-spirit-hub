import PillarPage from '../../components/PillarPage';
import type { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Support – The Spirit Hub',
  };
}


export default function SupportPage() {
  return (
    <PillarPage
      accent="support" // or create a 'support' accent in your Tailwind config if you want a unique color
      emoji="🤝"
      title="Support"
      description="Partner with us to make faith‑centered content accessible and inspiring."
      hideGrid
      items={[]}
    >
      <section className="max-w-3xl mx-auto py-4 px-4 prose prose-lg prose-neutral prose-h2:text-3xl prose-h2:font-bold prose-headings:text-about">
        <h2 className="text-3xl font-bold text-support mb-4">Why Your Support Matters</h2>
        <p className="prose prose-lg prose-neutral mb-4">
          Spirit Hub is a labor of love — built to connect believers with
          meaningful, faith‑centered media. Your support helps us curate,
          produce, and share content that inspires transformation.
        </p>

        <h2 className="text-3xl font-bold text-support mb-4">Make a One‑Time Donation</h2>
        <p className="prose prose-lg prose-neutral mb-4">
          Every gift, no matter the size, helps us continue our mission.  
          Click below to make a secure one‑time donation:
        </p>
        <p className="prose prose-lg prose-neutral mb-4">
          <a
            href="https://www.paypal.com/ncp/payment/K7TZPRBA2VY7U"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-support text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-support-dark transition"
          >
            Donate Now
          </a>
        </p>
      </section>
    </PillarPage>
  );
}