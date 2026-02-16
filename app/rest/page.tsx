import type { Metadata } from "next";
import RestAtlasClient from "./rest-atlas-client";

export const metadata: Metadata = {
  title: "REST ATLAS — Learning + Craft",
  description: "Guia REST con enfoque de aprendizaje y criterio backend en produccion.",
};

export default function RestPage() {
  return <RestAtlasClient />;
}
