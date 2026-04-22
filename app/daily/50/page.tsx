import type { Metadata } from "next";
import Daily50Client from "./daily50-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 50 (Mapping y Anti-Corruption Layer)",
  description: "Leccion sobre mapping y ACL para traducir datos externos y proteger el dominio.",
};

export default function Daily50Page() {
  return <Daily50Client />;
}
