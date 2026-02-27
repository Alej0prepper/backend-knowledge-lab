import type { Metadata } from "next";
import Daily14Client from "./daily14-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 14 (Dependencia != Instanciacion)",
  description: "Leccion sobre inversion de dependencias: depender de contratos en lugar de implementaciones concretas.",
};

export default function Daily14Page() {
  return <Daily14Client />;
}
