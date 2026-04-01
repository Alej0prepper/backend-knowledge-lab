import type { Metadata } from "next";
import Daily37Client from "./daily37-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 37 (CQRS en la practica)",
  description: "Aclaracion practica de CQRS: donde se ve la separacion real entre comandos y queries.",
};

export default function Daily37Page() {
  return <Daily37Client />;
}
