"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const badApproachSnippet = `if (products.length === 0)
{
  return BadRequest("El pedido debe tener productos");
}

// Luego otro flujo interno crea Order sin validar...`;

const goodApproachSnippet = `public class Order
{
    private readonly List<OrderItem> _items = new();

    public static Order Create(IEnumerable<OrderItem> items)
    {
        var orderItems = items.ToList();

        if (orderItems.Count == 0)
            throw new DomainException("Un pedido no puede crearse sin productos");

        return new Order(orderItems);
    }

    private Order(List<OrderItem> items)
    {
        _items = items;
    }
}`;

const layersSnippet = `Controller -> valida formato
Domain -> valida reglas de negocio`;

const miniProjectSnippet = `Regla: el pedido debe tener al menos 1 producto

Mal diseno:
Controller valida
Service crea pedido sin validar

Buen diseno:
Order.Create(products)
  if vacio -> error`;

const checklistSnippet = `[ ] Probar endpoint normal con products vacio
[ ] Simular flujo interno sin controller
[ ] Verificar que Order.Create bloquea ambos casos
[ ] Confirmar que la regla vive en un unico lugar`;

export default function Daily41Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/40";
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
            <Link className={styles.btn} href="/daily/40">
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
                <div className={styles.createdAt}>09/04/2026</div>
                <div className={styles.badge}>Daily #41 • Backend Foundations</div>
                <h2 className={styles.title}>Validacion de dominio: proteger las reglas desde dentro</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Dominio</span>
                  <span className={styles.chip}>Tag: Reglas</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  No toda validacion vive en el controller: las reglas criticas deben defenderse dentro del dominio.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Las reglas importantes deben cumplirse siempre, sin importar el flujo.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Si una regla depende solo del endpoint, otro camino interno podria saltarsela.
                  </div>
                  <p>Ejemplo de regla: un pedido no puede crearse sin productos.</p>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Comparacion entre validar solo en entrada y validar en dominio.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal enfoque (solo controller)</h4>
                  <pre>{badApproachSnippet}</pre>

                  <h4>Buen enfoque (dominio protegido)</h4>
                  <pre>{goodApproachSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Define donde vive cada tipo de validacion.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Esta regla es critica para el negocio?</li>
                    <li>Debe cumplirse en cualquier flujo (HTTP, job, evento)?</li>
                    <li>Estoy confiando demasiado en el controller?</li>
                  </ul>
                  <pre>{layersSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET (claro)</h3>
                    <p className={styles.sub}>Servicio orquesta; entidad protege invariantes.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>
                      <code>OrderService</code> coordina caso de uso, pero delega reglas a <code>Order.Create(...)</code>.
                    </li>
                    <li>El controller valida formato del request (tipos, campos requeridos).</li>
                    <li>El dominio valida invariantes (estado y reglas de negocio).</li>
                  </ul>
                  <p>
                    Resultado: la misma regla se aplica igual en <code>{"POST /orders"}</code>, jobs o flujos internos.
                  </p>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas que la regla no dependa del endpoint.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>La regla se cumple en un endpoint pero falla en otro.</li>
                    <li>Cambios de comportamiento segun el camino de ejecucion.</li>
                    <li>Inconsistencias cuando entra por procesos internos.</li>
                  </ul>
                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Las reglas importantes viven en el nucleo, no en la periferia.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend junior valida en la entrada. Backend senior protege reglas desde el dominio.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Separar validacion de entrada y validacion de dominio.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: asegurar que la regla aplique en cualquier flujo.</p>
                  <pre>{miniProjectSnippet}</pre>

                  <p>Prueba mental:</p>
                  <ol className={styles.bullets}>
                    <li>Flujo A pasa por controller.</li>
                    <li>Flujo B es llamado interno.</li>
                    <li>Ambos deben fallar con productos vacios.</li>
                  </ol>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Identificar reglas de estado que tambien deban vivir en dominio.</li>
                    <li>Revisar pagos, permisos y transiciones criticas.</li>
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
                  <p>Dia 41 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> reglas criticas deben vivir en el dominio.
                </div>
                <div className={styles.li}>
                  <strong>.NET real:</strong> controller valida formato, entidad valida invariantes.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> probar la regla por endpoint y flujo interno.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
