import type { Metadata } from 'next';
import { Inter, Urbanist, Unlock, Sarpanch } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';


//Fonts and their settings
const inter = Inter({ subsets: ['latin'], variable: "--font-inter"});
const urbanist = Urbanist({ subsets: ['latin'], variable: "--font-urbanist" });
const unlock = Unlock({weight: "400", subsets: ["latin"] , variable: "--font-unlock"});

export const metadata: Metadata = {
  title: 'CAR(E)',
  description: 'CAR(E) webpage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
     <html
      lang="en"
      className={`dark ${inter.variable} ${urbanist.variable} ${unlock.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
  };