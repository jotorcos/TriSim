import Footer from '@/components/Footer'; // Importing the Footer component
import GoBack from '@/components/GoBack';
import Header from '@/components/Header'; // Importing the Header component
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TriSim',
  description: 'Triathlon Training & Strategy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Include the Header here */}
        <Header />

        <GoBack />

        {/* Main content will be rendered here */}
        <main className="flex-grow">{children}</main>

        {/* Include the Footer here */}
        <Footer />
      </body>
    </html>
  );
}
