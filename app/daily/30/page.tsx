import type { Metadata } from "next";
import Daily30Client from "./daily30-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 30 (Rate Limiting)",
  description: "Leccion sobre limitar peticiones para proteger el backend de abuso y saturacion.",
};

export default function Daily30Page() {
  return <Daily30Client />;
}
