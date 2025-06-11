import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Contact from "@/components/sections/Contact";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <WhyChooseUs />
      <Contact />
    </main>
  );
}
