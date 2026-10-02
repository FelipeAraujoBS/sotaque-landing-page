import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const rootDir = "c:\\Users\\felip\\OneDrive\\Área de Trabalho\\Sotaque\\sotaque-scaffold\\sotaque-scaffold";
const logoPath = path.join(rootDir, "public", "brand", "logos", "sotaque_simbolo-e-nome_creme.png");
const watermarkPath = path.join(rootDir, "public", "brand", "elements", "rosacea-de-azulejo_creme+orange.png");
const fontPath = path.join(rootDir, "public", "fonts", "commune.woff2");

const logoBase64 = fs.existsSync(logoPath) ? `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}` : "";
const watermarkBase64 = fs.existsSync(watermarkPath) ? `data:image/png;base64,${fs.readFileSync(watermarkPath).toString("base64")}` : "";
const fontBase64 = fs.existsSync(fontPath) ? `data:font/woff2;base64,${fs.readFileSync(fontPath).toString("base64")}` : "";

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    @font-face {
      font-family: 'Commune';
      src: url('${fontBase64}') format('woff2');
      font-weight: normal;
      font-style: normal;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
      background-color: #0B1B47;
      color: #F4F1E5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px 72px 56px 72px;
    }

    /* Aura luminosa solar e vinho */
    .glow-solar {
      position: absolute;
      top: -120px;
      right: -100px;
      width: 650px;
      height: 650px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(226, 121, 8, 0.22) 0%, rgba(226, 121, 8, 0.05) 50%, transparent 70%);
      pointer-events: none;
    }
    .glow-wine {
      position: absolute;
      bottom: -150px;
      left: -120px;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(110, 16, 22, 0.3) 0%, rgba(110, 16, 22, 0.06) 50%, transparent 70%);
      pointer-events: none;
    }

    /* Marca d'água arquitetônica de azulejaria baiana */
    .watermark {
      position: absolute;
      right: 40px;
      bottom: 40px;
      width: 380px;
      height: 380px;
      opacity: 0.07;
      background-image: url('${watermarkBase64}');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      pointer-events: none;
    }

    /* Topo: Logo + Tagline Salvador */
    .top-bar {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo-img {
      height: 48px;
      width: auto;
      object-contain: contain;
    }
    .location-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 9999px;
      border: 1px solid rgba(244, 241, 229, 0.16);
      background: rgba(14, 34, 89, 0.5);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(244, 241, 229, 0.88);
      backdrop-filter: blur(8px);
    }
    .dot-amber {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #E27908;
    }

    /* Centro: Título Monumental & Posicionamento */
    .center-content {
      position: relative;
      z-index: 10;
      margin-top: 10px;
    }
    .eyebrow {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }
    .eyebrow-line {
      width: 32px;
      height: 2px;
      background-color: #E27908;
    }
    .eyebrow-text {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #E27908;
    }
    .headline {
      font-family: 'Commune', Georgia, serif;
      font-size: 58px;
      line-height: 1.06;
      font-weight: normal;
      color: #F4F1E5;
      letter-spacing: -0.025em;
    }
    .headline-italic {
      font-style: italic;
      color: #E27908;
      font-weight: 300;
    }
    .subtitle {
      margin-top: 18px;
      font-size: 20px;
      line-height: 1.5;
      color: rgba(244, 241, 229, 0.82);
      max-width: 820px;
      font-weight: 400;
    }
    .highlight-white {
      color: #F4F1E5;
      font-weight: 600;
    }

    /* Rodapé: Pilares 360 + URL */
    .bottom-bar {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 24px;
      border-top: 1px solid rgba(244, 241, 229, 0.12);
    }
    .pillars-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .pillar-chip {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      border-radius: 9999px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #F4F1E5;
    }
    .chip-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .dot-green { background-color: #1E6838; }
    .dot-wine { background-color: #A31C24; }
    .dot-blue { background-color: #3867D6; }
    .dot-gold { background-color: #E27908; }

    .site-pill {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      font-weight: 700;
      color: #E27908;
      letter-spacing: 0.1em;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  </style>
</head>
<body>
  <div class="glow-solar"></div>
  <div class="glow-wine"></div>
  <div class="watermark"></div>

  <!-- Topo -->
  <div class="top-bar">
    <img src="${logoBase64}" alt="Sotaque" class="logo-img" />
    <div class="location-badge">
      <span class="dot-amber"></span>
      <span>Salvador · Bahia</span>
    </div>
  </div>

  <!-- Centro -->
  <div class="center-content">
    <div class="eyebrow">
      <div class="eyebrow-line"></div>
      <span class="eyebrow-text">Estúdio 360 · Branding & Audiovisual</span>
    </div>
    <h1 class="headline">
      Sua marca tem voz.<br/>
      Nós damos o <span class="headline-italic">sotaque</span>.
    </h1>
    <p class="subtitle">
      A <span class="highlight-white">precisão da estratégia</span> e a <span class="highlight-white">pluralidade brasileira</span> em comunicação autoral, identidade visual de alto padrão e narrativas culturais.
    </p>
  </div>

  <!-- Rodapé -->
  <div class="bottom-bar">
    <div class="pillars-group">
      <div class="pillar-chip">
        <span class="chip-dot dot-green"></span>
        <span>Branding</span>
      </div>
      <div class="pillar-chip">
        <span class="chip-dot dot-wine"></span>
        <span>Narrativa & PR</span>
      </div>
      <div class="pillar-chip">
        <span class="chip-dot dot-blue"></span>
        <span>Web & Performance</span>
      </div>
      <div class="pillar-chip">
        <span class="chip-dot dot-gold"></span>
        <span>Audiovisual</span>
      </div>
    </div>
    <div class="site-pill">
      <span>sotaquecom.com.br</span>
      <span>↗</span>
    </div>
  </div>
</body>
</html>`;

const scratchHtmlPath = path.join(rootDir, "public", "og-preview.html");
fs.writeFileSync(scratchHtmlPath, htmlContent, "utf-8");
console.log("HTML written to", scratchHtmlPath);

// Execute Edge headless to capture screenshot
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputPngPath = path.join(rootDir, "public", "og-image.png");
const cmd = `"${edgePath}" --headless --disable-gpu --window-size=1200,630 --screenshot="${outputPngPath}" "file:///${scratchHtmlPath.replace(/\\\\/g, "/")}"`;
console.log("Running:", cmd);
execSync(cmd, { stdio: "inherit" });
console.log("Screenshot saved to", outputPngPath);
