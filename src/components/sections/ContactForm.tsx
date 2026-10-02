"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/motion/MagneticButton";
import { CONTACT_INFO } from "@/lib/contact";

type Errors = Record<string, string>;
type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [consentimento, setConsentimento] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: string) => {
    if (field === "nome" && value.trim().length > 0 && value.trim().length < 2) return "Muito curto";
    if (field === "contato" && value.trim().length > 0 && value.trim().length < 5) return "Informe e-mail ou telefone válido";
    if (field === "empresa" && value.trim().length > 0 && value.trim().length < 2) return "Informe sua marca, empresa ou projeto";
    if (field === "mensagem" && value.trim().length > 0 && value.trim().length < 10) return "Mín. 10 caracteres";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ nome: true, contato: true, empresa: true, mensagem: true, consentimento: true });

    const newErrors: Errors = {};
    const nErr = validateField("nome", nome) || (!nome.trim() ? "Obrigatório" : "");
    const ctErr = validateField("contato", contato) || (!contato.trim() ? "Obrigatório para retorno" : "");
    const empErr = validateField("empresa", empresa) || (!empresa.trim() ? "Obrigatório" : "");
    const mErr = validateField("mensagem", mensagem) || (!mensagem.trim() ? "Obrigatório" : "");
    if (nErr) newErrors.nome = nErr;
    if (ctErr) newErrors.contato = ctErr;
    if (empErr) newErrors.empresa = empErr;
    if (mErr) newErrors.mensagem = mErr;
    if (!consentimento) newErrors.consentimento = "Autorização obrigatória para envio";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setStatus("loading");
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, contato, empresa, mensagem, consentimento, website }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setErrors(json.errors || { _server: "Erro ao enviar" });
        setStatus("error");
        // limpa erro após 4s, mas mantém formulário
        setTimeout(() => setStatus("idle"), 4000);
        return;
      }
      setStatus("success");
      setNome("");
      setContato("");
      setEmpresa("");
      setMensagem("");
      setConsentimento(false);
      setWebsite("");
      setTouched({});
      // mantém sucesso visível por 5s, depois reseta
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setErrors({ _server: "Falha de rede. Tente novamente." });
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const whatsappHref = CONTACT_INFO.whatsappHref;

  const fieldBase =
    "w-full rounded-xl border bg-[#0B1B47]/80 px-4 py-3 text-sm text-[#F4F1E5] placeholder:text-[#F4F1E5]/40 focus:outline-none focus:ring-2 focus:ring-[#E27908]/30 focus:border-[#E27908] focus:bg-[#0B1B47] transition-all";
  const getFieldClass = (field: string, value: string) => {
    const hasError = !!errors[field];
    const isValid = touched[field] && value.trim().length > 0 && !validateField(field, value) && !hasError;
    if (hasError) return `${fieldBase} border-[#CF000F] bg-[#6E1016]/20`;
    if (isValid) return `${fieldBase} border-[#2F7C4B]/60 bg-[#0B1B47]/90`;
    return `${fieldBase} border-white/15 hover:border-white/30`;
  };

  return (
    <section
      id="contact"
      className="relative bg-[#0B1B47] text-[#F4F1E5] border-t border-white/10 py-20 lg:py-28 overflow-hidden"
      aria-label="Contato — fale com a Sotaque"
    >
      {/* Luz ambiente arquitetônica */}
      <div
        className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#E27908]/07 blur-[160px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-10 -left-20 w-[500px] h-[500px] rounded-full bg-[#6E1016]/15 blur-[160px] pointer-events-none"
        aria-hidden
      />

      <div className="relative mx-auto max-w-content px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Coluna esquerda — copy + WhatsApp */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[#E27908]" aria-hidden />
              <span className="text-xs font-mono tracking-[0.16em] uppercase font-semibold text-[#E27908]">Contato Direto</span>
            </div>
            <h2 className="font-['Commune',serif] font-bold leading-[0.92] tracking-[-0.03em] text-[clamp(2rem,4vw,2.9rem)] text-[#F4F1E5]">
              Vamos dar <span className="text-[#E27908] italic font-light">sotaque</span>
              <br />
              ao seu próximo passo?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#F4F1E5]/80 max-w-[42ch]">
              Retorno direto por e-mail ou WhatsApp. Sem intermediários. Sigilo e resposta em até 1 dia útil.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <MagneticButton href={whatsappHref} variant="accent" ariaLabel="Abrir WhatsApp da Sotaque">
                <span className="h-5 w-5 rounded-full bg-white/20 grid place-items-center text-xs" aria-hidden>
                  ✆
                </span>
                Conversar no WhatsApp
              </MagneticButton>
              <p className="text-xs text-[#F4F1E5]/70">
                Ou envie pelo formulário ao lado — validação imediata e confidencialidade garantida.
              </p>

              <div className="mt-2 rounded-xl border border-white/10 bg-[#0E2259]/60 p-4 flex gap-3 shadow-md backdrop-blur-sm">
                <span className="h-8 w-8 rounded-full bg-[#E27908]/20 text-[#E27908] border border-[#E27908]/30 grid place-items-center text-xs shrink-0">
                  ✉
                </span>
                <div className="text-sm">
                  <span className="block text-[11px] font-mono uppercase text-[#F4F1E5]/50">E-mail Corporativo</span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="font-semibold text-[#F4F1E5] hover:text-[#E27908] transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita — formulário */}
          <div className="col-span-12 lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-[1.6rem] border border-white/15 bg-[#0E2259]/80 backdrop-blur-xl shadow-2xl p-6 lg:p-8 space-y-5"
              aria-describedby="form-status"
            >
              <div>
                <p className="text-base font-display font-bold text-[#F4F1E5]">Diagnóstico inicial</p>
              </div>

              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-xs font-mono font-semibold tracking-wide uppercase text-[#F4F1E5]/75 mb-1.5">
                  Nome <span className="text-[#E27908]">*</span>
                </label>
                <motion.input
                  id="nome"
                  name="nome"
                  autoComplete="name"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    if (touched.nome) setErrors((prev) => ({ ...prev, nome: validateField("nome", e.target.value) }));
                  }}
                  onBlur={() => setTouched((p) => ({ ...p, nome: true }))}
                  placeholder="Seu nome"
                  className={getFieldClass("nome", nome)}
                  aria-invalid={!!errors.nome}
                  aria-describedby={errors.nome ? "err-nome" : undefined}
                  animate={errors.nome ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.42 }}
                />
                <div className="min-h-[18px] mt-1 flex items-center gap-1.5">
                  <AnimatePresence mode="wait">
                    {errors.nome ? (
                      <motion.p
                        key="err-nome"
                        id="err-nome"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-[#F87171] flex items-center gap-1 font-medium"
                        role="alert"
                      >
                        <span aria-hidden>⚠</span> {errors.nome}
                      </motion.p>
                    ) : touched.nome && nome.trim().length >= 2 ? (
                      <motion.p
                        key="ok-nome"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-[#4ADE80] flex items-center gap-1 font-medium"
                      >
                        <span aria-hidden>✓</span> Parece bom
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              {/* E-mail ou WhatsApp para retorno */}
              <div>
                <label htmlFor="contato" className="block text-xs font-mono font-semibold tracking-wide uppercase text-[#F4F1E5]/75 mb-1.5">
                  E-mail ou WhatsApp para retorno <span className="text-[#E27908]">*</span>
                </label>
                <motion.input
                  id="contato"
                  name="contato"
                  autoComplete="email tel"
                  value={contato}
                  onChange={(e) => {
                    setContato(e.target.value);
                    if (touched.contato) setErrors((prev) => ({ ...prev, contato: validateField("contato", e.target.value) }));
                  }}
                  onBlur={() => setTouched((p) => ({ ...p, contato: true }))}
                  placeholder="Ex: seuemail@empresa.com.br ou (71) 99999-0000"
                  className={getFieldClass("contato", contato)}
                  aria-invalid={!!errors.contato}
                  aria-describedby={errors.contato ? "err-contato" : undefined}
                  animate={errors.contato ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.42 }}
                />
                <div className="min-h-[18px] mt-1 flex items-center gap-1.5">
                  <AnimatePresence mode="wait">
                    {errors.contato ? (
                      <motion.p
                        key="err-contato"
                        id="err-contato"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-[#F87171] flex items-center gap-1 font-medium"
                        role="alert"
                      >
                        <span aria-hidden>⚠</span> {errors.contato}
                      </motion.p>
                    ) : touched.contato && contato.trim().length >= 5 ? (
                      <motion.p
                        key="ok-contato"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-[#4ADE80] flex items-center gap-1 font-medium"
                      >
                        <span aria-hidden>✓</span> Contato válido
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              {/* Marca, Empresa ou Projeto */}
              <div>
                <label htmlFor="empresa" className="block text-xs font-mono font-semibold tracking-wide uppercase text-[#F4F1E5]/75 mb-1.5">
                  Marca, Empresa ou Projeto <span className="text-[#E27908]">*</span>
                </label>
                <motion.input
                  id="empresa"
                  name="empresa"
                  autoComplete="organization"
                  value={empresa}
                  onChange={(e) => {
                    setEmpresa(e.target.value);
                    if (touched.empresa) setErrors((prev) => ({ ...prev, empresa: validateField("empresa", e.target.value) }));
                  }}
                  onBlur={() => setTouched((p) => ({ ...p, empresa: true }))}
                  placeholder="Ex: Sua Marca, Empresa ou Projeto"
                  className={getFieldClass("empresa", empresa)}
                  aria-invalid={!!errors.empresa}
                  aria-describedby={errors.empresa ? "err-empresa" : undefined}
                  animate={errors.empresa ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.42 }}
                />
                <div className="min-h-[18px] mt-1 flex items-center gap-1.5">
                  <AnimatePresence mode="wait">
                    {errors.empresa ? (
                      <motion.p
                        key="err-empresa"
                        id="err-empresa"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-[#F87171] flex items-center gap-1 font-medium"
                        role="alert"
                      >
                        <span aria-hidden>⚠</span> {errors.empresa}
                      </motion.p>
                    ) : touched.empresa && empresa.trim().length >= 2 ? (
                      <motion.p
                        key="ok-empresa"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-[#4ADE80] flex items-center gap-1 font-medium"
                      >
                        <span aria-hidden>✓</span> Perfeito
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label htmlFor="mensagem" className="block text-xs font-mono font-semibold tracking-wide uppercase text-[#F4F1E5]/75 mb-1.5">
                  Mensagem <span className="text-[#E27908]">*</span>
                </label>
                <motion.textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  value={mensagem}
                  onChange={(e) => {
                    setMensagem(e.target.value);
                    if (touched.mensagem) setErrors((prev) => ({ ...prev, mensagem: validateField("mensagem", e.target.value) }));
                  }}
                  onBlur={() => setTouched((p) => ({ ...p, mensagem: true }))}
                  placeholder="Conte em poucas linhas o que sua marca ou projeto precisa estruturar"
                  className={`${getFieldClass("mensagem", mensagem)} resize-none`}
                  aria-invalid={!!errors.mensagem}
                  aria-describedby={errors.mensagem ? "err-mensagem" : "help-mensagem"}
                  animate={errors.mensagem ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                  transition={{ duration: 0.42 }}
                />
                <p id="help-mensagem" className="mt-1 text-xs text-[#F4F1E5]/60">
                  Mín. 10 caracteres — quanto mais direto, melhor.
                </p>
                <div className="min-h-[18px] mt-1 flex items-center gap-1.5">
                  <AnimatePresence mode="wait">
                    {errors.mensagem ? (
                      <motion.p
                        key="err-mensagem"
                        id="err-mensagem"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs text-[#F87171] flex items-center gap-1 font-medium"
                        role="alert"
                      >
                        <span aria-hidden>⚠</span> {errors.mensagem}
                      </motion.p>
                    ) : touched.mensagem && mensagem.trim().length >= 10 ? (
                      <motion.p
                        key="ok-mensagem"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-[#4ADE80] flex items-center gap-1 font-medium"
                      >
                        <span aria-hidden>✓</span> Mensagem pronta
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              {/* Consentimento LGPD */}
              <div className="pt-1">
                <label htmlFor="consentimento" className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    id="consentimento"
                    name="consentimento"
                    checked={consentimento}
                    onChange={(e) => {
                      setConsentimento(e.target.checked);
                      if (errors.consentimento && e.target.checked) {
                        setErrors((prev) => {
                          const rest = { ...prev };
                          delete rest.consentimento;
                          return rest;
                        });
                      }
                    }}
                    className="mt-1 h-4 w-4 rounded border-white/30 bg-[#0B1B47] text-[#E27908] focus:ring-2 focus:ring-[#E27908] accent-[#E27908]"
                  />
                  <span className="text-xs text-[#F4F1E5]/75 leading-snug select-none group-hover:text-[#F4F1E5]">
                    Concordo em receber contato da equipe Sotaque para apresentação de diagnóstico e proposta comercial. Confidencialidade garantida.
                  </span>
                </label>
                {errors.consentimento && (
                  <p className="mt-1.5 text-xs text-[#F87171] flex items-center gap-1 font-medium" role="alert">
                    <span aria-hidden>⚠</span> {errors.consentimento}
                  </p>
                )}
              </div>

              {/* Honeypot invisível contra bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                aria-hidden
              />

              {/* Status */}
              <div id="form-status" className="min-h-[24px]" aria-live="polite">
                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl bg-[#2F7C4B]/25 border border-[#2F7C4B]/50 text-[#4ADE80] text-sm px-4 py-2.5 flex items-center gap-2 font-medium"
                    >
                      <span>✓</span> Mensagem enviada com sucesso! Retornaremos em breve.
                    </motion.p>
                  )}
                  {status === "error" && errors._server && (
                    <motion.p
                      key="server-err"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-[#6E1016]/40 border border-[#CF000F]/50 text-[#FCA5A5] text-sm px-4 py-2.5 font-medium"
                      role="alert"
                    >
                      ⚠ {errors._server}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E27908] hover:bg-[#C96B07] text-[#F4F1E5] px-8 py-3.5 text-xs font-mono font-bold tracking-widest uppercase shadow-md disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E27908] transition-all"
                  whileTap={status !== "loading" ? { scale: 0.98 } : undefined}
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensagem <span className="text-[#F4F1E5] font-bold" aria-hidden>↗</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <p className="mt-3 text-xs text-[#F4F1E5]/60 text-center lg:text-left">
              Ao enviar, você concorda com contato direto da equipe Sotaque. Confidencialidade garantida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
