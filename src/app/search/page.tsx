import type { Metadata } from 'next';
import { buildMetadata } from '../../lib/metadata';
import SearchClient from '../search/searchClient';

export const metadata: Metadata = buildMetadata({
  title: 'Search',
  description: 'Browse all content across Watch, Listen, and Read.',
});

export default function SearchPage() {
  return <SearchClient />;
}