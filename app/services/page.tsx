import Header from "@/components/Header";
import ServicesGrid from "@/components/ServicesGrid";
import Footer from "@/components/Footer";
import { getServices, getUpcomingPlatforms } from "@/lib/services";

export default async function Services() {
  const [services, upcoming] = await Promise.all([getServices(), getUpcomingPlatforms()]);

  return (
    <>
      <Header />
      <ServicesGrid services={services} upcoming={upcoming} />
      <Footer />
    </>
  );
}