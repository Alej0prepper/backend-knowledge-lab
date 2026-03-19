"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const stablePaginationSnippet = `// Patrón correcto: ordenar y luego paginar
var orders = await _db.Orders
  .OrderByDescending(o => o.CreatedAt)
  .ThenBy(o => o.Id)
  .Skip((page - 1) * pageSize)
  .Take(pageSize)
  .ToListAsync(ct);`;

const checklistSnippet = `[ ] Ir de pagina 1 -> 2 -> 1 y comparar resultados
[ ] Verificar que no haya duplicados entre paginas
[ ] Verificar que no falten elementos al navegar
[ ] Confirmar que el orden sea deterministico`;

export default function Daily28Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/27";
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
            <Link className={styles.btn} href="/daily/27">
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
                <div className={styles.createdAt}>19/03/2026</div>
                <div className={styles.badge}>Daily #28 • Backend Foundations</div>
                <h2 className={styles.title}>Paginacion + Orden = consistencia real</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Paginacion</span>
                  <span className={styles.chip}>Tag: Consistency</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Paginacion sin orden definido genera resultados inestables y rompe la experiencia de usuario.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Paginacion sin orden claro es peligrosa.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Si no defines un orden deterministico, las paginas pueden repetir datos o saltarse elementos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Sin orden, la base de datos no garantiza consistencia entre paginas.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>`GET /orders?page=1&pageSize=10` sin sort puede devolver resultados distintos cada vez.</li>
                    <li>Pagina 2 puede repetir datos de la pagina 1 o saltar registros.</li>
                    <li>El sistema se vuelve inconsistente aunque &quot;funcione&quot;.</li>
                  </ul>

                  <div className={styles.quote}>Siempre ordenar primero y paginar despues.</div>

                  <pre>{`GET /orders?page=1&pageSize=10&sort=createdAt_desc`}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Busca estabilidad entre requests, no solo devolver datos.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>El orden es deterministico?</li>
                    <li>Los resultados se mantienen estables entre paginas?</li>
                    <li>Que pasa si entran nuevos datos entre requests?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Patron correcto en EF Core: ordenar y luego paginar.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Aplicar `OrderByDescending()` antes de `Skip()` y `Take()`.</li>
                    <li>Usar `ThenBy()` para mantener estabilidad en empates.</li>
                    <li>Nunca paginar sin orden.</li>
                  </ul>

                  <pre>{stablePaginationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>El bug aparece como inestabilidad entre navegaciones de pagina.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Ir de pagina 1 a 2 y volver a 1.</li>
                    <li>Comparar si los resultados cambian sin razon.</li>
                    <li>Revisar duplicados o faltantes entre paginas.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      Paginacion sin orden es inconsistente, y orden sin paginacion no escala.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>En un backend bien disenado, orden y paginacion siempre van juntos.</div>

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
                  <p>Dia 28 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> paginar sin orden causa inconsistencias.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> OrderByDescending -&gt; Skip -&gt; Take.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> duplicados y faltantes entre paginas.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
