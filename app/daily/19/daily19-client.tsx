"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const strongConsistencySnippet = `// Consistencia fuerte: bloqueo por stock
public async Task<Result> PlaceOrderAsync(PlaceOrderCommand command, CancellationToken ct)
{
  await using var tx = await _db.Database.BeginTransactionAsync(ct);

  var stock = await _stocks.GetForUpdateAsync(command.Sku, ct);
  if (stock.Available < command.Qty) return Result.Fail("OUT_OF_STOCK");

  stock.Available -= command.Qty;
  await _orders.CreateAsync(command, ct);
  await tx.CommitAsync(ct);

  return Result.Ok();
}`;

const availabilitySnippet = `// Alta disponibilidad: aceptas y resuelves luego
public async Task<Result> PlaceOrderAsync(PlaceOrderCommand command, CancellationToken ct)
{
  await _orders.CreateAsync(command, ct);
  await _queue.PublishAsync(new ReserveStockJob(command.OrderId), ct);

  // El stock se confirma en segundo plano (eventual consistency)
  return Result.Ok();
}`;

const checklistSnippet = `[ ] Medir tiempo hasta que datos se reflejen en UI
[ ] Forzar alta concurrencia y observar conflictos
[ ] Verificar si hay reprocesos o compensaciones
[ ] Documentar donde se acepta inconsistencia temporal`;

export default function Daily19Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/18";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/18">
              <span className={styles.kbd}>←</span> Clase anterior
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.badge}>Daily #19 • Backend Foundations</div>
                <h2 className={styles.title}>Consistencia vs Disponibilidad (trade-offs reales)</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Consistencia</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  En sistemas reales no puedes tener todo perfecto al mismo tiempo. Hay que decidir que priorizar.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Consistencia y disponibilidad compiten en escenarios reales.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Consistencia: todos ven lo mismo al mismo tiempo. Disponibilidad: el sistema siempre responde.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Dos compras simultaneas con stock limitado.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Opcion A: consistencia fuerte, una compra falla.</li>
                    <li>Opcion B: alta disponibilidad, ambas pasan y luego se resuelve conflicto.</li>
                  </ul>

                  <div className={styles.quote}>Cada decision tiene consecuencias en experiencia y operacion.</div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Elige el equilibrio correcto segun el dato y el negocio.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Es critico que el dato sea exacto inmediatamente?</li>
                    <li>Es mejor responder rapido aunque haya retraso?</li>
                    <li>Donde tolero inconsistencias temporales?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Cache, colas, procesos asincronos y eventual consistency.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Usar cache para respuestas rapidas.</li>
                    <li>Procesar acciones en colas.</li>
                    <li>Separar transacciones de efectos secundarios.</li>
                  </ul>

                  <pre>{strongConsistencySnippet}</pre>
                  <pre>{availabilitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>A veces no es bug: es una decision arquitectonica.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Datos que tardan segundos en actualizarse.</li>
                    <li>Acciones que se procesan en segundo plano.</li>
                    <li>Sistemas que priorizan velocidad.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      Backend profesional no busca perfeccion absoluta. Busca el equilibrio correcto.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Entender que resolver ya y que resolver despues es parte del criterio backend.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
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
                  <p>Dia 19 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> consistencia y disponibilidad son trade-offs.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> cache + colas + asincronia controlada.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> confundir decision arquitectonica con bug.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
