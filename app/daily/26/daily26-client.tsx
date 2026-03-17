"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const filteringSnippet = `// Filtrado eficiente en EF Core (se ejecuta en SQL)
var userId = 5;

var orders = await _db.Orders
  .Where(o => o.UserId == userId)
  .OrderByDescending(o => o.CreatedAt)
  .ToListAsync(ct);`;

const checklistSnippet = `[ ] Confirmar que el filtro se aplica en la query SQL
[ ] Evitar ToList() antes de Where()
[ ] Medir memoria y tiempo con volumen alto
[ ] Revisar tamano de payload final`;

export default function Daily26Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/25";
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
            <Link className={styles.btn} href="/daily/25">
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
                <div className={styles.badge}>Daily #26 • Backend Foundations</div>
                <h2 className={styles.title}>Filtrado y busqueda: no todo es traer todo y filtrar despues</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Performance</span>
                  <span className={styles.chip}>Tag: Querying</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Un backend eficiente aplica filtros cerca de la base de datos para mover menos datos y escalar mejor.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>No cargar en memoria lo que puedes filtrar en origen.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    El filtrado debe hacerse lo mas cerca posible de la base de datos, no despues en memoria.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Buscar pedidos por usuario sin traer todo el universo de datos.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Mal enfoque: traer todos los pedidos y filtrar en codigo.</li>
                    <li>Buen enfoque: pedir solo los pedidos de `userId = 5` a la base de datos.</li>
                    <li>Resultado: menos memoria, menor latencia y mejor escalabilidad.</li>
                  </ul>

                  <div className={styles.quote}>
                    Muchas veces el problema no es el filtro, sino el lugar donde se aplica.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Cuestiona el volumen de datos movidos, no solo si funciona.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Donde se esta aplicando realmente el filtro?</li>
                    <li>Estoy trayendo datos que no necesito?</li>
                    <li>Esto funciona igual de bien con millones de filas?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Entity Framework permite construir la query antes de ejecutarla.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Usar `Where()` para filtrar en origen.</li>
                    <li>Encadenar query operators antes de `ToListAsync()`.</li>
                    <li>Evitar materializar datos demasiado pronto.</li>
                  </ul>

                  <pre>{filteringSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Los sintomas aparecen rapido cuando el endpoint no filtra bien.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Endpoints lentos aunque el filtro sea simple.</li>
                    <li>Consumo de memoria alto en el backend.</li>
                    <li>Respuestas grandes cuando deberian ser pequenas.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Menos datos moviendose significa sistemas mas rapidos y estables.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Un backend eficiente no filtra tarde: hace que la base de datos filtre por el.
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
                  <p>Dia 26 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> filtra en base de datos, no en memoria.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> construir query con Where antes de ejecutar.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> mover datos innecesarios degrada el sistema.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
