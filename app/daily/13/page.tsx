import type { Metadata } from "next";
import Daily13Client from "./daily13-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 13 (Fat Controllers vs Thin Controllers)",
  description: "Leccion sobre por que los controllers deben ser delgados y delegar la logica a servicios.",
};

export default function Daily13Page() {
  return <Daily13Client />;
}
