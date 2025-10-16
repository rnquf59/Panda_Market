import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Landing from "./components/LandingMain";
import LandingNavbar from "./components/LandingNavbar";
import Trust from "./components/Turst";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <LandingNavbar />
      <Hero />
      <Landing />
      <Trust />
      <Footer />
    </main>
  );
}
