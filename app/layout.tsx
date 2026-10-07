import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Look de Quince",
  description: "Looks, renta y fiestas por zona para chavas de C y C+.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="wrap">
          <nav className="nav">
            <Link className="brand" href="/">Look de Quince</Link>
            <div>
              <Link href="/">Número 01</Link>
              <Link href="/eventos">Eventos</Link>
              <Link href="/subir">Subir fiesta</Link>
            </div>
          </nav>
          {children}
          <footer>
            Número 01 · 7 de octubre de 2026 · Renta, maquillaje de iglesia y fiestas por pueblo. Las fotos de una menor solo entran con autorización de mamá o papá.
          </footer>
        </div>
      </body>
    </html>
  );
}
