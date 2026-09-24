import SotaquePreloader from "@/components/ui/SotaquePreloader";
import Hero from "@/components/sections/Hero";
import Pillars from "@/components/sections/Pillars";
import Portfolio from "@/components/sections/Portfolio";
import RegionalDna from "@/components/sections/RegionalDna";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import ContactForm from "@/components/sections/ContactForm";
import { CONTACT_INFO } from "@/lib/contact";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main id="main" className="min-h-screen bg-background text-foreground">
      <SotaquePreloader />
      {/* Ato 1: Abertura Monumental */}
      <Hero />

      {/* Ato 2: Bloco Claro Contínuo — O Método e a Filosofia */}
      <Pillars />
      <RegionalDna />

      {/* Ato 3: Bloco Escuro Contínuo — A Prova e os Resultados */}
      <Portfolio />
      <Testimonials />

      {/* Ato 4: Bastidores e Conversão */}
      <InstagramFeed />
      <ContactForm />

      {/* Rodapé Enriquecido Sotaque — P-003 & P-004 */}
      <footer className="border-t border-[#F3EBDD]/15 bg-[#102C2B] pt-16 pb-12 text-[#F3EBDD]">
        <div className="mx-auto max-w-content px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-10 pb-12 border-b border-[#F3EBDD]/10">
            {/* Coluna 1: Marca, Missão e Conformidade CFM */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              <a
                href="#hero"
                aria-label="Sotaque — Voltar ao topo"
                className="inline-flex items-center gap-1.5 group w-fit"
              >
                <span className="font-['Chroma_Venue'] font-chroma tracking-[-0.03em] text-2xl lg:text-3xl text-[#F3EBDD]">
                  Sotaque
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#D63A2F] shadow-[0_0_10px_#D63A2F] group-hover:scale-125 transition-transform" />
              </a>
              <p className="text-sm leading-relaxed text-[#F3EBDD]/75 max-w-[42ch]">
                Comunicação médica 360, branding autoral e autoridade digital com calor humano e rigor ético.
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#58734A]/40 bg-[#58734A]/15 px-3 py-1 text-[11px] font-mono text-[#A3C793] w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#86A675]" aria-hidden />
                Conformidade com a Resolução CFM nº 2.336/2023
              </div>
            </div>

            {/* Coluna 2: Navegação Âncora Rápida */}
            <div className="col-span-6 lg:col-span-3">
              <h3 className="text-xs font-mono font-semibold tracking-widest uppercase text-[#E7A92B] mb-4">
                Navegação
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs font-mono">
                {[
                  { label: "Pilares 360", href: "#pilares" },
                  { label: "Manifesto & Raiz", href: "#dna" },
                  { label: "Portfólio Vivo", href: "#work" },
                  { label: "Depoimentos", href: "#depoimentos" },
                  { label: "Instagram", href: "#instagram" },
                  { label: "Contato & Diagnóstico", href: "#contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-[#F3EBDD]/70 hover:text-[#F3EBDD] hover:translate-x-1 transition-all inline-block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3: Canais Diretos & Redes */}
            <div className="col-span-6 lg:col-span-4">
              <h3 className="text-xs font-mono font-semibold tracking-widest uppercase text-[#E7A92B] mb-4">
                Atendimento Médico
              </h3>
              <div className="flex flex-col gap-3 text-xs font-mono text-[#F3EBDD]/75">
                <div>
                  <span className="block text-[#F3EBDD]/75 font-semibold text-[10px] uppercase">E-mail Direto</span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-[#F3EBDD] hover:text-[#E7A92B] transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div>
                  <span className="block text-[#F3EBDD]/75 font-semibold text-[10px] uppercase">Canal WhatsApp</span>
                  <a
                    href={CONTACT_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F3EBDD] hover:text-[#58734A] transition-colors"
                  >
                    {CONTACT_INFO.phoneDisplay} ↗
                  </a>
                </div>
                <div>
                  <span className="block text-[#F3EBDD]/75 font-semibold text-[10px] uppercase">Sede & Alcance</span>
                  <p className="text-[#F3EBDD]/70">{CONTACT_INFO.city} — Atendimento Nacional</p>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={CONTACT_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F3EBDD]/70 hover:text-[#E7A92B] transition-colors"
                  >
                    Instagram ↗
                  </a>
                  <a
                    href={CONTACT_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F3EBDD]/70 hover:text-[#E7A92B] transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Barra Inferior: Copyright, CNPJ Placeholder, Subir */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F3EBDD]/75">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>© {currentYear} Sotaque Estúdio.</span>
              <span className="text-[#F3EBDD]/20 hidden sm:inline">|</span>
              <span>{CONTACT_INFO.cnpjPlaceholder}</span>
              <span className="text-[#F3EBDD]/20 hidden sm:inline">|</span>
              <span>Sigilo médico e confidencialidade garantidos.</span>
            </div>
            <a
              href="#hero"
              aria-label="Voltar ao topo da página"
              className="hover:text-[#F3EBDD] transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Topo</span>
              <span aria-hidden>↑</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
