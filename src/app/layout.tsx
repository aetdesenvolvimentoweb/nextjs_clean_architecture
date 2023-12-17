import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/modules/frontend/styles/globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Next.js Clean Architecture",
  description: "Custom description will be created.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
