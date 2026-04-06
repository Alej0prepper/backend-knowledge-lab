"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const modelSnippet = `Id | Name | IsDeleted
1  | Ana  | false
2  | Luis | true`;

const efSnippet = `public bool IsDeleted { get; set; }

// Lectura normal
users.Where(u => !u.IsDeleted);

// "Eliminar"
user.IsDeleted = true;`;

const filterSnippet = `// EF Core - Global Query Filter
modelBuilder.Entity<User>()
  .HasQueryFilter(u => !u.IsDeleted);`;

const miniProjectSnippet = `users = [
  { id: 1, name: "A", isDeleted: false },
  { id: 2, name: "B", isDeleted: false }
]

DELETE /users/1
-> isDeleted = true

GET /users
-> solo isDeleted = false`;

const checklistSnippet = `[ ] Eliminar y confirmar que no aparece en listados
[ ] Consultar almacenamiento y validar que sigue existiendo
[ ] Restaurar y verificar que reaparece
[ ] Revisar reportes para evitar incluir eliminados por error`;

export default function Daily39Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/38";
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
            <Link className={styles.btn} href="/daily/38">
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
                <div className={styles.createdAt}>06/04/2026</div>
                <div className={styles.badge}>Daily #39 • Backend Foundations</div>
                <h2 className={styles.title}>Soft Delete: borrar sin borrar</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-9 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Data Integrity</span>
                  <span className={styles.chip}>Tag: EF Core</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  En muchos sistemas eliminar no significa destruir: significa ocultar con control y posibilidad de
                  recuperar.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>El registro permanece en DB, pero se marca como eliminado.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Soft Delete = ocultar de forma controlada, no borrar fisicamente.</div>
                  <pre>{modelSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Por que se hace</h3>
                    <p className={styles.sub}>Borrar fisicamente puede romper datos y perder trazabilidad.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Evitas perdida irreversible de datos.</li>
                    <li>Mantienes relaciones y referencias historicas.</li>
                    <li>Permites auditoria y recuperacion.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Primero evalua si ocultar es mejor que destruir.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Este dato debe desaparecer por completo?</li>
                    <li>Necesito historico o capacidad de restaurar?</li>
                    <li>Que impacto tiene en relaciones y reportes?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET (practico)</h3>
                    <p className={styles.sub}>Bandera `IsDeleted` + filtros para ocultar eliminados automaticamente.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{efSnippet}</pre>
                  <p>Nivel real: Global Query Filters en EF Core.</p>
                  <pre>{filterSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Validas visibilidad, persistencia y restauracion del dato eliminado.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Eliminar no reduce registros fisicos en DB.</li>
                    <li>Dato eliminado no aparece en UI normal.</li>
                    <li>Restauracion vuelve a mostrarlo.</li>
                  </ul>
                  <pre>{checklistSnippet}</pre>
                  <p>Problema comun: olvidar filtrar `IsDeleted` y mostrar datos fantasma.</p>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Eliminar no siempre significa destruir; a veces significa ocultar con control.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend junior borra datos. Backend senior decide si realmente deben desaparecer.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Simular soft delete y restauracion en una lista simple.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: entender visibilidad vs existencia real de datos.</p>
                  <pre>{miniProjectSnippet}</pre>
                  <p>Extra:</p>
                  <pre>{`RESTORE /users/1
-> isDeleted = false`}</pre>

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
                  <p>Dia 39 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> soft delete oculta sin destruir fisicamente.
                </div>
                <div className={styles.li}>
                  <strong>.NET real:</strong> `IsDeleted` + global query filters.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> eliminar, listar filtrado y restaurar.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
