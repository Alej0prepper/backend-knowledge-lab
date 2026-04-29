import type { Metadata } from "next";
import Daily56Client from "./daily56-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 56 (Manejo de errores)",
  description: "Leccion sobre manejo de errores, filtracion de informacion y logging seguro en APIs .NET.",
};

export default function Daily56Page() {
  return <Daily56Client />;
}
