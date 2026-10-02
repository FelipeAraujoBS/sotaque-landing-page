"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function SotaqueNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitora o scroll para aplicar acabamento dinâmico na navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  // Gerenciamento de foco do Drawer (A11y)
  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      closeButtonRef.current?.focus();
    } else if (wasOpenRef.current) {
      menuButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Fecha o menu com tecla ESC e implementa foco cíclico (focus trap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Previne scroll do body quando menu estiver aberto e sincroniza com o Lenis
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (lenis?.stop) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis?.start) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis?.start) lenis.start();
    };
  }, [isOpen]);

  // Navegação suave integrada com o Lenis
  const handleNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsOpen(false);

      document.body.style.overflow = "";
      const lenis = (window as any).__lenis;
      if (lenis?.start) lenis.start();

      const targetId = href.replace("#", "");

      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) {
          window.location.hash = href;
          return;
        }

        if (lenis && typeof lenis.scrollTo === "function") {
          lenis.scrollTo(targetElement, {
            offset: targetId === "hero" ? 0 : -30,
            duration: 1.2,
          });
        } else {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }

        if (window.history && window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      }, 100);
    },
    []
  );

  return (
    <>
      {/* Top Navbar Suspensa — Gradiente Vertical Azul Meia-Noite / Creme (de cima para baixo, sem borda) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-auto transition-all duration-300 border-none ${
          isScrolled ? "py-3 sm:py-3.5 shadow-sm" : "py-4 sm:py-5"
        } bg-gradient-to-b from-[#0B1B47] to-[#F4F1E5] backdrop-blur-md`}
      >
        <div className="mx-auto max-w-content w-full px-6 lg:px-8 flex items-center justify-between">
          {/* Esquerda: Logotipo Oficial SOTAQUE em Creme (alto contraste sobre o Azul) */}
          <div className="flex items-center">
            <a
              href="#hero"
              onClick={(e) => handleNavigate(e, "#hero")}
              aria-label="Sotaque — Início"
              className="hover:opacity-85 transition-opacity flex items-center group cursor-pointer"
            >
              <img
                src="/brand/logos/sotaque_simbolo-e-nome_creme.png"
                alt="Sotaque Estúdio 360"
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </a>
          </div>

          {/* Centro/Direita: Links de âncora visíveis no desktop */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9 text-xs font-mono tracking-widest uppercase font-semibold text-[#F4F1E5]/85"
            aria-label="Navegação Principal"
          >
            {[
              { label: "Pilares", href: "#pilares" },
              { label: "Manifesto", href: "#dna" },
              { label: "Portfólio", href: "#work" },
              { label: "Contato", href: "#contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavigate(e, link.href)}
                className="hover:text-[#E27908] transition-colors py-1 relative group text-[#F4F1E5]/85"
              >
                {link.label}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#E27908]" />
              </a>
            ))}
          </nav>

          {/* Direita: CTA Único no Desktop + Botão Menu Mobile */}
          <div className="flex items-center gap-3">
            {/* CTA Desktop: Rótulo "Iniciar projeto" (diferente do Hero) */}
            <a
              href="#contact"
              onClick={(e) => handleNavigate(e, "#contact")}
              className="hidden md:inline-flex items-center justify-center rounded-full bg-[#E27908] hover:bg-[#C96B07] text-[#F4F1E5] px-5 py-2.5 text-xs font-mono font-bold tracking-widest uppercase shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908]"
            >
              Iniciar projeto
            </a>

            {/* Botão Menu Mobile (Gaveta) */}
            <div className="md:hidden">
              <button
                ref={menuButtonRef}
                onClick={() => setIsOpen(true)}
                aria-label="Abrir Menu de Navegação Sotaque"
                aria-expanded={isOpen}
                aria-controls="drawer-menu"
                className="group flex items-center gap-2 rounded-full border border-[#0B1B47]/20 px-3.5 py-1.5 text-[11px] font-mono tracking-widest uppercase text-[#0B1B47] bg-[#F4F1E5] hover:bg-[#0B1B47] hover:text-[#F4F1E5] transition-all duration-200 shadow-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E27908]" />
                <span className="font-semibold">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Drawer Mobile */}
      <div
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[999] transition-all duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
      >
        {/* Backdrop suave */}
        <div
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          className="absolute inset-0 bg-[#0B1B47]/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Painel lateral do Menu */}
        <div
          id="drawer-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-hidden={!isOpen}
          aria-label="Menu de Navegação Sotaque"
          className={`relative z-10 w-full max-w-sm h-full bg-[#F4F1E5] border-r border-[#0B1B47]/15 p-7 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out shadow-2xl text-[#0B1B47] ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Topo do Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-[#0B1B47]/15">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6E1016]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#0B1B47] font-semibold">
                Sotaque • Estúdio 360
              </span>
            </div>
            <button
              ref={closeButtonRef}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="w-9 h-9 rounded-full border border-[#0B1B47]/20 text-[#0B1B47] hover:bg-[#0B1B47] hover:text-[#F4F1E5] flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Links Principais do Estúdio */}
          <nav className="py-6 flex flex-col gap-4">
            {[
              { label: "Início", href: "#hero", tag: "01" },
              { label: "Pilares 360", href: "#pilares", tag: "02" },
              { label: "Manifesto & Raiz", href: "#dna", tag: "03" },
              { label: "Portfólio Vivo", href: "#work", tag: "04" },
              { label: "Depoimentos", href: "#depoimentos", tag: "05" },
              { label: "Contato & Diagnóstico", href: "#contact", tag: "06" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavigate(e, item.href)}
                className="group flex items-center justify-between text-lg font-['Commune',serif] font-medium text-[#0B1B47] hover:text-[#E27908] transition-colors py-1 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#0B1B47]/50 font-semibold">
                    {item.tag}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="text-sm font-mono text-[#0B1B47]/40 group-hover:text-[#E27908] transition-colors">
                  →
                </span>
              </a>
            ))}
          </nav>

          {/* Rodapé do Drawer */}
          <div className="pt-6 border-t border-[#0B1B47]/15">
            <a
              href="#contact"
              onClick={(e) => handleNavigate(e, "#contact")}
              className="w-full inline-flex items-center justify-center rounded-full bg-[#E27908] text-[#F4F1E5] py-3 text-xs font-mono font-bold tracking-widest uppercase shadow-sm"
            >
              Iniciar projeto
            </a>
            <p className="text-[11px] font-mono text-[#0B1B47]/60 text-center mt-3">
              Salvador · Bahia · Brasil
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
