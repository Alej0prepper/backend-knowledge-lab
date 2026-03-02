"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../daily-lesson.module.css";

const codeSnippet = `if (order.Status == Paid)
    return; // ya estaba pagado`;

export default function Daily5Client() {
  const [copyLabel, setCopyLabel] = useState("Copiar");
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "n") window.location.href = "/daily/6";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopyLabel("Copiado ✓");
    } catch {
      setCopyLabel("No se pudo copiar");
    } finally {
      window.setTimeout(() => setCopyLabel("Copiar"), 1200);
    }
  };
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
            <Link className={styles.btn} href="/daily/4">
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
                <div className={styles.badge}>Daily #5 • Backend Foundations</div>
                <h2 className={styles.title}>Idempotencia: por que repetir una accion no siempre debe romper todo</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: REST</span>
                  <span className={styles.chip}>Tag: Confiabilidad</span>
                  <span className={styles.chip}>.NET</span>
                </div>

                <p className={styles.lead}>
                  Hoy aprendes un concepto que evita bugs caros: como disenar acciones para que <strong>reintentos</strong>
                  y <strong>requests duplicadas</strong> no causen dobles cobros o estados corruptos.
                </p>

                <div className={styles.jump}>
                  <a className={`${styles.btn} ${styles.primary}`} href="#idea">
                    Empezar
                  </a>
                  <a className={styles.btn} href="#takeaway">
                    Idea final
                  </a>
                </div>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>
                      Idempotencia significa que repetir la misma peticion produce el mismo estado final que hacerla
                      una sola vez.
                    </p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    <strong>Idempotencia</strong> = repetir no debe corromper el estado final del sistema.
                  </div>
                  <div className={styles.quote}>
                    No significa &quot;no pasa nada&quot;. Significa &quot;el sistema no termina en un estado
                    incorrecto&quot;.
                  </div>

                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo real</h3>
                    <p className={styles.sub}>El caso tipico: doble procesamiento por reintentos.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>El usuario paga un pedido.</li>
                    <li>La red falla.</li>
                    <li>El frontend reintenta.</li>
                    <li>El backend procesa dos veces el pago.</li>
                  </ul>

                  <div className={styles.quote}>
                    Un backend profesional se pregunta: <strong>&quot;Que pasa si esto se ejecuta dos veces?&quot;</strong>
                  </div>

                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No confia en el happy path. Disena para fallos.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Un backend serio no asume que el cliente enviara una sola vez. Disena para duplicacion.
                  </div>
                  <ul className={styles.bullets}>
                    <li>Reintentos automaticos</li>
                    <li>Requests duplicadas</li>
                    <li>Doble clic del usuario</li>
                    <li>Eventos repetidos</li>
                  </ul>

                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Patrones simples que ya previenen bugs graves.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Verificar si ya existe el registro antes de crear</li>
                    <li>Claves unicas en base de datos</li>
                    <li>Transacciones</li>
                    <li>Comprobar estado antes de cambiar</li>
                  </ul>

                  <pre>{codeSnippet}</pre>

                  <div className={styles.codebar}>
                    <div className={styles.hint}>Esto es idempotencia por estado: protege transiciones repetidas.</div>
                    <button type="button" className={styles.copy} onClick={onCopy}>
                      {copyLabel}
                    </button>
                  </div>

                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Los bugs serios aparecen cuando duplicas acciones.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Prueba siempre la duplicacion: ahi nacen los incidentes raros.</div>

                  <ul className={styles.bullets}>
                    <li>Que pasa si envio la misma request 2 veces rapido?</li>
                    <li>Que pasa si refresco mientras procesa?</li>
                    <li>Que pasa si reintento desde Postman?</li>
                  </ul>

                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Cambia tu forma de pensar acciones.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    <strong>Un backend profesional no confia en que las acciones ocurren una sola vez.</strong>
                  </div>
                  <p className={styles.sub}>
                    Si empiezas a pensar en duplicacion automatica, ya estas subiendo de nivel.
                  </p>

                  <div className={styles.footerNav} id="next">
                    <Link className={styles.btn} href="/daily/4">
                      ← Dia 4
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/daily/6">
                      Dia 6 →
                    </Link>
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
                  <p>Lo minimo que debes recordar.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.mini}>
                  <div className={styles.k}>
                    Idea en 1 frase <span className={`${styles.chip} ${styles.chipOk}`}>clave</span>
                  </div>
                  <div className={styles.v}>Repetir una peticion no debe romper el estado final del sistema.</div>
                </div>

                <div className={styles.li}>
                  <strong>Ejemplo:</strong> reintento de pago -&gt; evita doble cobro.
                </div>
                <div className={styles.li}>
                  <strong>Patron:</strong> validar estado antes de transicionar (`Paid`).
                </div>
                <div className={styles.li}>
                  <strong>Testing:</strong> envia la misma request 2 veces rapido.
                </div>

                <div className={styles.li}>
                  <strong>Relacionado en REST ATLAS</strong>
                  <div className={styles.relatedLinks}>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Checklist (30s)</h2>
                  <p>Para aplicarlo hoy mismo.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>✅ Puede ejecutarse dos veces sin duplicar efectos?</div>
                <div className={styles.li}>✅ Hay control por estado, constraint o key?</div>
                <div className={styles.li}>✅ La respuesta es consistente si ya se proceso?</div>

                <div className={styles.li}>
                  <strong>Atajo:</strong> agrega un test de reintento en tu suite.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
