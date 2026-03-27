"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const flowSnippet = `Request -> guardar datos -> encolar tarea -> responder OK`;

const miniProjectSnippet = `jobsQueue = []

register_user()
jobsQueue.append("send email to user")
jobsQueue.append("log analytics event")
return OK`;

const workerSnippet = `while jobsQueue:
  job = jobsQueue.pop(0)
  execute(job)`;

const checklistSnippet = `[ ] Validar respuesta rapida del endpoint principal
[ ] Verificar ejecucion diferida de jobs secundarios
[ ] Simular fallo del job y comprobar reintentos
[ ] Confirmar que fallo del job no rompa la operacion principal`;

export default function Daily34Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/33";
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
            <Link className={styles.btn} href="/daily/33">
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
                <div className={styles.createdAt}>27/03/2026</div>
                <div className={styles.badge}>Daily #34 • Backend Foundations</div>
                <h2 className={styles.title}>Background Jobs: no todo debe hacerse en la request</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>4-8 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Escalabilidad</span>
                  <span className={styles.chip}>Tag: Asincronia</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Separar tareas criticas de tareas secundarias hace el backend mas rapido para el usuario y mas robusto
                  para el sistema.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>No todo debe ejecutarse durante la request principal.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Background job = tarea en segundo plano fuera del flujo sincrono del endpoint.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Registro de usuario con tareas secundarias.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Sin background jobs: crear usuario + email + reporte + analitica en la misma request.</li>
                    <li>Con background jobs: crear usuario y responder rapido; email y analitica van a cola.</li>
                    <li>El usuario no espera tareas que no son criticas para confirmar la accion.</li>
                  </ul>

                  <pre>{flowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Decide que debe ser sincrono y que debe delegarse.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Esto es critico para responder al usuario?</li>
                    <li>El usuario necesita esperar esta tarea?</li>
                    <li>Si falla esta parte, rompe la operacion principal?</li>
                  </ul>
                  <ul className={styles.bullets}>
                    <li>Critico: sincrono.</li>
                    <li>Secundario: asincrono por job.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Tareas de fondo con workers, colas y herramientas de scheduling.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>`IHostedService` para workers internos.</li>
                    <li>Colas como RabbitMQ o Azure Queue para desacoplar trabajo.</li>
                    <li>Herramientas como Hangfire para jobs programados y reintentos.</li>
                  </ul>

                  <pre>{flowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscar resultados diferidos y validar recuperacion ante fallos.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Acciones que terminan despues de responder el endpoint.</li>
                    <li>Emails que llegan con algunos segundos de retraso.</li>
                    <li>Datos que aparecen con delay por procesamiento de fondo.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Backend profesional separa lo urgente de lo importante.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    No todo debe ser inmediato para el usuario; algunas tareas deben delegarse al sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Simular cola de jobs para entender asincronia en backend.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: identificar que va sincrono y que va asincrono.</p>
                  <p>Ejercicio para `POST /register`:</p>
                  <ul className={styles.bullets}>
                    <li>Sincrono: crear usuario.</li>
                    <li>Asincrono: enviar email y registrar analitica.</li>
                  </ul>

                  <pre>{miniProjectSnippet}</pre>
                  <pre>{workerSnippet}</pre>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Si el email falla, definir politica de reintentos.</li>
                    <li>Elegir maximo de intentos y estrategia de backoff.</li>
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
                  <p>Dia 34 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> solo lo critico va en la request; lo demas se delega.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> simular `jobsQueue` y un worker en 5-10 min.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo evitado:</strong> endpoints lentos y fragiles por hacer todo sincrono.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
