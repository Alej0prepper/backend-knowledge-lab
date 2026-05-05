import type { Metadata } from "next";
import Daily60Client from "./daily60-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 60 (Brute Force: romper autenticacion por repeticion)",
  description:
    "Leccion sobre ataques de fuerza bruta en autenticacion, senales de riesgo y protecciones clave para login.",
};

export default function Daily60Page() {
  return <Daily60Client />;
}
