import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'SmartBin — Agartala Municipal Corporation (AMC)',
  description: 'Urban Sanitation Telemetry System & Civic Waste Management for Agartala Smart City, Tripura.',
  icons: {
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Xtj1WksxuTVp91YK8Fter_M9YFmq0NQBMuYmDNg5GwVXmQEkDFqUWljyQQspbEsRzNBweQkg1iZmCRL-nrJ2uNs87RfqKtBf8aYXO2U6ubqQM3htA0pSNNAkzpouCaGLi8Bw6070pt_lKnUcYkTHn8477zTI-mtcr83_hAeAKQGyEOSKeQbSDeAyBnZgHUk-6Ot8bLD-Asjc3yWt0vtc5F20qSWlRggNo1sM-mE0upSULtvwSNwD',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-surface font-sans text-on-surface antialiased min-h-screen flex flex-col">
        <AppProvider>
          <Navbar />
          <main className="flex-1 flex flex-col w-full pb-16 md:pb-6">{children}</main>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}

