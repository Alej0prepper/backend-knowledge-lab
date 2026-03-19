import type { Metadata } from "next";
import Daily28Client from "./daily28-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 28 (Paginacion + Orden)",
  description: "Leccion sobre por que paginar sin orden consistente rompe resultados entre paginas.",
};

export default function Daily28Page() {
  return <Daily28Client />;
}
