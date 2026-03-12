"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const retryDecisionSnippet = `// Regla simple: reintentar solo errores temporales
bool ShouldRetry(HttpStatusCode statusCode) =>
  statusCode == HttpStatusCode.RequestTimeout ||
  statusCode == HttpStatusCode.TooManyRequests ||
  statusCode == HttpStatusCode.BadGateway ||
  statusCode == HttpStatusCode.ServiceUnavailable ||
  statusCode == HttpStatusCode.GatewayTimeout;`;

const pollySnippet = `builder.Services.AddHttpClient<IPaymentGateway, PaymentGateway>()
  .AddTransientHttpErrorPolicy(policy =>
    policy.WaitAndRetryAsync(
      retryCount: 3,
      sleepDurationProvider: attempt => TimeSpan.FromMilliseconds(200 * attempt)
    )
  );`;

const checklistSnippet = `[ ] Forzar timeout temporal y verificar que termina exitosamente en reintento
[ ] Confirmar que errores permanentes (400/422) no se reintentan
[ ] Revisar logs: intento 1, intento 2, resultado final
[ ] Medir impacto en latencia total por backoff`;

export default function Daily23Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/22";
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
            <Link className={styles.btn} href="/daily/22">
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
                <div className={styles.badge}>Daily #23 • Backend Foundations</div>
                <h2 className={styles.title}>Retries: fallar una vez no siempre significa fallar</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Retries</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  En sistemas distribuidos muchos errores son temporales. Reintentar bien puede evitar fallos
                  innecesarios para el usuario.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Retry permite volver a intentar errores temporales automaticamente.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Fallar una vez no siempre significa que el sistema este roto.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Servicio de pagos falla en primer intento y responde en el segundo.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Intento 1: timeout o error de red.</li>
                    <li>Espera breve: 100-200 ms.</li>
                    <li>Intento 2: operacion exitosa.</li>
                  </ul>

                  <div className={styles.quote}>
                    Sin retry, el usuario recibe error aunque el problema era temporal.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Diferencia errores temporales de errores permanentes.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Este error es temporal o permanente?</li>
                    <li>Tiene sentido reintentar?</li>
                    <li>Cuantas veces?</li>
                    <li>Cuanto esperar entre intentos?</li>
                  </ul>

                  <pre>{retryDecisionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Polly + backoff para reintentos controlados.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Polly para politicas de resiliencia.</li>
                    <li>Retries con backoff progresivo.</li>
                    <li>Limite de intentos para no agravar saturacion.</li>
                  </ul>

                  <pre>{pollySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Sistemas resilientes se recuperan solos de fallos pequenos.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Operaciones algo mas lentas pero exitosas.</li>
                    <li>Logs con varios intentos de una misma accion.</li>
                    <li>Recuperacion automatica sin intervencion manual.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      Un backend robusto sabe cuando volver a intentar antes de rendirse.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    No todo error indica rotura definitiva; algunos solo piden un reintento inteligente.
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
                  <p>Dia 23 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> reintentar bien reduce errores innecesarios.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> Polly + backoff + limites de intentos.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> reintentar mal puede agravar saturaciones.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
