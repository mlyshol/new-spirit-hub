// src/components/Layout.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global site header */}
      <Header />

      {/* Main content area */}
      <main className="flex-grow">{children}</main>

      {/* Global site footer */}
      <Footer />
    </div>
  );
}