"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const comparisonSnippet = `Rate limit -> 429 Too Many Requests
Throttling -> respuesta mas lenta / cola / concurrencia controlada`;

const checklistSnippet = `[ ] Enviar muchas requests seguidas
[ ] Verificar si hay bloqueo directo (429)
[ ] Verificar si hay ralentizacion progresiva
[ ] Validar impacto en experiencia de usuario`;

export default function Daily31Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/30";
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
            <Link className={styles.btn} href="/daily/30">
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
                <div className={styles.createdAt}>24/03/2026</div>
                <div className={styles.badge}>Daily #31 • Backend Foundations</div>
                <h2 className={styles.title}>Throttling vs Rate Limiting: no es lo mismo</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Performance</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Parecidos en objetivo, pero distintos en estrategia: uno corta el exceso y el otro regula el ritmo.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Rate limiting bloquea; throttling ralentiza o regula.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Uno corta de golpe. El otro suaviza el trafico.</div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Mismo problema de exceso, dos respuestas distintas.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Rate limiting: limite 100/min. En la 101, respuesta `429`.</li>
                    <li>Throttling: el sistema empieza a encolar, demorar o reducir velocidad.</li>
                    <li>No bloquea siempre de golpe, regula progresivamente.</li>
                  </ul>

                  <div className={styles.quote}>Elegir entre bloquear y regular depende del contexto del endpoint.</div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No todo exceso es abuso: a veces hay picos legitimos.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Quiero bloquear o controlar ritmo?</li>
                    <li>Es abuso claro o uso intensivo normal?</li>
                    <li>Como impacta en experiencia de usuario?</li>
                  </ul>
                  <ul className={styles.bullets}>
                    <li>Login: normalmente rate limit por seguridad.</li>
                    <li>API publica: throttling puede ser mejor para UX.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Dos enfoques distintos en el mismo stack.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Rate limiting: middleware con limites claros y respuesta 429.</li>
                    <li>Throttling: colas, delays y control de concurrencia.</li>
                    <li>Se pueden combinar segun endpoint y carga.</li>
                  </ul>

                  <pre>{comparisonSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Con pruebas de rafaga se distingue si bloquea o regula.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Enviar muchas requests seguidas.</li>
                    <li>Observar si bloquea con 429 o si ralentiza respuesta.</li>
                    <li>Validar que el comportamiento esperado coincide con el diseno.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      No todo exceso debe bloquearse: a veces regular trafico da mejor resultado.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Elegir entre rate limiting y throttling es una decision de diseno tecnico y de experiencia.
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
                  <p>Dia 31 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> rate limit bloquea, throttling regula ritmo.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> middleware 429 vs colas/delays/concurrencia.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> aplicar estrategia incorrecta para el tipo de trafico.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
