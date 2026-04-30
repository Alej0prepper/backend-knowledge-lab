import type { Metadata } from "next";
import Daily57Client from "./daily57-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 57 (Checklist de seguridad de API)",
  description:
    "Leccion sobre checklist rapido para auditar seguridad de APIs: superficie de ataque, auth, autorizacion, IDOR, secretos y errores.",
};

export default function Daily57Page() {
  return <Daily57Client />;
}
