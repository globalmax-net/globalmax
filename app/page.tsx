import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageCarousel from "@/components/ImageCarousel";
import Success from "@/components/Success";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import Brand from "@/components/Brand";
import VisionMission from "@/components/VisionMission";
import Services from "@/components/ServicesGrid";
import DirectorMessage from "@/components/DirectorMessage";
import Objectives from "@/components/Objectives";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import LatestPosts from "@/components/LatestPosts";
import { getServices, getUpcomingPlatforms } from "@/lib/services";
import { getSuccessStats } from "@/lib/success";

export default async function Home() {
  const [services, upcoming, successStats] = await Promise.all([
    getServices(),
    getUpcomingPlatforms(),
    getSuccessStats(),
  ]);

  return (
    <main>
      <Header />
      <ImageCarousel
  slides={[
    {
      src: "/VisaConsultancy.png",
      title: "Visa Consultancy",
      subtitle: "Beyond Borders",
      description:
        "Professional guidance to help you move confidently towards your international journey.",
    },
    {
      src: "/DigitalMarketing.png",
      title: "Digital Marketing",
      subtitle: "Shape the Digital",
      description:
        "Building stronger brands through creative digital strategies and meaningful connections.",
    },
    {
      src: "/RealEstate.png",
      title: "Real Estate",
      subtitle: "Built for Tomorrow",
      description:
        "Connecting people with opportunities and helping turn property goals into reality.",
    },
    {
      src: "/StudentEdu.png",
      title: "Education Guidance",
      subtitle: "Build What’s Next",
      description:
        "Supporting students with the right guidance and opportunities for their educational journey.",
    },
  ]}
  intervalMs={5000}
/>
      <Brand />
      <Hero />
      <DirectorMessage />
      <Success stats={successStats} />
      <Services services={services} upcoming={upcoming} compactSpacing />
      <LatestPosts />
      <VisionMission />
      <Objectives />
      <ContactCTA />
      <Footer />
      <ScrollToTopButton />
    </main>
  );
}