import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contratistas | AITANA",
  description: "Panel de gestión de seguridad y salud en el trabajo",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
