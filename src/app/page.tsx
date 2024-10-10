import {
  Header,
  Banner,
  Spotlight,
  OurShop,
  ContactForm,
} from "@/components/index";
import { getSpotlight } from "@/requests";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const spotlight = await getSpotlight();
  return (
    <>
      <Header />
      <Banner />
      <Spotlight products={spotlight} />
      <OurShop />
      <ContactForm />
    </>
  );
}
