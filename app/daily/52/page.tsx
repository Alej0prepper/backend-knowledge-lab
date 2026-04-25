import type { Metadata } from "next";
import Daily52Client from "./daily52-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 52 (Autenticacion)",
  description: "Leccion sobre autenticacion JWT y que valida realmente el backend en una API .NET.",
};

export default function Daily52Page() {
  return <Daily52Client />;
}
