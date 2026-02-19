import type { Metadata } from "next";
import Daily8Client from "./daily8-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 8 (DTO != Entidad)",
  description: "Leccion corta sobre por que no exponer entidades internas en APIs .NET.",
};

export default function Daily8Page() {
  return <Daily8Client />;
}
