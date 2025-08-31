import type { Metadata } from 'next';

interface MetaOptions {
  title?: string;
  description?: string;
}

export function buildMetadata({
  title,
  description,
}: MetaOptions): Metadata {
  const siteName = 'The Spirit Hub';
  const fullTitle = title ? `${title} – ${siteName}` : siteName;

  return {
    title: fullTitle,
    description: description || 'Faith‑centered content to inspire and connect.',
    openGraph: {
      title: fullTitle,
      description: description || 'Faith‑centered content to inspire and connect.',
      siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || 'Faith‑centered content to inspire and connect.',
    },
  };
}