import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Downloads } from "./components/Downloads";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Highlights />
      <Features />
      <HowItWorks />
      <Downloads />
      <Contact />
      <Footer />
    </div>
  );
}