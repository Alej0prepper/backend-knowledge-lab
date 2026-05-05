import type { Metadata } from "next";
import Daily59Client from "./daily59-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 59 (Denegacion de servicio: como se tumba un backend)",
  description:
    "Leccion sobre DoS/DDoS para entender saturacion, endpoints vulnerables y criterios de resistencia en backend.",
};

export default function Daily59Page() {
  return <Daily59Client />;
}
