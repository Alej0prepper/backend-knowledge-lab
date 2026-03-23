"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const rateLimitingSnippet = `// Ejemplo conceptual en ASP.NET Core
builder.Services.AddRateLimiter(options =>
{
  options.AddFixedWindowLimiter("per-user", limiterOptions =>
  {
    limiterOptions.PermitLimit = 100;
    limiterOptions.Window = TimeSpan.FromMinutes(1);
  });
});

app.UseRateLimiter();`;

const checklistSnippet = `[ ] Enviar rafagas de requests y esperar 429
[ ] Verificar cabeceras de limite y retry
[ ] Confirmar que un usuario abusivo no afecte a otros
[ ] Validar limites por IP, usuario o API key`;

export default function Daily30Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/29";
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
            <Link className={styles.btn} href="/daily/29">
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
                <div className={styles.createdAt}>23/03/2026</div>
                <div className={styles.badge}>Daily #30 • Backend Foundations</div>
                <h2 className={styles.title}>Rate Limiting: proteger el backend de abusos</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Un backend estable no acepta trafico infinito: define limites para proteger recursos y usuarios.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Limitar requests por cliente dentro de una ventana de tiempo.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Rate limiting protege de abuso, ataques y uso descontrolado que puede saturar el backend.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Sin limites un solo cliente puede degradar el servicio para todos.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Sin rate limiting, un usuario puede lanzar 10000 requests por segundo.</li>
                    <li>El servidor se satura y otros usuarios quedan afectados.</li>
                    <li>Con limite de 100 requests por minuto por usuario, el sistema se estabiliza.</li>
                  </ul>

                  <div className={styles.quote}>Cuando el limite se supera, la API debe responder `429 Too Many Requests`.</div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No confia en el cliente: define reglas de acceso desde el servidor.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que volumen de trafico es razonable para este endpoint?</li>
                    <li>Que pasa si alguien abusa o automatiza llamadas?</li>
                    <li>Debo limitar por IP, usuario autenticado o API key?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>ASP.NET Core soporta middleware de rate limiting de forma nativa.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Limites por IP, usuario o cliente.</li>
                    <li>Algoritmos como fixed window, sliding window o token bucket.</li>
                    <li>Respuesta estandar `429` al superar el umbral.</li>
                  </ul>

                  <pre>{rateLimitingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Pruebas de carga corta y abuso controlado para validar proteccion real.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Enviar muchas requests rapidamente y esperar bloqueos controlados.</li>
                    <li>Validar respuesta `429` y comportamiento de reintento.</li>
                    <li>Confirmar que otros usuarios sigan operando normalmente.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Controlar acceso es parte del diseno backend, no un extra opcional.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Un backend profesional no solo funciona bajo uso normal; tambien se protege de uso excesivo o
                    malicioso.
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
                  <p>Dia 30 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> sin limites, un cliente puede degradar todo el sistema.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> middleware nativo con respuestas `429`.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> abuso sin control y saturacion del backend.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
