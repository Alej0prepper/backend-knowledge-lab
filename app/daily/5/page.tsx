import type { Metadata } from "next";
import Daily5Client from "./daily5-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 5 (Idempotencia)",
  description: "Leccion corta sobre idempotencia en backend y REST.",
};

export default function Daily5Page() {
  return <Daily5Client />;
}
