import SotaqueNavbar from "@/components/layout/SotaqueNavbar";
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
    <>
      {/* Navbar Fixa Global com Drawer de Navegação e Equalizador Sonoro */}
      <SotaqueNavbar />

      <main id="main" className="min-h-screen bg-background text-foreground">
        {/* Ato 1: Abertura Monumental com Vídeo Hero Cinematográfico */}
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

      {/* Rodapé Enriquecido Sotaque — Azul Meia-Noite Oficial #0B1B47 */}
      <footer className="border-t border-[#F4F1E5]/15 bg-[#0B1B47] pt-16 pb-12 text-[#F4F1E5]">
        <div className="mx-auto max-w-content px-6 lg:px-8">
          <div className="grid grid-cols-12 gap-10 pb-12 border-b border-[#F4F1E5]/10">
            {/* Coluna 1: Marca, Missão e Posicionamento Autoral */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
              <a
                href="#hero"
                aria-label="Sotaque — Voltar ao topo"
                className="inline-flex items-center gap-2 group w-fit"
              >
                <img
                  src="/brand/logos/sotaque_simbolo-e-nome_creme.png"
                  alt="Sotaque Estúdio 360"
                  className="h-9 lg:h-10 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </a>
              <p className="text-sm leading-relaxed text-[#F4F1E5]/85 max-w-[42ch]">
                Estúdio 360 de comunicação estratégica, branding autoral e design com raiz regional e acabamento contemporâneo.
              </p>
            </div>

            {/* Coluna 2: Navegação Âncora Rápida */}
            <div className="col-span-6 lg:col-span-3">
              <h3 className="text-xs font-mono font-semibold tracking-widest uppercase text-[#E27908] mb-4">
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
                      className="text-[#F4F1E5]/85 hover:text-[#E27908] hover:translate-x-1 transition-all inline-block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna 3: Canais Diretos & Redes */}
            <div className="col-span-6 lg:col-span-4">
              <h3 className="text-xs font-mono font-semibold tracking-widest uppercase text-[#E27908] mb-4">
                Atendimento & Projetos
              </h3>
              <div className="flex flex-col gap-3 text-xs font-mono text-[#F4F1E5]/85">
                <div>
                  <span className="block text-[#F4F1E5]/85 font-semibold text-xs uppercase tracking-wider">E-mail Direto</span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-[#F4F1E5] hover:text-[#E27908] transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div>
                  <span className="block text-[#F4F1E5]/85 font-semibold text-xs uppercase tracking-wider">Canal WhatsApp</span>
                  <a
                    href={CONTACT_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4F1E5] hover:text-[#E27908] transition-colors"
                  >
                    {CONTACT_INFO.phoneDisplay} ↗
                  </a>
                </div>
                <div>
                  <span className="block text-[#F4F1E5]/85 font-semibold text-xs uppercase tracking-wider">Sede & Alcance</span>
                  <p className="text-[#F4F1E5]/85">{CONTACT_INFO.city} — Atendimento Nacional</p>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href={CONTACT_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4F1E5]/85 hover:text-[#E27908] transition-colors"
                  >
                    Instagram ↗
                  </a>
                  <a
                    href={CONTACT_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4F1E5]/85 hover:text-[#E27908] transition-colors"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Barra Inferior: Copyright, CNPJ Placeholder, Subir */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#F4F1E5]/85">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>© {currentYear} Sotaque Estúdio.</span>
              <span className="text-[#F4F1E5]/20 hidden sm:inline">|</span>
              <a href="/privacidade" className="hover:text-[#E27908] transition-colors underline underline-offset-2">
                Privacidade & LGPD
              </a>
              <span className="text-[#F4F1E5]/20 hidden sm:inline">|</span>
              <span>Todos os direitos reservados.</span>
            </div>
            <a
              href="#hero"
              aria-label="Voltar ao topo da página"
              className="hover:text-[#F4F1E5] transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Topo</span>
              <span aria-hidden>↑</span>
            </a>
          </div>
        </div>
      </footer>
    </main>
  </>
  );
}
