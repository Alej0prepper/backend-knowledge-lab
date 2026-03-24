import type { Metadata } from "next";
import Daily31Client from "./daily31-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 31 (Throttling vs Rate Limiting)",
  description: "Leccion sobre diferencias entre bloquear trafico y regular su velocidad.",
};

export default function Daily31Page() {
  return <Daily31Client />;
}
