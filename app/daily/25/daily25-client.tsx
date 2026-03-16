"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const paginationSnippet = `// Ejemplo conceptual con EF Core
var page = 2;
var pageSize = 20;

var orders = await _db.Orders
  .OrderByDescending(x => x.CreatedAt)
  .Skip((page - 1) * pageSize)
  .Take(pageSize)
  .ToListAsync(ct);`;

const checklistSnippet = `[ ] Validar page y pageSize (rangos maximos)
[ ] Confirmar tiempos con volumen alto de datos
[ ] Verificar orden estable antes de paginar
[ ] Revisar payload para evitar datos innecesarios`;

export default function Daily25Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/24";
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
            <Link className={styles.btn} href="/daily/24">
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
                <div className={styles.badge}>Daily #25 • Backend Foundations</div>
                <h2 className={styles.title}>Paginacion: no devuelvas mas datos de los necesarios</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Performance</span>
                  <span className={styles.chip}>Tag: API Design</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Cuando un endpoint puede devolver muchisimos registros, paginar evita cargas pesadas y mejora la
                  experiencia.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>No enviar todo junto cuando el dataset puede crecer sin limite.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Backend profesional devuelve datos en paginas para proteger rendimiento, memoria y tiempo de
                    respuesta.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Un listado gigante debe consumirse en chunks pequenos.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>`GET /orders` con 500000 registros es costoso.</li>
                    <li>`GET /orders?page=1&pageSize=20` limita el resultado.</li>
                    <li>El cliente recibe solo lo necesario para ese momento.</li>
                  </ul>

                  <div className={styles.quote}>
                    La paginacion no es un detalle opcional: es una decision de escalabilidad desde el diseno del
                    endpoint.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Disena para volumen real, no solo para datos de desarrollo.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Cuantos registros puede tener este endpoint en produccion?</li>
                    <li>Es seguro devolver todo en una sola respuesta?</li>
                    <li>Como navega el cliente entre paginas?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>En EF Core se implementa comunmente con Skip y Take.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>`Skip()` para saltar registros anteriores.</li>
                    <li>`Take()` para limitar el tamano de pagina.</li>
                    <li>`OrderBy()` para mantener orden consistente.</li>
                  </ul>

                  <pre>{paginationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Los endpoints sin paginacion suelen degradarse al crecer el volumen.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Respuestas enormes en endpoints de listado.</li>
                    <li>Tiempo de carga que aumenta con datos grandes.</li>
                    <li>Consumo alto de memoria en cliente y servidor.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      Un backend profesional devuelve solo los datos necesarios para ese momento.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Paginacion es una decision clave para que listas grandes sigan siendo usables cuando el sistema
                    crece.
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
                  <p>Dia 25 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> listas grandes deben paginarse.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> Skip + Take sobre un orden consistente.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> endpoints lentos y payloads enormes sin paginacion.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
