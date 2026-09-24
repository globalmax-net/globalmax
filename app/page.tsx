import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ImageCarousel from "@/components/ImageCarousel";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import Brand from "@/components/Brand";
import VisionMission from "@/components/VisionMission";

export default function Home() {
  return (
    <main>
      <Header />
      <ImageCarousel
        slides={[
          { src: "/VisaConsultancy.png", alt: "Visa Consultancy" },
          { src: "/DigitalMarketing.png", alt: "Digital Marketing" },
          { src: "/RealEstate.png", alt: "Real Estate Service" },
          { src: "/StudentEdu.png", alt: "Student Education Guidance" },
        ]}
        intervalMs={5000}
      />
      <Brand />
      <Hero />
      <VisionMission />
      <Stats />
      <WhyChooseUs />
      <ContactCTA />
      <Footer />
    </main>
  );
}