import type { Metadata } from "next";
import Daily36Client from "./daily36-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 36 (Eventos)",
  description: "Leccion sobre eventos para comunicar sin acoplar, con enfoque mecanico en .NET.",
};

export default function Daily36Page() {
  return <Daily36Client />;
}
