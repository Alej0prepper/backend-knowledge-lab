import type { Metadata } from "next";
import Daily38Client from "./daily38-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia 38 (Consistencia eventual)",
  description: "Leccion sobre eventual consistency y por que algunos datos no se actualizan al instante.",
};

export default function Daily38Page() {
  return <Daily38Client />;
}
