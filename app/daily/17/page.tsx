import type { Metadata } from "next";
import Daily17Client from "./daily17-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 17 (Source of Truth)",
  description: "Leccion sobre definir una unica fuente de verdad para cada dato critico en backend.",
};

export default function Daily17Page() {
  return <Daily17Client />;
}
