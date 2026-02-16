import Link from "next/link";

export default function Daily4Page() {
  return (
    <main style={{ padding: "24px", maxWidth: "760px", margin: "0 auto" }}>
      <h1>Daily #4</h1>
      <p>Leccion pendiente de publicacion.</p>
      <p>
        <Link href="/daily/5">Ir a Dia 5</Link>
      </p>
      <p>
        <Link href="/daily">Volver al archivo</Link>
      </p>
    </main>
  );
}
