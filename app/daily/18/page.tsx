import type { Metadata } from "next";
import Daily18Client from "./daily18-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 18 (Side Effects)",
  description: "Leccion sobre efectos secundarios y como controlar cadenas de consecuencias en backend.",
};

export default function Daily18Page() {
  return <Daily18Client />;
}
