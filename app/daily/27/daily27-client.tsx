"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const orderingSnippet = `// Ordenamiento estable antes de paginar
var page = 1;
var pageSize = 20;

var orders = await _db.Orders
  .OrderByDescending(o => o.CreatedAt)
  .ThenBy(o => o.Id)
  .Skip((page - 1) * pageSize)
  .Take(pageSize)
  .ToListAsync(ct);`;

const checklistSnippet = `[ ] Verificar orden por defecto en cada endpoint de lista
[ ] Confirmar orden estable entre paginas
[ ] Detectar elementos repetidos o faltantes al paginar
[ ] Validar criterio de orden segun necesidad de negocio`;

export default function Daily27Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/26";
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
            <Link className={styles.btn} href="/daily/26">
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
                <div className={styles.createdAt}>18/03/2026</div>
                <div className={styles.badge}>Daily #27 • Backend Foundations</div>
                <h2 className={styles.title}>Ordenamiento: el orden tambien es parte del backend</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: API Design</span>
                  <span className={styles.chip}>Tag: Consistency</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  El orden de una lista no es decorativo: afecta usabilidad, consistencia y estabilidad de paginacion.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Cuando devuelves listas, debes definir un orden explicito.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Un backend profesional define como y por que se ordenan los datos. Esto es parte del contrato del
                    endpoint.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Lista de pedidos: reciente, antiguo, por precio o por estado.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Sin orden definido, requests iguales pueden devolver resultados distintos.</li>
                    <li>Sin orden estable, la paginacion repite o pierde elementos.</li>
                    <li>Con orden claro, la experiencia es consistente.</li>
                  </ul>

                  <div className={styles.quote}>
                    Si no defines el orden, la base de datos puede devolver filas en secuencias no predecibles.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No deja el orden al azar: lo define segun el caso de uso.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Cual es el orden logico para este endpoint?</li>
                    <li>El cliente necesita elegir distintos tipos de orden?</li>
                    <li>El orden se mantiene estable entre paginas?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>En Entity Framework se usa OrderBy u OrderByDescending.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Usar `OrderBy()` o `OrderByDescending()` con criterio claro.</li>
                    <li>Agregar `ThenBy()` para estabilidad cuando hay empates.</li>
                    <li>Ordenar siempre antes de `Skip()` y `Take()`.</li>
                  </ul>

                  <pre>{orderingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Los problemas aparecen como listas inconsistentes o aparentemente random.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Resultados que cambian entre requests iguales.</li>
                    <li>Paginacion con elementos repetidos o faltantes.</li>
                    <li>Orden no alineado con la logica del producto.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>El orden tambien es una decision de arquitectura y contrato de API.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Si no defines el orden, el sistema lo hara por ti y probablemente mal.
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
                  <p>Dia 27 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> el orden de listas es parte del contrato de backend.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> OrderBy/OrderByDescending antes de paginar.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> sin orden estable, la paginacion se rompe.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
