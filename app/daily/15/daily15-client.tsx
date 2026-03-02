"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const happyPathSnippet = `// Solo happy path: fragil
public async Task<Guid> CreateOrderAsync(CreateOrderCommand command)
{
  var stock = await _stockRepository.GetBySkuAsync(command.Sku);
  stock.Reserve(command.Qty);

  await _paymentGateway.ChargeAsync(command.Payment);

  var order = Order.Create(command.CustomerId, command.Sku, command.Qty);
  await _orderRepository.SaveAsync(order);

  return order.Id;
}`;

const resilientSnippet = `public async Task<Result<Guid>> CreateOrderAsync(CreateOrderCommand command, CancellationToken ct)
{
  if (command is null) return Result.Fail<Guid>("REQUEST_NULL");
  if (command.Qty <= 0) return Result.Fail<Guid>("INVALID_QTY");

  await using var tx = await _db.Database.BeginTransactionAsync(ct);
  try
  {
    var stock = await _stockRepository.GetBySkuAsync(command.Sku, ct);
    if (stock is null) return Result.Fail<Guid>("SKU_NOT_FOUND");
    if (stock.Available < command.Qty) return Result.Fail<Guid>("OUT_OF_STOCK");

    using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
    timeoutCts.CancelAfter(TimeSpan.FromSeconds(3));

    var payment = await _paymentGateway.ChargeAsync(command.Payment, timeoutCts.Token);
    if (!payment.Accepted) return Result.Fail<Guid>("PAYMENT_REJECTED");

    stock.Reserve(command.Qty);
    var order = Order.Create(command.CustomerId, command.Sku, command.Qty);
    await _orderRepository.SaveAsync(order, ct);

    await tx.CommitAsync(ct);
    return Result.Ok(order.Id);
  }
  catch (OperationCanceledException)
  {
    await tx.RollbackAsync(ct);
    return Result.Fail<Guid>("PAYMENT_TIMEOUT");
  }
  catch (Exception)
  {
    await tx.RollbackAsync(ct);
    throw;
  }
}`;

const checklistSnippet = `[ ] Interrumpir requests en medio del flujo
[ ] Enviar nulls, campos vacios y valores fuera de rango
[ ] Forzar estados limite (sin stock, saldo insuficiente, timeout)
[ ] Repetir la misma request para detectar duplicaciones`;

export default function Daily15Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/14";
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
            <Link className={styles.btn} href="/daily/14">
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
                <div className={styles.badge}>Daily #15 • Backend Foundations</div>
                <h2 className={styles.title}>Happy Path vs Casos reales</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Testing</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  El backend profesional no se disena para cuando todo sale bien. Se disena para cuando algo sale mal.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>El happy path es solo el flujo ideal, no la realidad de produccion.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    El backend maduro optimiza para fallos, bordes y estados inesperados.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Happy path funciona; casos reales tensionan el sistema.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Happy path: hay stock, pago correcto, pedido creado.</li>
                    <li>Caso real: no hay stock, pago falla, usuario cancela, externo no responde.</li>
                  </ul>

                  <div className={styles.quote}>El backend real vive en los fallos, no en la demo ideal.</div>

                  <pre>{happyPathSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Primero diseña bordes y errores; despues el flujo feliz.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que pasa si falla?</li>
                    <li>Que pasa si viene null?</li>
                    <li>Que pasa si llega dos veces?</li>
                    <li>Que pasa si el servicio externo responde lento?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Validaciones, excepciones centralizadas, transacciones y timeouts.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Validaciones claras en entrada y dominio.</li>
                    <li>Manejo centralizado de excepciones.</li>
                    <li>Transacciones para evitar estados parciales.</li>
                    <li>Timeouts para llamadas externas.</li>
                    <li>Control de estados e idempotencia.</li>
                  </ul>

                  <pre>{resilientSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Si se rompe fuera del happy path, la arquitectura no esta madura.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Interrumpir requests.</li>
                    <li>Enviar datos inesperados.</li>
                    <li>Forzar estados limite.</li>
                    <li>Probar duplicaciones.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      Backend profesional no optimiza para cuando todo sale bien; optimiza para cuando algo sale mal.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Cuando piensas en bordes y no solo en el centro, ya estas en mentalidad backend real.
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
                  <p>Dia 15 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> fuera del happy path vive el backend real.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> validaciones + transacciones + excepciones + timeout.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> sistema fragil si solo funciona en flujo ideal.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
