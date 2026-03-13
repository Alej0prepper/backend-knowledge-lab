import type { Metadata } from "next";
import Daily24Client from "./daily24-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 24 (N+1 Queries)",
  description: "Leccion sobre el problema N+1 y como evitar consultas ineficientes con ORM.",
};

export default function Daily24Page() {
  return <Daily24Client />;
}
