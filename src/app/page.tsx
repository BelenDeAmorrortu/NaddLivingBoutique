import {
  Header,
  Banner,
  Spotlight,
  OurShop,
  ContactForm,
} from "@/components/index";
import { getSpotlight } from "@/requests";

export default async function Home() {
  const spotlight = await getSpotlight();
  return (
    <>
      <Header />
      <Banner />
      {spotlight.length > 0 && <Spotlight products={spotlight} />}
      <OurShop />
      <ContactForm />
    </>
  );
}
