import type { Metadata } from "next";
import Daily6Client from "./daily6-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 6 (Orquestacion)",
  description: "Leccion corta sobre orquestacion en backend y separacion de responsabilidades.",
};

export default function Daily6Page() {
  return <Daily6Client />;
}
