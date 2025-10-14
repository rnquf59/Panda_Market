import Footer from "./components/footer";
import Hero from "./components/Hero";
import Landing from "./components/LandingMain";
import Trust from "./components/turst";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Landing />
      <Trust />
      <Footer />
    </main>
  );
}
