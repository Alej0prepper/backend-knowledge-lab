import type { Metadata } from "next";
import Daily47Client from "./daily47-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 47 (Repositories)",
  description: "Leccion sobre Repositories para persistir el dominio sin contaminarlo con infraestructura.",
};

export default function Daily47Page() {
  return <Daily47Client />;
}
