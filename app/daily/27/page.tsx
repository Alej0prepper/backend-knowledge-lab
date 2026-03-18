import type { Metadata } from "next";
import Daily27Client from "./daily27-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 27 (Ordenamiento)",
  description: "Leccion sobre ordenamiento estable en listas y su impacto en consistencia y paginacion.",
};

export default function Daily27Page() {
  return <Daily27Client />;
}
