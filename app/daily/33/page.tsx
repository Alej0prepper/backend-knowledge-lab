import type { Metadata } from "next";
import Daily33Client from "./daily33-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 33 (Idempotency Keys)",
  description: "Leccion sobre idempotency keys para evitar duplicados en operaciones criticas.",
};

export default function Daily33Page() {
  return <Daily33Client />;
}
