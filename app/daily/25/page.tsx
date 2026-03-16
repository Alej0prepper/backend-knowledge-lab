import type { Metadata } from "next";
import Daily25Client from "./daily25-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 25 (Paginacion)",
  description: "Leccion sobre paginacion para devolver solo los datos necesarios en endpoints de listas.",
};

export default function Daily25Page() {
  return <Daily25Client />;
}
