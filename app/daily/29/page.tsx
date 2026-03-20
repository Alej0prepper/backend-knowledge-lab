import type { Metadata } from "next";
import Daily29Client from "./daily29-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 29 (Versionado de API)",
  description: "Leccion sobre como evolucionar APIs sin romper clientes existentes mediante versionado.",
};

export default function Daily29Page() {
  return <Daily29Client />;
}
