"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const eventFlowSnippet = `OrderService crea pedido
OrderService publica OrderCreated
EmailHandler reacciona
InventoryHandler reacciona
AnalyticsHandler reacciona`;

const inProcessSnippet = `Se publica OrderCreatedEvent
-> el dispatcher busca handlers registrados
-> ejecuta SendEmailWhenOrderCreatedHandler
-> ejecuta UpdateInventoryWhenOrderCreatedHandler`;

const busSnippet = `Productor publica mensaje en cola o topico
Consumidor escucha continuamente (BackgroundService)
Cuando llega OrderCreated -> ejecuta logica del consumidor`;

const miniProjectSnippet = `Productor:
create_user()
publish(UserRegistered)

Consumidores:
EmailConsumer escucha UserRegistered
AnalyticsConsumer escucha UserRegistered`;

const checklistSnippet = `[ ] Verificar que se publique el evento correcto
[ ] Validar reaccion de cada consumidor por separado
[ ] Simular fallo de un consumidor y observar impacto
[ ] Confirmar que se pueden agregar nuevos consumidores sin tocar el productor`;

export default function Daily36Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/35";
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
            <Link className={styles.btn} href="/daily/35">
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
                <div className={styles.createdAt}>31/03/2026</div>
                <div className={styles.badge}>Daily #36 • Backend Foundations</div>
                <h2 className={styles.title}>Eventos: comunicar sin acoplar</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Event Driven</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Un evento no ordena acciones: comunica un hecho ocurrido para que consumidores interesados reaccionen.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Evento = algo que ya ocurrio y otros pueden escuchar.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>`UserRegistered`</li>
                    <li>`OrderCreated`</li>
                    <li>`PaymentCompleted`</li>
                  </ul>
                  <div className={styles.callout}>
                    El productor no dice a quien llamar; solo publica el hecho.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Se publica `OrderCreated` y varios componentes reaccionan.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Email envia confirmacion.</li>
                    <li>Inventario descuenta stock.</li>
                    <li>Analytics registra metrica.</li>
                  </ul>
                  <div className={styles.quote}>El creador del pedido no conoce a ninguno de esos consumidores.</div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Publica hechos, no encadena llamadas directas.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{`No ideal:
CreateOrder() -> SendEmail() -> UpdateInventory() -> SaveAnalytics()

Mejor:
CreateOrder()
Publish(OrderCreated)`}</pre>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET, mecanico</h3>
                    <p className={styles.sub}>Quien publica, quien escucha, como se entera y como reacciona.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Dentro del mismo proceso</h4>
                  <ul className={styles.bullets}>
                    <li>Productor publica evento en memoria.</li>
                    <li>Dispatcher busca handlers registrados por tipo de evento.</li>
                    <li>Handlers ejecutan su reaccion.</li>
                  </ul>
                  <pre>{inProcessSnippet}</pre>
                  <p>Suele implementarse con MediatR notifications, domain events o un dispatcher propio.</p>

                  <h4>Entre sistemas distintos</h4>
                  <ul className={styles.bullets}>
                    <li>Productor publica mensaje a RabbitMQ, Azure Service Bus o Kafka.</li>
                    <li>Consumidor corre como worker y escucha cola/topico continuamente.</li>
                    <li>Cuando llega mensaje, ejecuta su reaccion.</li>
                  </ul>
                  <pre>{busSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Validas publicacion de evento y reaccion independiente de consumidores.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Una accion dispara varias consecuencias.</li>
                    <li>Puedes agregar nuevo consumidor sin tocar endpoint original.</li>
                    <li>Fallo de una reaccion no siempre rompe operacion principal.</li>
                  </ul>
                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Evento publica un hecho; consumidores registrados o escuchando reaccionan.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{eventFlowSnippet}</pre>
                  <div className={styles.quote}>
                    Desacoplamiento real: productor publica y no conoce implementaciones de consumidores.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Entender como un consumidor se entera y reacciona a un evento.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: registrar consumidores para reaccionar sin llamadas directas.</p>
                  <p>Ejercicio:</p>
                  <pre>{miniProjectSnippet}</pre>
                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>La clave no es llamar funciones una por una.</li>
                    <li>La clave es registrar o conectar consumidores por tipo de evento.</li>
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
                  <p>Dia 36 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> evento publica hechos, no ordenes directas.
                </div>
                <div className={styles.li}>
                  <strong>.NET mecanico:</strong> dispatcher en memoria o consumidores escuchando cola/bus.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> modelar productor y consumidores para `UserRegistered`.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
