import '../styles/globals.css';
import Layout from '../components/Layout';

export const metadata = {
  title: 'The Spirit Hub',
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