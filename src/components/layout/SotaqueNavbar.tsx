"use client";

import { useState, useEffect } from "react";

interface SotaqueNavbarProps {
  isPlayingSound?: boolean;
  onToggleSound?: () => void;
}

export default function SotaqueNavbar({
  isPlayingSound: externalIsPlaying,
  onToggleSound,
}: SotaqueNavbarProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalIsPlaying, setInternalIsPlaying] = useState(false);

  const isPlayingSound =
    externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;
  const handleToggleSound =
    onToggleSound || (() => setInternalIsPlaying((p) => !p));

  // Fecha o menu com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Previne scroll do body quando menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Top Navbar Suspensa com Identidade Oficial SOTAQUE */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-auto px-6 sm:px-10 lg:px-14 py-6 transition-all duration-300">
        <div className="w-full flex items-center justify-between">
          {/* Esquerda: Botão Menu em Pílula */}
          <div>
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Abrir Menu de Navegação Sotaque"
              className="group flex items-center gap-2 rounded-full border border-[#F3EBDD]/25 px-5 py-2 text-[11px] font-mono tracking-widest uppercase text-[#F3EBDD] backdrop-blur-md bg-[#102C2B]/60 hover:bg-[#F3EBDD] hover:text-[#102C2B] transition-all duration-300 cursor-pointer shadow-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E7A92B] group-hover:bg-[#D63A2F] transition-colors" />
              <span>Menu</span>
            </button>
          </div>

          {/* Centro: Logotipo Oficial SOTAQUE com ponto Goiaba */}
          <div className="flex items-center justify-center">
            <a
              href="#hero"
              aria-label="Sotaque — Início"
              className="text-[#F3EBDD] hover:opacity-90 transition-opacity flex items-center gap-1 group"
            >
              <span className="font-display font-black tracking-[-0.03em] text-2xl sm:text-[26px] text-[#F3EBDD]">
                SOTAQUE
              </span>
              <span className="w-2 h-2 rounded-full bg-[#D63A2F] shadow-[0_0_10px_#D63A2F] group-hover:scale-125 transition-transform" />
            </a>
          </div>

          {/* Direita: Equalizador de Som + Botão Iniciar Projeto */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Toggle de som interativo */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleSound();
              }}
              aria-label={isPlayingSound ? "Desativar ambientação sonora" : "Ativar ambientação sonora"}
              className="group hidden sm:flex items-center gap-2 px-3 py-2 text-[#F3EBDD]/60 hover:text-[#F3EBDD] transition-colors cursor-pointer"
            >
              <span className="text-[11px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#E7A92B]">
                som
              </span>
              <div className="flex items-center gap-[2.5px] h-3.5">
                <span
                  className={`w-[2px] bg-[#E7A92B] rounded-full transition-all duration-300 ${
                    isPlayingSound ? "h-3.5 animate-pulse" : "h-1 opacity-50"
                  }`}
                />
                <span
                  className={`w-[2px] bg-[#D63A2F] rounded-full transition-all duration-300 ${
                    isPlayingSound ? "h-2 animate-bounce" : "h-2 opacity-50"
                  }`}
                />
                <span
                  className={`w-[2px] bg-[#58734A] rounded-full transition-all duration-300 ${
                    isPlayingSound ? "h-3.5 animate-pulse" : "h-3 opacity-50"
                  }`}
                />
                <span
                  className={`w-[2px] bg-[#B85C42] rounded-full transition-all duration-300 ${
                    isPlayingSound ? "h-2.5 animate-bounce" : "h-1.5 opacity-50"
                  }`}
                />
              </div>
            </button>

            {/* Botão de Ação Primário: Vermelho Goiaba (10% - Signature CTA) */}
            <a
              href="#contact"
              className="rounded-full border border-[#D63A2F] bg-[#D63A2F] px-5 py-2 text-[11px] font-mono tracking-widest uppercase text-[#F3EBDD] font-semibold hover:bg-[#BA2E24] hover:border-[#BA2E24] transition-all duration-300 cursor-pointer shadow-lg shadow-[#D63A2F]/25"
            >
              Iniciar Projeto
            </a>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Drawer Sotaque */}
      <div
        className={`fixed inset-0 z-[999] transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop escuro com blur em Azul Petróleo Noturno */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-[#102C2B]/85 backdrop-blur-xl"
        />

        {/* Painel lateral do Menu */}
        <div
          className={`relative z-10 w-full max-w-lg h-full bg-[#102C2B] border-r border-[#F3EBDD]/15 p-8 sm:p-12 flex flex-col justify-between overflow-y-auto transform transition-transform duration-500 ease-out shadow-2xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Topo do Drawer */}
          <div className="flex items-center justify-between pb-8 border-b border-[#F3EBDD]/15">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D63A2F] shadow-[0_0_8px_#D63A2F]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#E7A92B] font-semibold">
                Sotaque • Estúdio 360
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="w-10 h-10 rounded-full border border-[#F3EBDD]/20 flex items-center justify-center text-[#F3EBDD]/80 hover:text-[#F3EBDD] hover:border-[#D63A2F] hover:bg-[#D63A2F]/10 transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M12 4L4 12M4 4L12 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Links Principais do Estúdio */}
          <nav className="py-6 flex flex-col gap-4">
            {[
              { label: "Início", href: "#hero", tag: "01" },
              { label: "Pilares 360", href: "#pilares", tag: "02" },
              { label: "Portfólio Vivo", href: "#work", tag: "03" },
              { label: "Manifesto & Raiz", href: "#dna", tag: "04" },
              { label: "Depoimentos", href: "#depoimentos", tag: "05" },
              { label: "Instagram ao Vivo", href: "#instagram", tag: "06" },
              { label: "Contato & Diagnóstico", href: "#contact", tag: "07" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between text-xl sm:text-2xl font-display font-medium text-[#F3EBDD]/85 hover:text-[#F3EBDD] transition-colors py-1"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#E7A92B] group-hover:text-[#D63A2F] transition-colors">
                    {item.tag}
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-mono text-[#F3EBDD]/30 group-hover:text-[#D63A2F] group-hover:translate-x-1 transition-all duration-300">
                  ↗
                </span>
              </a>
            ))}
          </nav>

          {/* Rodapé do Menu com Contato e Redes */}
          <div className="pt-8 border-t border-[#F3EBDD]/15 flex flex-col gap-4">
            <div className="text-xs text-[#F3EBDD]/60 font-body">
              Comunicação médica e marketing em saúde com calor humano, precisão cirúrgica e sotaque autêntico.
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-[#F3EBDD]/70 pt-2">
              <a href="https://www.instagram.com/sotaquecom/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E7A92B] transition-colors">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E7A92B] transition-colors">
                LinkedIn
              </a>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="hover:text-[#58734A] transition-colors">
                WhatsApp
              </a>
              <a href="mailto:contato@sotaqueestudio.com.br" className="hover:text-[#D63A2F] transition-colors">
                contato@sotaque.com.br
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
