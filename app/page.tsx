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

export default function Home() {
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
      <Success />
      <Services />
      <VisionMission />
      <WhyChooseUs />
      <ContactCTA />
      <Footer />
    </main>
  );
}