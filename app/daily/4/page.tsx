import type { Metadata } from "next";
import Daily4Client from "./daily4-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 4",
  description: "Leccion corta de backend (pendiente de publicacion) con estilo unificado.",
};

export default function Daily4Page() {
  return <Daily4Client />;
}
