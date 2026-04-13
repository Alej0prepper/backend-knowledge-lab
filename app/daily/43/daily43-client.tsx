"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const anemicEntitySnippet = `Order
- Id
- Status
- Total`;

const anemicServiceSnippet = `OrderService
  if no pagado -> no enviar
  if total < 0 -> error`;

const richEntitySnippet = `Order
  Ship()
    si no pagado -> error

  AddItem()
    recalcula total
    si total < 0 -> error`;

const weakFlowSnippet = `order.Status = Shipped`;

const strongFlowSnippet = `order.Ship()`;

const methodsSnippet = `Order
  Create()
  AddItem()
  Ship()`;

const comparisonTableSnippet = `Tipo: Anemica
- datos sin reglas

Tipo: Rica
- datos + comportamiento + reglas`;

const checklistSnippet = `[ ] Identificar reglas duplicadas en servicios
[ ] Revisar si las entidades tienen metodos de negocio
[ ] Detectar asignaciones directas de estado
[ ] Validar que las reglas viven en un solo lugar`;

const miniProjectSnippet = `Modelo anemico:
Order
  status
  total

Lógica afuera:
if status != Paid -> error

Modelo rico:
Order
  Ship()
    si no pagado -> error`;

export default function Daily43Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/42";
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
            <Link className={styles.btn} href="/daily/42">
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
                <div className={styles.createdAt}>13/04/2026</div>
                <div className={styles.badge}>Daily #43 • Backend Foundations</div>
                <h2 className={styles.title}>Entidades anemicas vs entidades ricas</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>6-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Dominio</span>
                  <span className={styles.chip}>Tag: Entidades</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Hay dos formas de modelar entidades: como contenedores de datos o como objetos con reglas y
                  comportamiento.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Backend profesional tiende a entidades ricas.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Entidades ricas = datos + comportamiento + reglas.</div>
                  <pre>{comparisonTableSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Mismo dominio con dos enfoques diferentes.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Entidad anemica</h4>
                  <pre>{anemicEntitySnippet}</pre>
                  <pre>{anemicServiceSnippet}</pre>

                  <h4>Entidad rica</h4>
                  <pre>{richEntitySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No modela solo datos, modela comportamiento.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Los datos sin reglas no tienen valor.</li>
                    <li>Las reglas deben vivir donde vive el estado.</li>
                    <li>Si una entidad se protege, el sistema es consistente.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="relacion">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Relacion con dias anteriores</h3>
                    <p className={styles.sub}>Validacion en dominio e invariantes viven aqui.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Dia 41: validacion en dominio.</li>
                    <li>Dia 42: invariantes del sistema.</li>
                    <li>Entidades ricas son el hogar de esas reglas.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como se ve en .NET</h3>
                    <p className={styles.sub}>Evita asignaciones directas; usa metodos.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Modelo anemico:</p>
                  <pre>{weakFlowSnippet}</pre>

                  <p>Modelo rico:</p>
                  <pre>{strongFlowSnippet}</pre>

                  <p>Metodos tipicos en entidad rica:</p>
                  <pre>{methodsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="diferencia">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Diferencia clave</h3>
                    <p className={styles.sub}>Reglas centralizadas vs reglas dispersas.</p>
                  </div>
                  <span className={styles.chip}>Comparacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Anemica: reglas en servicios, riesgo de duplicacion.</li>
                    <li>Rica: reglas en entidad, consistencia por defecto.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="cuando-usar">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Cuando usar cada una</h3>
                    <p className={styles.sub}>Depende de si hay reglas o solo datos de transporte.</p>
                  </div>
                  <span className={styles.chip}>Decision</span>
                </div>
                <div className={styles.sbd}>
                  <p>Entidad rica cuando:</p>
                  <ul className={styles.bullets}>
                    <li>Hay invariantes.</li>
                    <li>Hay estados y transiciones.</li>
                    <li>Hay reglas de negocio importantes.</li>
                  </ul>

                  <p>Entidad anemica cuando:</p>
                  <ul className={styles.bullets}>
                    <li>Solo lectura o DTO.</li>
                    <li>Modelo de transporte sin reglas.</li>
                    <li>Datos simples sin comportamiento.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas reglas duplicadas y comportamiento inconsistente.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Logica repetida en multiples servicios.</li>
                    <li>Inconsistencias entre flujos.</li>
                    <li>Reglas duplicadas que se actualizan mal.</li>
                  </ul>
                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Backend profesional modela comportamiento, no solo datos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>Backend junior mueve datos. Backend senior protege comportamiento.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Comparar entidad anemica vs entidad rica.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: ver donde vive la regla en cada enfoque.</p>
                  <pre>{miniProjectSnippet}</pre>

                  <p>Prueba mental:</p>
                  <pre>{`¿Desde fuera puedo hacer esto?

order.Status = Shipped`}</pre>

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
                  <p>Dia 43 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> entidades ricas concentran reglas.
                </div>
                <div className={styles.li}>
                  <strong>Problema:</strong> entidades anemicas dispersan logica.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> revisar si las reglas viven en la entidad.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
