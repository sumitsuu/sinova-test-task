import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Breed Sinova App",
  description:
    "Breeding management webapp for livestock producers. Track genetics, analyze data, and optimize performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
