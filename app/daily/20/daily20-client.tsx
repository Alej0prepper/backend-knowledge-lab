"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const weakLogSnippet = `// Log debil: sin contexto
logger.LogError("Something failed");`;

const structuredLogSnippet = `public async Task<Result> CreateOrderAsync(CreateOrderCommand command, CancellationToken ct)
{
  _logger.LogInformation(
    "Creating order for userId={UserId} productId={ProductId} correlationId={CorrelationId}",
    command.UserId,
    command.ProductId,
    command.CorrelationId
  );

  try
  {
    await _validator.ValidateAsync(command, ct);
    var result = await _orderService.CreateAsync(command, ct);

    _logger.LogInformation(
      "Order created successfully orderId={OrderId} userId={UserId} correlationId={CorrelationId}",
      result.OrderId,
      command.UserId,
      command.CorrelationId
    );

    return Result.Ok();
  }
  catch (DomainException ex)
  {
    _logger.LogWarning(
      ex,
      "Order creation rejected userId={UserId} productId={ProductId} correlationId={CorrelationId}",
      command.UserId,
      command.ProductId,
      command.CorrelationId
    );
    return Result.Fail(ex.Code);
  }
}`;

const checklistSnippet = `[ ] Verificar que cada fallo tenga contexto util (userId, endpoint, correlationId)
[ ] Detectar logs ruidosos que no ayudan a diagnosticar
[ ] Revisar si los errores criticos quedan trazados
[ ] Confirmar trazabilidad entre request, servicio y excepcion`;

export default function Daily20Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/19";
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
            <Link className={styles.btn} href="/daily/19">
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
                <div className={styles.badge}>Daily #20 • Backend Foundations</div>
                <h2 className={styles.title}>Sin logs, estas ciego</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Observabilidad</span>
                  <span className={styles.chip}>Tag: Logs</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Los logs son los ojos del backend en produccion: sin ellos, diagnosticar es adivinar.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Sin logs utiles, no puedes entender fallos reales en produccion.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Un sistema puede parecer funcionando, pero sin observabilidad nadie sabe que esta pasando.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Usuario no pudo completar pedido y no puedes reproducir localmente.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Sin logs: no sabes endpoint, payload ni punto de fallo.</li>
                    <li>Con logs: ves request, validaciones, servicio y error exacto.</li>
                  </ul>

                  <pre>{weakLogSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Diseña logs para diagnosticar, no para llenar archivos.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Podre diagnosticar esto si falla en produccion?</li>
                    <li>Que informacion voy a necesitar?</li>
                    <li>Este log ayuda o solo agrega ruido?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>ILogger + logs estructurados con contexto util.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>ILogger para niveles y categorias.</li>
                    <li>Serilog para estructurar y enrutar logs.</li>
                    <li>Campos utiles: userId, orderId, correlationId.</li>
                  </ul>

                  <pre>{structuredLogSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Si nadie puede explicar un bug, suele faltar observabilidad.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Bugs que no se pueden explicar.</li>
                    <li>Problemas que desaparecen al reproducir.</li>
                    <li>Equipos que adivinan que paso.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      Un backend sin logs es un sistema que no puedes diagnosticar.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Los sistemas profesionales se disenan para entender que pasa cuando fallan.
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
                  <p>Dia 20 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> sin logs, diagnosticar fallos es adivinar.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> ILogger + logs estructurados con contexto.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> observabilidad debil impide resolver incidencias.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
