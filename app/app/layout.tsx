import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";

import Icon from "@/assets/tinybird-isotype.png";
import getAuth from "@/lib/server/get-auth";
import ErrorModal from "@/ui/ErrorModal";
import Footer from "@/ui/Footer";
import Provider from "@/ui/Provider";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
  title: "Web Analytics Dashboard",
  description: "Web Analytics Starter Kit built with Tinybird and Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { errorMessage } = await getAuth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen px-5 py-5 text-sm sm:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-6 sm:space-y-10">
              <Image src={Icon} alt="" width={24} height={24} />
              {errorMessage ? (
                <ErrorModal message={errorMessage} />
              ) : (
                <Provider>{children}</Provider>
              )}
            </div>
            <div className="mt-20">
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
