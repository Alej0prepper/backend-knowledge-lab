import type { Metadata } from "next";
import Daily39Client from "./daily39-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 39 (Soft Delete)",
  description: "Leccion sobre borrar sin destruir datos usando Soft Delete en sistemas reales.",
};

export default function Daily39Page() {
  return <Daily39Client />;
}
