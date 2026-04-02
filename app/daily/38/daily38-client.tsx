"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const eventFlowSnippet = `CreateOrder -> guardar en DB -> publicar evento
DashboardService escucha -> actualiza vista`;

const backgroundFlowSnippet = `crear pedido -> responder OK
-> job actualiza estadisticas despues`;

const cacheFlowSnippet = `GET /dashboard -> lee de cache
cache se refresca luego`;

const miniProjectFlowSnippet = `POST /order
-> guardar en DB
-> publicar evento
-> responder OK`;

const dashboardFlowSnippet = `Dashboard escucha evento
-> actualiza metricas`;

const checklistSnippet = `[ ] Crear dato y consultar inmediatamente
[ ] Consultar de nuevo tras algunos segundos
[ ] Verificar que termina consistente
[ ] Documentar al frontend el retraso esperado`;

export default function Daily38Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/37";
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
            <Link className={styles.btn} href="/daily/37">
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
                <div className={styles.createdAt}>02/04/2026</div>
                <div className={styles.badge}>Daily #38 • Backend Foundations</div>
                <h2 className={styles.title}>Consistencia eventual: por que los datos no siempre estan al dia</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-9 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Escalabilidad</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  En sistemas desacoplados, no todo se refleja al instante en todos lados y eso no siempre es un bug.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Los datos pueden tardar en converger entre componentes.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Eventual consistency significa que la consistencia llega despues, no siempre en el mismo instante.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Pedido creado ahora, dashboard actualizado segundos despues.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Pedido se guarda correctamente en DB.</li>
                    <li>Dashboard tarda 2-3 segundos en mostrarlo.</li>
                    <li>No siempre es bug: puede venir de eventos, jobs o cache.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Evalua que datos deben ser inmediatos y cuales pueden tener delay.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Este dato necesita inmediatez real?</li>
                    <li>Puedo permitir retraso sin dañar negocio?</li>
                    <li>Estoy usando eventos, jobs o cache desacoplada?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET (claro)</h3>
                    <p className={styles.sub}>Consistencia eventual aparece por desacoplamiento y procesamiento diferido.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Eventos + colas</h4>
                  <pre>{eventFlowSnippet}</pre>

                  <h4>Background jobs</h4>
                  <pre>{backgroundFlowSnippet}</pre>

                  <h4>Cache</h4>
                  <pre>{cacheFlowSnippet}</pre>

                  <p>Los otros sistemas se enteran porque escuchan cola, ejecutan jobs o reaccionan a eventos.</p>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas inconsistencias temporales y validas convergencia final.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Datos que aparecen con delay.</li>
                    <li>Dashboards que se actualizan despues.</li>
                    <li>Diferencias temporales entre vistas del sistema.</li>
                  </ul>
                  <pre>{checklistSnippet}</pre>

                  <p>No todo puede ser eventual: pagos, stock critico y permisos suelen requerir consistencia fuerte.</p>
                  <p>Si puede ser eventual: dashboards, analytics y notificaciones.</p>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>A veces la mejor decision no es inmediatez, sino robustez y escalabilidad.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend profesional sabe cuando aceptar retraso controlado para ganar desacoplamiento y escala.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Practicar cuando aceptar consistencia eventual en un flujo real.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: entender el retraso como diseno, no como error automatico.</p>
                  <p>Flujo:</p>
                  <pre>{miniProjectFlowSnippet}</pre>
                  <pre>{dashboardFlowSnippet}</pre>

                  <p>Prueba mental:</p>
                  <ul className={styles.bullets}>
                    <li>Crear pedido.</li>
                    <li>Consultar dashboard inmediato: aun no aparece.</li>
                    <li>Esperar unos segundos: aparece correctamente.</li>
                  </ul>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Como comunicar este comportamiento al frontend?</li>
                    <li>Como evitar confusion para usuarios finales?</li>
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
                  <p>Dia 38 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> en sistemas desacoplados, consistencia puede llegar despues.
                </div>
                <div className={styles.li}>
                  <strong>.NET real:</strong> eventos, jobs y cache introducen delay controlado.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> validar convergencia final, no solo estado instantaneo.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
