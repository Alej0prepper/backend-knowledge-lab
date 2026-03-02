"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const transactionSnippet = `public async Task<Guid> CreateOrderAsync(CreateOrderCommand command, CancellationToken ct)
{
  await using var tx = await _db.Database.BeginTransactionAsync(ct);

  try
  {
    var stock = await _db.Stocks.SingleAsync(x => x.Sku == command.Sku, ct);
    if (stock.Available < command.Qty) throw new InvalidOperationException("Insufficient stock");

    stock.Available -= command.Qty;

    var order = new Order(command.CustomerId, command.Sku, command.Qty, command.Amount);
    _db.Orders.Add(order);

    var payment = new Payment(order.Id, command.Amount, "registered");
    _db.Payments.Add(payment);

    await _db.SaveChangesAsync(ct);
    await tx.CommitAsync(ct);

    return order.Id;
  }
  catch
  {
    await tx.RollbackAsync(ct);
    throw;
  }
}`;

const checklistSnippet = `[ ] Fuerza error despues de descontar stock
[ ] Verifica que no exista pedido parcial
[ ] Verifica que el stock no quede descontado
[ ] Repite con timeout/cancelacion`;

export default function Daily7Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/6";
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
            <Link className={styles.btn} href="/daily/6">
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
                <div className={styles.badge}>Daily #7 • Backend Foundations</div>
                <h2 className={styles.title}>Transacciones: el backend protege la consistencia</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Consistencia</span>
                  <span className={styles.chip}>Tag: .NET</span>
                  <span className={styles.chip}>Tag: Transacciones</span>
                </div>

                <p className={styles.lead}>
                  Una transaccion significa: o todo ocurre correctamente, o no ocurre nada. Un backend profesional
                  protege el sistema contra estados intermedios corruptos.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>O todo ocurre correctamente, o no ocurre nada.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    El backend profesional protege el sistema contra estados intermedios corruptos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo real</h3>
                    <p className={styles.sub}>Crear pedido puede implicar varias operaciones criticas.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Descontar stock.</li>
                    <li>Crear pedido.</li>
                    <li>Registrar pago.</li>
                  </ul>

                  <div className={styles.quote}>
                    Si se descuenta stock y luego falla el guardado del pedido, sin transaccion queda inconsistente.
                    Con transaccion, haces rollback automatico.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No piensa solo en que funcione, piensa en que no rompa al fallar.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que pasa si falla en el paso 3?</li>
                    <li>El sistema queda en estado invalido?</li>
                    <li>Puedo revertir?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Consistencia con transaccion explicita y rollback en error.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    EF Core maneja transacciones por defecto en `SaveChanges()`, pero con multiples operaciones
                    criticas conviene agruparlas de forma explicita.
                  </div>

                  <pre>{transactionSnippet}</pre>

                  <ul className={styles.bullets}>
                    <li>`DbContext` con `SaveChanges()` dentro de transaccion.</li>
                    <li>`TransactionScope` para escenarios mas amplios.</li>
                    <li>Unit of Work implicito en EF Core.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Muchos bugs graves de produccion nacen justo aqui.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Forzar error a mitad del proceso.</li>
                    <li>Simular caida.</li>
                    <li>Cancelar request en medio de operacion.</li>
                  </ul>

                  <div className={styles.quote}>
                    Preguntate: el sistema quedo en estado raro? hay datos a medias?
                  </div>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>No solo ejecutes acciones; protege la integridad del sistema.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Cuando empiezas a pensar en que pasa si se rompe en el medio, subes de nivel real.
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
                  <p>Dia 7 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> o todo se confirma, o todo se revierte.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> `BeginTransactionAsync` + `CommitAsync` + `RollbackAsync`.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> estados intermedios corruptos si falla a mitad de flujo.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
