import type { Metadata } from "next";
import Daily35Client from "./daily35-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 35 (Colas)",
  description: "Leccion sobre colas para desacoplar sistemas y resistir fallos en servicios externos.",
};

export default function Daily35Page() {
  return <Daily35Client />;
}
