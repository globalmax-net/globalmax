import Header from "@/components/Header";
import Hero from "@/components/Hero";

import Stats from "@/components/Stats";

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
      <ImageCarousel
        slides={[       
          {
            src: "/VisaConsultancy.png",
            alt: "Visa Consultancy",
            title: "Visa Consultancy",
            description: "End-to-end support across all visa categories, from eligibility checks to pre-departure guidance.",
          },

          {
            src: "/DigitalMarketing.png",
            alt: "Digital Marketing",
            title: "Digital Marketing",
            description: "Social media management, content creation, SEO, and promotional campaigns.",
          },
          {
            src:"/RealEstateServices.png",
            alt: "Real Estate Service",
            title: "Real Estate Service",
            description: "Connecting futures with trusted, professional services.",
          },
          {
            src: "/Student&EducationGuidance.png",
            alt: "Student Education Guidance",
            title: "Student Education Guidance",
            description: "Counselling on study destinations, admissions, interview prep, and scholarship guidance.",
          },
        ]}
        intervalMs={5000}
      />      <Brand />
     
      <Stats />
      <WhyChooseUs />
      <ContactCTA />
      <Footer />
    </main>
  );
}
