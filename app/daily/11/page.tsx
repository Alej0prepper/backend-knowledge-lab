import type { Metadata } from "next";
import Daily11Client from "./daily11-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 11 (Acoplamiento)",
  description: "Leccion sobre acoplamiento en backend y como reducirlo con separacion de responsabilidades.",
};

export default function Daily11Page() {
  return <Daily11Client />;
}
