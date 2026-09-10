import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlvckWhite Barbería — San Bernardo",
  description: "Corte limpio. Actitud blvck & white. Reserva tu hora online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
