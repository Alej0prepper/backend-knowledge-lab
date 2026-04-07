"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const auditFieldsSnippet = `CreatedAt
CreatedBy
UpdatedAt
UpdatedBy
DeletedAt
DeletedBy`;

const baseEntitySnippet = `public class BaseEntity
{
    public DateTime CreatedAt { get; set; }
    public string CreatedBy { get; set; } = string.Empty;

    public DateTime? UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
}`;

const saveChangesSnippet = `if (entity.State == EntityState.Added)
{
    entity.CreatedAt = now;
    entity.CreatedBy = currentUserId;
}

if (entity.State == EntityState.Modified)
{
    entity.UpdatedAt = now;
    entity.UpdatedBy = currentUserId;
}`;

const miniProjectSnippet = `user = {
  id,
  name,
  createdAt,
  createdBy,
  updatedAt,
  updatedBy
}

POST /users
-> createdAt = now
-> createdBy = currentUser

PUT /users/{id}
-> updatedAt = now
-> updatedBy = currentUser`;

const checklistSnippet = `[ ] Crear con Usuario A y validar CreatedBy
[ ] Editar con Usuario B y validar UpdatedBy
[ ] Eliminar y validar DeletedBy/DeletedAt si aplica
[ ] Revisar logs para cambios criticos`;

export default function Daily40Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/39";
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
            <Link className={styles.btn} href="/daily/39">
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
                <div className={styles.createdAt}>07/04/2026</div>
                <div className={styles.badge}>Daily #40 • Backend Foundations</div>
                <h2 className={styles.title}>Auditoria: saber quien hizo que y cuando</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-9 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Trazabilidad</span>
                  <span className={styles.chip}>Tag: EF Core</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  En sistemas reales no basta con ejecutar acciones: necesitas historial para saber quien hizo que y
                  cuando.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Auditoria = rastro de cambios con autor, momento y contexto.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Backend profesional no solo hace cambios: deja evidencia confiable de esos cambios.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Se elimina un pedido y necesitas entender que paso.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Quien lo elimino?</li>
                    <li>Cuando ocurrio?</li>
                    <li>Desde que contexto o request?</li>
                    <li>Que valor tenia antes?</li>
                  </ul>
                  <p>Sin auditoria, estas preguntas quedan sin respuesta.</p>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que se suele guardar</h3>
                    <p className={styles.sub}>Campos minimos para trazabilidad en entidades criticas.</p>
                  </div>
                  <span className={styles.chip}>Datos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{auditFieldsSnippet}</pre>
                  <p>Esto suele combinarse con Soft Delete para mantener historico util.</p>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET (practico)</h3>
                    <p className={styles.sub}>Base entity + llenado automatico en SaveChanges.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Base entity</h4>
                  <pre>{baseEntitySnippet}</pre>

                  <h4>Automatico al guardar</h4>
                  <pre>{saveChangesSnippet}</pre>

                  <h4>Usuario actual</h4>
                  <p>Se obtiene desde claims JWT o contexto HTTP del request.</p>
                  <pre>{`currentUserId = UserId del request`}</pre>

                  <p>Nivel real: historial antes/despues, tablas de auditoria y logs estructurados.</p>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Verificas que los cambios dejan rastro consistente.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Modificar datos y revisar `UpdatedAt` y `UpdatedBy`.</li>
                    <li>Eliminar datos y revisar `DeletedAt` y `DeletedBy` si aplica.</li>
                    <li>Correlacionar cambios con logs del sistema.</li>
                  </ul>
                  <pre>{checklistSnippet}</pre>
                  <p>Senal de problema: cambios sin rastro o cambios no explicables.</p>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Un backend profesional registra historia, no solo estado final.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend junior ejecuta cambios. Backend senior preserva trazabilidad.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Simular auditoria basica de creacion y actualizacion.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: rastrear quien creo y quien modifico un dato.</p>
                  <pre>{miniProjectSnippet}</pre>
                  <p>Prueba mental:</p>
                  <ol className={styles.bullets}>
                    <li>Usuario A crea.</li>
                    <li>Usuario B edita.</li>
                  </ol>
                  <pre>{`createdBy = A
updatedBy = B`}</pre>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Guardar valor anterior para cambios criticos.</li>
                    <li>Definir auditoria reforzada para pagos y operaciones sensibles.</li>
                  </ul>

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
                  <p>Dia 40 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> auditoria permite saber quien hizo que y cuando.
                </div>
                <div className={styles.li}>
                  <strong>.NET real:</strong> base entity + SaveChanges automatico + usuario actual.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> validar `createdBy` y `updatedBy` con usuarios distintos.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
