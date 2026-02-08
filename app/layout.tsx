import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css";
import { ThemeProvider} from "next-themes";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Kapucak Eshop",
  description: "A modern ecommerce store built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
