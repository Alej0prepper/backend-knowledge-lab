import type { Metadata } from "next";
import Daily58Client from "./daily58-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 58 (Rate Limiting)",
  description:
    "Leccion sobre rate limiting para proteger APIs contra abuso, brute force y ataques de volumen.",
};

export default function Daily58Page() {
  return <Daily58Client />;
}
