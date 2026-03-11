import type { Metadata } from "next";
import Daily22Client from "./daily22-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 22 (Timeouts)",
  description: "Leccion sobre timeouts y fallar rapido para proteger estabilidad en backend.",
};

export default function Daily22Page() {
  return <Daily22Client />;
}
