"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const lowCohesionSnippet = `public class UserService
{
  public Task RegisterAsync(RegisterUserRequest request) { /* ... */ }
  public Task SendWelcomeEmailAsync(Guid userId) { /* ... */ }
  public Task<UserStats> CalculateStatisticsAsync() { /* ... */ }
  public Task<byte[]> GenerateMonthlyReportAsync() { /* ... */ }
  public Task<TokenResult> AuthenticateAsync(LoginRequest request) { /* ... */ }
}`;

const highCohesionSnippet = `public class UserRegistrationService
{
  public Task<Guid> RegisterAsync(RegisterUserCommand command, CancellationToken ct)
  {
    // Solo responsabilidad de registro
  }
}

public class EmailNotificationService
{
  public Task SendWelcomeAsync(string email, CancellationToken ct)
  {
    // Solo notificaciones por email
  }
}

public class UserStatisticsService
{
  public Task<UserStatsDto> GetSummaryAsync(DateRange range, CancellationToken ct)
  {
    // Solo estadisticas de usuarios
  }
}`;

const checklistSnippet = `[ ] Busca servicios con demasiadas responsabilidades mezcladas
[ ] Revisa clases con demasiadas dependencias inyectadas
[ ] Verifica si un cambio funcional rompe otra area no relacionada
[ ] Evalua si cada clase tiene una sola razon de cambio`;

export default function Daily12Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/11";
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
            <Link className={styles.btn} href="/daily/11">
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
                <div className={styles.badge}>Daily #12 • Backend Foundations</div>
                <h2 className={styles.title}>Cohesion: cada pieza debe tener una sola razon para existir</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Cohesion</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Si el acoplamiento es el enemigo externo, la cohesion es la disciplina interna: cada pieza debe tener
                  una unica responsabilidad clara.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Una clase o modulo debe tener una unica responsabilidad clara.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Si una clase hace demasiadas cosas, se vuelve dificil de mantener y de evolucionar sin riesgos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo real</h3>
                    <p className={styles.sub}>`UserService` multiproposito es baja cohesion; servicios enfocados no.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Mal ejemplo: una clase registra, envia emails, calcula estadisticas y autentica.</li>
                    <li>Buen ejemplo: servicios separados por responsabilidad.</li>
                  </ul>

                  <div className={styles.quote}>Una clase cajon suele terminar siendo un punto fragil del sistema.</div>

                  <pre>{lowCohesionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Evalua la razon de existencia de cada clase y su alcance real.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Por que existe esta clase?</li>
                    <li>Podria dividirla en piezas mas claras?</li>
                    <li>Esta haciendo mas de lo que deberia?</li>
                  </ul>

                  <div className={styles.callout}>
                    Si una clase cambia por razones distintas, su cohesion es baja.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Clases pequenas, metodos claros y dependencias minimas.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Baja cohesion: archivos de 500+ lineas y metodos enormes.</li>
                    <li>Baja cohesion: servicios con demasiadas dependencias inyectadas.</li>
                    <li>Baja cohesion: servicios con muchos metodos sin relacion clara.</li>
                    <li>Alta cohesion: clases pequenas con una intencion concreta.</li>
                  </ul>

                  <pre>{highCohesionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Bugs cruzados entre areas suelen indicar falta de cohesion.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Un cambio en una funcionalidad rompe otra no relacionada.</li>
                    <li>El mismo servicio aparece en bugs de areas distintas.</li>
                    <li>Cuesta entender que hace realmente una clase.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Backend profesional = bajo acoplamiento + alta cohesion.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Si una pieza hace demasiadas cosas, es probable que el sistema completo sea fragil.
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
                  <p>Dia 12 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> una clase debe tener una sola razon para cambiar.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> clases pequenas, metodos claros y dependencias minimas.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> clases cajon rompen varias areas al mismo tiempo.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
