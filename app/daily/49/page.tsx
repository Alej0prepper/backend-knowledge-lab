import type { Metadata } from "next";
import Daily49Client from "./daily49-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 49 (Application Services)",
  description: "Leccion sobre Application Services para orquestar casos de uso sin mezclar responsabilidades.",
};

export default function Daily49Page() {
  return <Daily49Client />;
}
