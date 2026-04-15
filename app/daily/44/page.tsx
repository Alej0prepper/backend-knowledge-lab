import type { Metadata } from "next";
import Daily44Client from "./daily44-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 44 (Value Objects)",
  description: "Leccion sobre Value Objects para modelar conceptos con reglas y garantizar validez en dominio.",
};

export default function Daily44Page() {
  return <Daily44Client />;
}
