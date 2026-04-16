import type { Metadata } from "next";
import Daily46Client from "./daily46-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 46 (Domain Services)",
  description: "Leccion sobre Domain Services y cuando usar logica de negocio fuera de una entidad o aggregate.",
};

export default function Daily46Page() {
  return <Daily46Client />;
}
