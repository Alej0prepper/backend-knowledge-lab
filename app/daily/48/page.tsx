import type { Metadata } from "next";
import Daily48Client from "./daily48-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 48 (Unit of Work)",
  description: "Leccion sobre Unit of Work para persistir multiples cambios como una sola operacion consistente.",
};

export default function Daily48Page() {
  return <Daily48Client />;
}
