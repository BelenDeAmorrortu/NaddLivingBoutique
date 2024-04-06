import { Nav, Footer, BackToTop } from "../../components";
import "../globals.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav color="black" />
      <main>{children}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
