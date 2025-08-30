import '../styles/globals.css';
import Layout from '../components/Layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'The2 Spirit Hub',
    template: '%s – The Spirit Hub',
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}