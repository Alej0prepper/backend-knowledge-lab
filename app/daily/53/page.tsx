import type { Metadata } from "next";
import Daily53Client from "./daily53-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 53 (Autorizacion)",
  description: "Leccion sobre autorizacion, control de acceso y validacion de ownership en APIs .NET.",
};

export default function Daily53Page() {
  return <Daily53Client />;
}
