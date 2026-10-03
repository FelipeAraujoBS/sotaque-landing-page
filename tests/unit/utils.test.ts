import { describe, it, expect } from "vitest";
import { CONTACT_INFO } from "@/lib/contact";

describe("Contact Utilities & Constants (Unit)", () => {
  it("contém estrutura válida de informações de contato", () => {
    expect(CONTACT_INFO.email).toMatch(/^.+@.+\..+$/);
    expect(CONTACT_INFO.phoneDisplay).toContain("71");
    expect(CONTACT_INFO.whatsappHref).toMatch(/^https:\/\/wa\.me\//);
    expect(CONTACT_INFO.instagram).toMatch(/^https:\/\/www\.instagram\.com\//);
    expect(CONTACT_INFO.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
  });

  it("garante que o link do WhatsApp inclui mensagem pré-codificada", () => {
    expect(CONTACT_INFO.whatsappHref).toContain("wa.me/5571981925534");
    expect(CONTACT_INFO.whatsappHref).toContain("text=");
    // Verifica que não contém caracteres crus que quebrem URLs
    expect(CONTACT_INFO.whatsappHref).not.toContain(" ");
  });
});
