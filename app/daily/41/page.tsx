import type { Metadata } from "next";
import Daily41Client from "./daily41-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 41 (Validacion de Dominio)",
  description: "Leccion sobre validacion de dominio para proteger reglas importantes desde el nucleo del sistema.",
};

export default function Daily41Page() {
  return <Daily41Client />;
}
