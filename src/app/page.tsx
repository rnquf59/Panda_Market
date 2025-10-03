import Footer from "../components/layout/footer";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/section/Hero";
import Landing from "../components/section/LandingMain";
import Trust from "../components/section/turst";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Landing />
      <Trust />
      <Footer />
    </main>
  );
}
