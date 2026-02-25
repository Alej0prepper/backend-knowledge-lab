import type { Metadata } from "next";
import Daily12Client from "./daily12-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 12 (Cohesion)",
  description: "Leccion sobre cohesion en backend y como mantener responsabilidades claras en cada pieza.",
};

export default function Daily12Page() {
  return <Daily12Client />;
}
