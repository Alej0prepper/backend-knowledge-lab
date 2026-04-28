import type { Metadata } from "next";
import Daily55Client from "./daily55-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 55 (Secretos en backend)",
  description: "Leccion sobre secretos en backend, exposicion de credenciales y buenas practicas en .NET.",
};

export default function Daily55Page() {
  return <Daily55Client />;
}
