import Hero from "@/components/sections/Hero";
import Pillars from "@/components/sections/Pillars";
import Portfolio from "@/components/sections/Portfolio";
import RegionalDna from "@/components/sections/RegionalDna";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Pillars />
      <Portfolio />
      <RegionalDna />
      <Testimonials />
      <InstagramFeed />
      <ContactForm />
      <footer className="border-t border-[#F3EBDD]/10 bg-[#102C2B] py-10 text-[#F3EBDD]">
        <div className="mx-auto max-w-content px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F3EBDD]/50">
          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold tracking-tight text-lg text-[#F3EBDD]">
              SOTAQUE<span className="text-[#D63A2F]">.</span>
            </span>
            <span className="text-[#F3EBDD]/20">|</span>
            <span>Comunicação & Marketing 360 para Saúde</span>
          </div>
          <span>© 2026 Sotaque Estúdio — Digital Craft em Saúde</span>
        </div>
      </footer>
    </main>
  );
}
