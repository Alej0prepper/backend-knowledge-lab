"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const optimisticSnippet = `// EF Core - concurrencia optimista con RowVersion
public class Product
{
  public int Id { get; set; }
  public int Stock { get; set; }

  [Timestamp]
  public byte[] RowVersion { get; set; } = Array.Empty<byte>();
}`;

const strategiesSnippet = `Locking -> una operacion a la vez
Optimistic concurrency -> todos intentan, pero detectas conflicto
Idempotency -> repetir no rompe el resultado`;

const checklistSnippet = `[ ] Enviar multiples requests simultaneas al mismo recurso
[ ] Repetir compras, pagos o reservas en paralelo
[ ] Verificar stock negativo, duplicados o estados incoherentes
[ ] Confirmar manejo de conflictos y reintentos`;

export default function Daily32Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/31";
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
            <Link className={styles.btn} href="/daily/31">
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
                <div className={styles.createdAt}>25/03/2026</div>
                <div className={styles.badge}>Daily #32 • Backend Foundations</div>
                <h2 className={styles.title}>Concurrencia: varios usuarios, mismo recurso</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>4-7 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Consistency</span>
                  <span className={styles.chip}>Tag: Race Conditions</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  La concurrencia no es una excepcion rara: aparece en cuanto varios usuarios tocan el mismo dato al
                  mismo tiempo.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Varias operaciones simultaneas sobre el mismo recurso pueden romper consistencia.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Tu backend atiende muchos usuarios a la vez. Si comparten datos, debes disenar para concurrencia.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Stock = 1, dos usuarios compran al mismo tiempo.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Usuario A compra y ve stock disponible.</li>
                    <li>Usuario B compra al mismo tiempo y tambien ve stock disponible.</li>
                    <li>Resultado: vendiste 2 unidades cuando solo habia 1.</li>
                  </ul>

                  <div className={styles.quote}>Ese choque entre operaciones simultaneas es una race condition.</div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El problema real</h3>
                    <p className={styles.sub}>Ambos leen el mismo estado y actuan como si fueran los unicos.</p>
                  </div>
                  <span className={styles.chip}>Problema</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Ambos leen `stock = 1`.</li>
                    <li>Ambos toman decisiones sin saber del otro.</li>
                    <li>Ambos guardan cambios y terminan rompiendo consistencia.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se trata la concurrencia</h3>
                    <p className={styles.sub}>No hay una receta unica: se combinan estrategias segun el caso.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Locking: una operacion a la vez. Seguro, pero menos escalable.</li>
                    <li>Concurrencia optimista: todos intentan, pero detectas conflicto al guardar.</li>
                    <li>Idempotencia: repetir la operacion no rompe el resultado final.</li>
                  </ul>

                  <pre>{strategiesSnippet}</pre>
                  <pre>{optimisticSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como piensa un backend developer y como lo detectas como tester</h3>
                    <p className={styles.sub}>Se diseña segun criticidad, escala y posibilidad de repeticion.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Si es critico: lock o transaccion fuerte.</li>
                    <li>Si escala mucho: concurrencia optimista.</li>
                    <li>Si puede repetirse: idempotencia.</li>
                  </ul>
                  <ul className={styles.bullets}>
                    <li>Prueba stock, pagos, reservas y operaciones criticas en paralelo.</li>
                    <li>Busca duplicados, stock negativo y estados incoherentes.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>La concurrencia no se elimina; se gestiona con estrategia.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend junior evita concurrencia. Backend senior disena para ella.
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
                  <p>Dia 32 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> varios usuarios sobre el mismo dato generan conflictos reales.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> transacciones, `RowVersion` e idempotencia ayudan a proteger consistencia.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> duplicados, sobreventa y estados incoherentes.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
