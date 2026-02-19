import Link from "next/link";

export default function DailyIndexPage() {
  return (
    <main style={{ padding: "24px", maxWidth: "760px", margin: "0 auto" }}>
      <h1>Daily Backend</h1>
      <p>Archivo de lecciones cortas.</p>
      <ul>
        <li>
          <Link href="/daily/4">Dia 4</Link>
        </li>
        <li>
          <Link href="/daily/5">Dia 5 - Idempotencia</Link>
        </li>
        <li>
          <Link href="/daily/6">Dia 6</Link>
        </li>
        <li>
          <Link href="/daily/7">Dia 7 - Transacciones y consistencia</Link>
        </li>
        <li>
          <Link href="/daily/8">Dia 8 - DTO != Entidad</Link>
        </li>
      </ul>
      <p>
        <Link href="/rest-lite">Volver a REST Lite</Link>
      </p>
    </main>
  );
}
