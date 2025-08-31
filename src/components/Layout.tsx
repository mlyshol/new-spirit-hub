import Header from '../components/Header';
import Footer from '../components/Footer';
import Script from 'next/script';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Global site header */}
      <Header />

      {/* Main content area */}
      <main className="flex-grow">{children}</main>

      {/* Ad block */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<ins class="CANBMDDisplayAD" data-bmd-ad-unit="1219220520250620T142018403D8CD860AA710400BA7BB613989C34002" style="display:block"></ins>`
        }}
      />
      <Script src="https://secureaddisplay.com/au/bmd/" strategy="afterInteractive" />

      {/* Global site footer */}
      <Footer />
    </div>
  );
}