import type { Metadata } from "next";
import Daily42Client from "./daily42-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 42 (Invariantes)",
  description: "Leccion sobre invariantes: reglas que nunca pueden romperse y donde protegerlas en el dominio.",
};

export default function Daily42Page() {
  return <Daily42Client />;
}
