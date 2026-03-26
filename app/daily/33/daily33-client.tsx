"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const idempotencyFlowSnippet = `1) Recibir request + Idempotency-Key
2) Buscar key en almacenamiento
3) Si existe -> devolver resultado guardado
4) Si no existe -> ejecutar y guardar resultado`;

const miniProjectSnippet = `processedKeys = {}

if key in processedKeys:
  return processedKeys[key]

result = create_order()
processedKeys[key] = result
return result`;

const checklistSnippet = `[ ] Repetir request con la misma key
[ ] Simular doble click del usuario
[ ] Verificar que no existan duplicados
[ ] Validar que la segunda respuesta sea la misma`;

export default function Daily33Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/32";
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
            <Link className={styles.btn} href="/daily/32">
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
                <div className={styles.createdAt}>26/03/2026</div>
                <div className={styles.badge}>Daily #33 • Backend Foundations</div>
                <h2 className={styles.title}>Idempotency Keys: como evitar duplicados en operaciones criticas</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>4-8 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Reliability</span>
                  <span className={styles.chip}>Tag: Payments</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Las idempotency keys convierten reintentos peligrosos en operaciones seguras y repetibles sin
                  duplicados.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Una key unica identifica la operacion para no ejecutarla dos veces.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Idempotency key = misma key, mismo resultado, sin efectos duplicados.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Pago con fallo de red y reintento automatico.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Sin control: riesgo de doble cobro.</li>
                    <li>Con `Idempotency-Key: abc123`, el backend procesa una vez.</li>
                    <li>Si llega otra request igual con la misma key, devuelve el resultado previo.</li>
                  </ul>

                  <pre>{`POST /payments
Idempotency-Key: abc123`}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Disena defensivamente para errores de red, reintentos y doble click.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Puede repetirse esta operacion?</li>
                    <li>Es critica (pagos, ordenes, reservas)?</li>
                    <li>Como identifico que es la misma operacion?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET (conceptual)</h3>
                    <p className={styles.sub}>Guardar resultado por key y reutilizarlo en reintentos.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{idempotencyFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Repite la misma accion con igual key y valida que no se duplique.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Reintentar request con la misma key.</li>
                    <li>Simular doble click del usuario.</li>
                    <li>Verificar que no se creen cobros u ordenes duplicadas.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Idempotency key convierte una operacion peligrosa en una operacion segura.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    No evita que lleguen reintentos; evita que esos reintentos rompan tu sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Simular idempotencia de forma simple para interiorizar el patron.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: entender la mecanica sin infraestructura compleja.</p>
                  <p>Ejercicio:</p>
                  <ul className={styles.bullets}>
                    <li>Define un almacenamiento en memoria `processedKeys = {}`.</li>
                    <li>Si la key existe, devuelve el resultado guardado.</li>
                    <li>Si no existe, ejecuta y guarda resultado.</li>
                  </ul>

                  <pre>{miniProjectSnippet}</pre>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Donde guardarias keys en produccion: DB o Redis.</li>
                    <li>Define una estrategia de expiracion de keys.</li>
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
                  <p>Dia 33 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> misma key, misma operacion, mismo resultado.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> mini proyecto para simular `processedKeys` en 5-10 min.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo evitado:</strong> cobros y ordenes duplicadas por reintentos.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
