import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neon İçerik Planı",
  description: "Neon PostgreSQL üzerinde içerik planı panosu",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
