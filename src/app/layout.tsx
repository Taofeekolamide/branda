import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Branda",
  description:
    "Professional branding, design, printing, photography and creative services.",
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