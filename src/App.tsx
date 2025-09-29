import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Downloads } from "./components/Downloads";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

function HomePage() {
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}