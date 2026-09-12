import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import About from "@/components/About";
import Stats from "@/components/Stats";
import DirectorMessage from "@/components/DirectorMessage";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import Brand from "@/components/Brand";
import ImageCarousel from "@/components/ImageCarousel";



export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
       <h1 className="text-xl font-bold p-4">Sheet Data</h1>
<ImageCarousel
        slides={[
          {
            src: "/Profile.jpg",
            alt: "Global Max chairman in the company office",
            title: "Global Max Networks",
            description: "Connecting futures with trusted, professional services.",
          },
        ]}
        intervalMs={5000}
      />      <Brand />
      <ServicesGrid />
      <About />
      <Stats />
      <DirectorMessage />
      <WhyChooseUs />
      <ContactCTA />
      <Footer />
    </main>
  );
}
