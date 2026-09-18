import cases from "@/content/cases.json";
import PortfolioClient from "./PortfolioClient";

export type CaseItem = (typeof cases)[number];

// Server Component wrapper — passa dados para cliente
export default function Portfolio() {
  return <PortfolioClient cases={cases as CaseItem[]} />;
}
