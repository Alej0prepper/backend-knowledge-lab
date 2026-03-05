"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const paymentFlowSnippet = `public async Task<Result> RegisterPaymentAsync(RegisterPaymentCommand command, CancellationToken ct)
{
  var order = await _orders.GetByIdAsync(command.OrderId, ct);
  if (order is null) return Result.Fail("ORDER_NOT_FOUND");
  if (order.Status == OrderStatus.Paid) return Result.Fail("ORDER_ALREADY_PAID");

  order.MarkAsPaid();
  await _orders.SaveAsync(order, ct);                // efecto 1: estado pedido
  await _inventory.ReserveAsync(order.Items, ct);    // efecto 2: inventario
  await _invoices.CreateAsync(order, ct);            // efecto 3: factura
  await _email.SendPaidAsync(order.CustomerEmail, ct); // efecto 4: email

  await _eventBus.PublishAsync(new OrderPaidEvent(order.Id), ct); // efecto 5: analitica/integraciones
  return Result.Ok();
}`;

const outboxSnippet = `// Patron recomendado: Outbox para side effects externos
// 1) Confirmas transaccion local (pedido + outbox)
// 2) Worker publica eventos/reintenta side effects`;

const checklistSnippet = `[ ] Validar que se ejecutan todas las consecuencias esperadas
[ ] Forzar fallo en un side effect y observar consistencia final
[ ] Repetir accion para detectar efectos duplicados
[ ] Revisar que efectos externos tengan reintento/control de idempotencia`;

export default function Daily18Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/17";
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
            <Link className={styles.btn} href="/daily/17">
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
                <div className={styles.badge}>Daily #18 • Backend Foundations</div>
                <h2 className={styles.title}>Side Effects: cuando una accion provoca otras</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Flujo</span>
                  <span className={styles.chip}>Tag: Side Effects</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  En backend casi ninguna accion es aislada: una operacion suele disparar varias consecuencias.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Un side effect es una consecuencia adicional de una accion principal.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    En sistemas reales, una accion de negocio rara vez hace una sola cosa.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Pago de usuario dispara cadena de efectos secundarios.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Marcar pedido como pagado.</li>
                    <li>Actualizar inventario.</li>
                    <li>Generar factura.</li>
                    <li>Enviar email.</li>
                    <li>Registrar evento para analitica.</li>
                  </ul>

                  <div className={styles.quote}>
                    El pago es la accion principal; todo lo demas son side effects controlados.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No valida solo la accion principal, tambien sus consecuencias.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que mas deberia ocurrir?</li>
                    <li>Que pasa si una de esas cosas falla?</li>
                    <li>Todas las consecuencias son obligatorias?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Orden, responsabilidad y manejo de fallos en cada efecto secundario.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Llamadas a otros servicios.</li>
                    <li>Publicacion de eventos.</li>
                    <li>Envio de notificaciones.</li>
                    <li>Actualizacion de otros datos.</li>
                  </ul>

                  <pre>{paymentFlowSnippet}</pre>
                  <pre>{outboxSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Muchos bugs aparecen cuando ocurre la accion pero no sus efectos.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Se ejecutan todas las consecuencias esperadas?</li>
                    <li>Que pasa si una consecuencia falla?</li>
                    <li>Se duplican side effects al repetir la accion?</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>En backend, una accion rara vez hace una sola cosa.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Los sistemas reales son cadenas de consecuencias controladas.
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
                  <p>Dia 18 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> una accion dispara multiples consecuencias.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> orden y control de side effects con responsabilidades claras.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> accion ejecutada sin efectos completos rompe consistencia.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
