import type { Metadata } from "next";
import Daily7Client from "./daily7-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 7 (Transacciones y Consistencia)",
  description: "Leccion corta sobre transacciones para proteger consistencia en backend con .NET.",
};

export default function Daily7Page() {
  return <Daily7Client />;
}
