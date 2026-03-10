import type { Metadata } from "next";
import Daily21Client from "./daily21-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 21 (Cache)",
  description: "Leccion sobre cache en backend: velocidad, frescura de datos y trade-offs reales.",
};

export default function Daily21Page() {
  return <Daily21Client />;
}
