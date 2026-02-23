"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "contrato", label: "2) Contrato" },
  { id: "mentalidad", label: "3) Mentalidad" },
  { id: "dotnet", label: "4) .NET" },
  { id: "testing", label: "5) Testing" },
  { id: "takeaway", label: "Takeaway" },
] as const;

const contractSnippet = `public record CreateOrderRequestDto(
  [property: Required] string CustomerId,
  [property: Required] List<OrderItemDto> Items
);

public record OrderResponseDto(string Id, string Status, decimal Total);

app.MapPost("/api/v1/orders", ([FromBody] CreateOrderRequestDto request) =>
{
  if (request.Items.Count == 0)
  {
    return Results.BadRequest(new
    {
      status = 400,
      code = "ORDER_ITEMS_REQUIRED",
      detail = "At least one item is required"
    });
  }

  return Results.Created("/api/v1/orders/ord_901", new OrderResponseDto("ord_901", "created", 149.98m));
})
.WithName("CreateOrderV1")
.WithOpenApi();`;

const checklistSnippet = `[ ] Verifica estructura JSON esperada en exito y error
[ ] Verifica tipos y nullability de cada campo
[ ] Verifica codigos HTTP definidos por contrato
[ ] Verifica formato estable de errores en todos los endpoints`;

export default function Daily9Client() {
  const [activeSection, setActiveSection] = useState<string>("idea");

  useEffect(() => {
    const sections = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/8";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(
    () => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`,
    [activeSection]
  );

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true" />
            <div>
              <h1>Daily Backend</h1>
              <div className={styles.brandSub}>1 leccion al dia • aprendizaje visible • criterio real</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegacion">
            <Link className={styles.pill} href="/daily">
              Archivo
            </Link>
            <Link className={styles.pill} href="/rest-lite">
              REST Lite
            </Link>
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/8">
              <span className={styles.kbd}>←</span> Dia 8
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="#idea">
              Empezar
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.badge}>Daily #9 • Backend Foundations</div>
                <h2 className={styles.title}>El backend define contratos, no solo respuestas</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Contratos</span>
                  <span className={styles.chip}>Tag: .NET</span>
                  <span className={styles.chip}>Tag: API Versioning</span>
                </div>

                <p className={styles.lead}>
                  Una API no devuelve solo datos: define una promesa tecnica estable entre backend y cliente.
                </p>
              </div>

              <nav className={styles.toc} aria-label="Indice">
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className={tocLinkClass(item.id)}>
                    {item.label}
                  </a>
                ))}
              </nav>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Contrato = promesa estable entre backend y consumidor.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Si rompes el contrato, rompes al frontend, mobile o integrador externo.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="contrato">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que significa contrato</h3>
                    <p className={styles.sub}>No es solo el body JSON.</p>
                  </div>
                  <span className={styles.chip}>Alcance</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Estructura del JSON.</li>
                    <li>Tipos de datos.</li>
                    <li>Campos obligatorios.</li>
                    <li>Codigos HTTP.</li>
                    <li>Formato y catalogo de errores.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No se queda en "funciona en Swagger".</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Esto rompe al frontend si lo cambio?</li>
                    <li>Estoy eliminando un campo existente?</li>
                    <li>Estoy cambiando tipos o nullability?</li>
                    <li>El error mantiene formato consistente?</li>
                  </ul>

                  <div className={styles.quote}>Backend serio = estabilidad de contratos.</div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>DTOs + anotaciones + OpenAPI + versionado.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>DTOs definen contrato.</li>
                    <li>Annotations definen obligatoriedad.</li>
                    <li>Swagger/OpenAPI documenta el contrato.</li>
                    <li>Versionado protege contratos antiguos.</li>
                  </ul>

                  <pre>{contractSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Muchos bugs de integracion son contrato roto.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>El formato de salida cambio sin aviso.</li>
                    <li>Un campo paso de nullable a obligatorio.</li>
                    <li>El HTTP status esperado cambio.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>No "devuelves datos": mantienes promesas tecnicas estables.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Cuando piensas en contratos y no solo en respuestas, ya estas en mentalidad backend real.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/8">
                      ← Dia 8
                    </Link>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/rest-lite#aprendizaje-diario">
                      REST Lite
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Resumen rapido</h2>
                  <p>Dia 9 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> API = contrato estable, no solo respuesta puntual.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> DTOs + anotaciones + OpenAPI + versionado.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> cambios silenciosos rompen integraciones.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
