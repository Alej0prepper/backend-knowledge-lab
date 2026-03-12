import type { Metadata } from "next";
import Daily23Client from "./daily23-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 23 (Retries)",
  description: "Leccion sobre retries: reintentar errores temporales para mejorar resiliencia.",
};

export default function Daily23Page() {
  return <Daily23Client />;
}
