import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { BackToTop, Footer, Nav, Whatsapp } from "@/components";
import { CartProvider } from "@/contexts/CartContext";

const montserrat = Montserrat({
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-secondary",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://naddlivingboutique.com"),
  title: {
    default: "NADD Living Boutique",
    template: `%s | NADD Living Boutique`,
  },
  description: "Fabricantes de muebles y sillones de primera calidad",
  openGraph: {
    title: {
      default: "NADD Living Boutique",
      template: `%s | NADD Living Boutique`,
    },
    description: "Fabricantes de muebles y sillones de primera calidad",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body>
        <CartProvider>
          <Nav color="black" />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <Whatsapp />
        </CartProvider>
      </body>
    </html>
  );
}
