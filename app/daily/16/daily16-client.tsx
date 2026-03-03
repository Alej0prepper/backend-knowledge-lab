"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const badSnippet = `// Diseno debil: cambio de estado sin reglas
order.Status = OrderStatus.Shipped;
await _orders.SaveAsync(order);`;

const stateMachineSnippet = `public enum OrderStatus
{
  Created,
  Paid,
  Shipped,
  Cancelled
}

public class Order
{
  public OrderStatus Status { get; private set; } = OrderStatus.Created;

  public void MarkAsPaid()
  {
    if (Status == OrderStatus.Cancelled)
      throw new DomainException("Cancelled orders cannot be paid");
    if (Status != OrderStatus.Created)
      throw new DomainException("Only created orders can be paid");

    Status = OrderStatus.Paid;
  }

  public void Ship()
  {
    if (Status != OrderStatus.Paid)
      throw new DomainException("Only paid orders can be shipped");

    Status = OrderStatus.Shipped;
  }

  public void Cancel()
  {
    if (Status == OrderStatus.Shipped)
      throw new DomainException("Shipped orders cannot be cancelled");

    Status = OrderStatus.Cancelled;
  }
}`;

const checklistSnippet = `[ ] Intentar cancelar un pedido enviado
[ ] Intentar pagar un pedido cancelado
[ ] Intentar pagar dos veces el mismo pedido
[ ] Validar que no existan retrocesos de estado no permitidos`;

export default function Daily16Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/15";
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
            <Link className={styles.btn} href="/daily/15">
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
                <div className={styles.badge}>Daily #16 • Backend Foundations</div>
                <h2 className={styles.title}>Estados: todo en backend es una maquina de estados</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Dominio</span>
                  <span className={styles.chip}>Tag: Estados</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Muchos sistemas no fallan por codigo malo. Fallan por no controlar bien estados y transiciones.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>
                      Un backend serio trata entidades importantes como maquinas de estados.
                    </p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    El problema no es guardar datos: es garantizar transiciones validas entre estados.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Un pedido solo puede avanzar por transiciones permitidas.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Estados tipicos: Creado, Pagado, Enviado, Cancelado.</li>
                    <li>No puedes enviar si no esta pagado.</li>
                    <li>No puedes pagar si esta cancelado.</li>
                    <li>No puedes cancelar si ya fue enviado.</li>
                  </ul>

                  <div className={styles.quote}>Esto no es infraestructura. Es logica central del sistema.</div>

                  <pre>{badSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No cambia un campo Status sin modelar reglas de transicion.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Desde que estados puedo llegar aqui?</li>
                    <li>Que transiciones estan permitidas?</li>
                    <li>Estoy validando correctamente cada cambio?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Enums claros y metodos explicitos para cambiar estado.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Services validan estado antes de modificar.</li>
                    <li>Enums bien definidos.</li>
                    <li>Metodos explicitos: MarkAsPaid, Cancel, Ship.</li>
                  </ul>

                  <pre>{stateMachineSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Los bugs graves suelen venir de transiciones no controladas.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Poder cancelar algo enviado.</li>
                    <li>Poder pagar dos veces.</li>
                    <li>Poder retroceder estados sin control.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      Backend profesional no cambia datos al azar. Cambia estados de forma controlada.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Cuando piensas en flujos y transiciones, ya estas entendiendo arquitectura real.
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
                  <p>Dia 16 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> controla transiciones, no solo valores.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> enum + metodos explicitos con reglas.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> estados invalidos rompen flujos criticos.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
