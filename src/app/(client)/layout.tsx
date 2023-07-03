import { Nav, Footer, BackToTop } from "../../components";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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
  // metadataBase: new URL('URL DEL DEPLOY'),
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
    <html
      lang="en"
      className={`overflow-x-hidden ${montserrat.variable} ${cormorant.variable}`}
    >
      <body className="overflow-x-hidden">
        <main>
          <Nav />
          {children}
          <Footer />
          <BackToTop />
        </main>
      </body>
    </html>
  );
}
