// lib/api.ts
export interface Item {
  _id: string;
  title: string;
  description: string;
  image?: string;
  href: string;
  sourceUrl?: string;
  type: string;
  category?: string;
  accent: 'watch' | 'listen' | 'read' | 'search' | 'about' | 'support';
  date?: string;
  source?: string;
  embedCode?: string;
}

export async function fetchItems(accent?: Item['accent']): Promise<Item[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const url = accent ? `${baseUrl}/api/items?accent=${accent}` : `${baseUrl}/api/items`;

  const res = await fetch(url, { cache: 'no-store' }); // no-store for always-fresh data
  if (!res.ok) throw new Error(`Failed to fetch items: ${res.statusText}`);
  return res.json();
}