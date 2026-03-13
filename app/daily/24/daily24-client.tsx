"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const nPlusOneSnippet = `// Mal enfoque: consulta extra por cada pedido
var orders = await _db.Orders.ToListAsync(ct);

var result = new List<OrderDto>();
foreach (var order in orders)
{
  var customer = await _db.Customers
    .SingleAsync(x => x.Id == order.CustomerId, ct);

  result.Add(new OrderDto(order.Id, customer.Name, order.Total));
}`;

const optimizedSnippet = `// Buen enfoque: una sola consulta optimizada
var result = await _db.Orders
  .Include(x => x.Customer)
  .Select(x => new OrderDto(
    x.Id,
    x.Customer.Name,
    x.Total
  ))
  .ToListAsync(ct);`;

const checklistSnippet = `[ ] Medir tiempo con 10, 100 y 1000 registros
[ ] Revisar cantidad real de queries generadas
[ ] Detectar loops que disparan consultas adicionales
[ ] Comparar Include/Select contra carga perezosa`;

export default function Daily24Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/23";
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
            <Link className={styles.btn} href="/daily/23">
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
                <div className={styles.badge}>Daily #24 • Backend Foundations</div>
                <h2 className={styles.title}>N+1 Queries: un problema silencioso de rendimiento</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Performance</span>
                  <span className={styles.chip}>Tag: ORM</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  El problema N+1 no rompe la logica, pero degrada mucho el rendimiento cuando los datos crecen.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Muchas consultas pequenas suelen ser peores que una consulta eficiente.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    N+1 significa que una consulta inicial dispara muchas adicionales innecesarias.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Pedir pedidos y luego cargar cliente por cada uno.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>1 query para pedidos.</li>
                    <li>1 query extra por cada pedido para su cliente.</li>
                    <li>Con 100 pedidos: 101 consultas.</li>
                  </ul>

                  <div className={styles.quote}>
                    Funciona correctamente, pero el costo escala muy mal cuando crece la cantidad de datos.
                  </div>

                  <pre>{nPlusOneSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No solo mira que datos obtiene; mira cuantas consultas necesita.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Cuantas consultas estoy haciendo realmente?</li>
                    <li>Puedo traer todo en una sola query?</li>
                    <li>Estoy cargando relaciones de forma eficiente?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Entity Framework suele mostrar este problema con lazy loading y loops.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Lazy loading puede ocultar queries extras.</li>
                    <li>Consultas dentro de loops suelen ser mala senal.</li>
                    <li>Include y Select ayudan a optimizar.</li>
                  </ul>

                  <pre>{optimizedSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>El problema aparece cuando el volumen crece, no siempre en desarrollo.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Endpoints lentos con muchos registros.</li>
                    <li>Tiempo que crece mucho al aumentar datos.</li>
                    <li>Rapido en local, lento en produccion.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      Un backend eficiente piensa en cuantas consultas hace, no solo en los datos que obtiene.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Muchas veces el rendimiento depende mas de como preguntas que de la base de datos misma.
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
                  <p>Dia 24 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> N+1 degrada rendimiento con consultas innecesarias.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> Include y Select evitan loops con queries extras.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> todo funciona, pero escala muy mal.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
