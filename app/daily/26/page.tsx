import type { Metadata } from "next";
import Daily26Client from "./daily26-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 26 (Filtrado y busqueda)",
  description: "Leccion sobre filtrar y buscar datos en base de datos en lugar de traer todo a memoria.",
};

export default function Daily26Page() {
  return <Daily26Client />;
}
