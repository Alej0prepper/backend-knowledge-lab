import type { Metadata } from "next";
import Daily61Client from "./daily61-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 61 (Validacion de input: la primera linea de defensa)",
  description:
    "Leccion sobre validacion de entrada, por que es clave para seguridad y que checks aplicar en backend.",
};

export default function Daily61Page() {
  return <Daily61Client />;
}
