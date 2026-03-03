import type { Metadata } from "next";
import Daily16Client from "./daily16-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 16 (Estados y maquinas de estados)",
  description: "Leccion sobre control de estados y transiciones para evitar flujos inconsistentes en backend.",
};

export default function Daily16Page() {
  return <Daily16Client />;
}
