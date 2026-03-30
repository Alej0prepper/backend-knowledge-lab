"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const queueFlowSnippet = `API -> publica mensaje -> cola -> worker procesa`;

const miniProjectSnippet = `queue = []

create_order()
queue.append("send email")
return OK`;

const workerSnippet = `while queue:
  message = queue.pop(0)
  process(message)`;

const checklistSnippet = `[ ] Apagar servicio externo y verificar que la API principal responda
[ ] Confirmar que mensajes pendientes se procesen luego
[ ] Validar reintentos automaticos del worker
[ ] Revisar que no se pierdan mensajes`;

export default function Daily35Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/34";
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
            <Link className={styles.btn} href="/daily/34">
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
                <div className={styles.createdAt}>30/03/2026</div>
                <div className={styles.badge}>Daily #35 • Backend Foundations</div>
                <h2 className={styles.title}>Colas (Queues): desacoplar sistemas</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>4-8 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Integracion</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Las colas permiten desacoplar componentes para que un fallo externo no derribe el flujo principal.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>En vez de ejecutar directo, dejas un mensaje para procesar despues.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Con colas, el backend no depende de que todos los sistemas esten disponibles en tiempo real.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Enviar email al crear pedido.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Sin cola: API llama directo al email; si falla, puede fallar todo.</li>
                    <li>Con cola: API publica mensaje y responde; worker envia email luego.</li>
                    <li>El endpoint principal queda rapido y resistente a caidas externas.</li>
                  </ul>

                  <pre>{queueFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Prefiere desacoplar cuando no necesita respuesta inmediata.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Debo depender del otro sistema en tiempo real?</li>
                    <li>Que pasa si el servicio externo esta caido?</li>
                    <li>Puedo transformar una llamada directa en mensaje asincrono?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Integraciones tipicas con brokers o buses de mensajes.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>RabbitMQ para colas clasicas de trabajo.</li>
                    <li>Azure Service Bus en entornos cloud.</li>
                    <li>Kafka para flujos/eventos de mayor escala.</li>
                  </ul>

                  <pre>{queueFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Validas que el sistema principal siga estable aunque falle un externo.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Acciones que no se completan instantaneamente.</li>
                    <li>Procesos que continúan incluso cuando un servicio falla.</li>
                    <li>Reintentos automaticos del worker sobre mensajes pendientes.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Backend profesional desacopla para resistir fallos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Un backend maduro no conecta todo directo: usa colas para tolerar caidas y seguir operando.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Simular desacoplamiento con una cola en memoria.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: ver el cambio mental entre llamada directa y mensaje en cola.</p>
                  <p>Ejercicio para `POST /order`:</p>
                  <ul className={styles.bullets}>
                    <li>Sin cola: crear pedido + enviar email directo.</li>
                    <li>Con cola: crear pedido + publicar mensaje + responder OK.</li>
                  </ul>

                  <pre>{miniProjectSnippet}</pre>
                  <pre>{workerSnippet}</pre>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Si worker cae, como reanudas sin perder mensajes?</li>
                    <li>Donde persistes cola: memoria, broker o base de datos?</li>
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
                  <p>Dia 35 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> cola desacopla para evitar dependencia en tiempo real.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> simular `queue` y `worker` para interiorizar el patron.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo evitado:</strong> caida de servicio externo rompiendo la operacion principal.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
