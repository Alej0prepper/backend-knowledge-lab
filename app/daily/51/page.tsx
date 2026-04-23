import type { Metadata } from "next";
import Daily51Client from "./daily51-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 51 (Superficie de ataque)",
  description: "Leccion sobre superficie de ataque y como mapear endpoints, riesgos y pruebas basicas.",
};

export default function Daily51Page() {
  return <Daily51Client />;
}
