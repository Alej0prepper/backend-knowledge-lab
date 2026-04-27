import type { Metadata } from "next";
import Daily54Client from "./daily54-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 54 (IDOR)",
  description: "Leccion sobre IDOR, referencias directas inseguras y validacion de ownership en APIs .NET.",
};

export default function Daily54Page() {
  return <Daily54Client />;
}
