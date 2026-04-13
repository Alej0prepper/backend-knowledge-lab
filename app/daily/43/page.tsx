import type { Metadata } from "next";
import Daily43Client from "./daily43-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 43 (Entidades Anemicas vs Ricas)",
  description: "Leccion sobre entidades anemicas vs entidades ricas y donde viven las reglas de dominio.",
};

export default function Daily43Page() {
  return <Daily43Client />;
}
