import type { Metadata } from "next";
import Daily32Client from "./daily32-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 32 (Concurrencia)",
  description: "Leccion sobre concurrencia, race conditions y estrategias para proteger recursos compartidos.",
};

export default function Daily32Page() {
  return <Daily32Client />;
}
