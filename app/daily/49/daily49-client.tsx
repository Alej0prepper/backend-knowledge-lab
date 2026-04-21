"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const orchestrationSnippet = `Controller -> Application Service -> Dominio`;

const heavyControllerSnippet = `Controller:
    valida
    crea pedido
    agrega items
    guarda en DB`;

const appServiceSnippet = `public class OrderService
{
    private readonly IOrderRepository _repository;

    public OrderService(IOrderRepository repository)
    {
        _repository = repository;
    }

    public async Task CreateOrder(Guid orderId, List<(Guid productId, int qty, decimal price)> items)
    {
        var order = new Order(orderId);

        foreach (var item in items)
        {
            order.AddItem(item.productId, item.qty, item.price);
        }

        order.Confirm();

        await _repository.SaveAsync(order);
    }
}`;

const controllerSnippet = `[HttpPost]
public async Task<IActionResult> CreateOrder(CreateOrderRequest request)
{
    await _orderService.CreateOrder(request.Id, request.Items);

    return Ok();
}`;

const payOrderSnippet = `public async Task PayOrder(Guid orderId)
{
    var order = await _repository.GetByIdAsync(orderId);

    if (order is null)
        throw new Exception("No encontrado");

    order.Pay(order.Total);

    await _repository.SaveAsync(order);
}`;

const notAppServiceSnippet = `- logica compleja de dominio
- validacion de invariantes
- acceso directo a DB sin repository`;

const yesAppServiceSnippet = `- orquestar operaciones
- llamar aggregates
- coordinar multiples pasos
- manejar Unit of Work (SaveChanges)`;

const testerChecklistSnippet = `[ ] Revisar controllers con logica excesiva
[ ] Validar consistencia entre endpoints
[ ] Detectar flujos duplicados
[ ] Probar casos de uso de punta a punta`;

const miniResponsibilitiesSnippet = `Controller -> recibe request
Service -> crea flujo
Order -> valida reglas
Repository -> guarda`;

const miniFlowSnippet = `Controller
    ->
Service
    ->
Order.Create()
    ->
Repository.Save()`;

const keyQuestionSnippet = `reglas -> dominio
flujo -> service
HTTP -> controller`;

export default function Daily49Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/48";
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
            <Link className={styles.btn} href="/daily/48">
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
                <div className={styles.createdAt}>21/04/2026</div>
                <div className={styles.badge}>Daily #49 • Backend Foundations</div>
                <h2 className={styles.title}>Application Services: donde orquestas todo</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>6-11 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: DDD</span>
                  <span className={styles.chip}>Tag: Application Service</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  El Application Service orquesta el flujo completo del caso de uso sin mezclar reglas de dominio con
                  transporte HTTP.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Ya no solo necesitas reglas: necesitas orquestacion del flujo.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Application Service = orquesta el caso de uso completo.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que problema resuelve</h3>
                    <p className={styles.sub}>Evita controladores pesados y flujos duplicados.</p>
                  </div>
                  <span className={styles.chip}>Problema</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Logica en controllers.</li>
                    <li>Logica duplicada.</li>
                    <li>Flujo desordenado.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="what-does">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que hace realmente</h3>
                    <p className={styles.sub}>Coordina pasos, llama al dominio y maneja persistencia del caso de uso.</p>
                  </div>
                  <span className={styles.chip}>Rol</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orchestrationSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Llama al dominio.</li>
                    <li>Usa repositories.</li>
                    <li>Maneja transacciones / SaveChanges.</li>
                    <li>Define el flujo del caso de uso.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="simple-example">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Ejemplo simple</h3>
                    <p className={styles.sub}>Caso de uso: crear pedido.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal enfoque (controller pesado)</h4>
                  <pre>{heavyControllerSnippet}</pre>
                  <p>Demasiada responsabilidad en una sola capa.</p>

                  <h4>Buen enfoque</h4>
                  <pre>{orchestrationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dotnet-view">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como se ve en .NET</h3>
                    <p className={styles.sub}>Application Service separado del Controller.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Application Service</h4>
                  <pre>{appServiceSnippet}</pre>

                  <h4>Controller</h4>
                  <pre>{controllerSnippet}</pre>

                  <ul className={styles.bullets}>
                    <li>Controller: entrada HTTP.</li>
                    <li>Application Service: flujo.</li>
                    <li>Dominio: reglas.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="not-do">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que NO debe hacer</h3>
                    <p className={styles.sub}>No debe reemplazar el dominio ni saltarse infraestructura.</p>
                  </div>
                  <span className={styles.chip}>Limites</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notAppServiceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="yes-do">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Que si debe hacer</h3>
                    <p className={styles.sub}>Orquestar el caso de uso completo de forma coherente.</p>
                  </div>
                  <span className={styles.chip}>Buenas practicas</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{yesAppServiceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="full-example">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Ejemplo mas completo</h3>
                    <p className={styles.sub}>Caso de uso: pagar pedido.</p>
                  </div>
                  <span className={styles.chip}>Caso real</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{payOrderSnippet}</pre>
                  <p>El service no inventa reglas: ejecuta el flujo usando reglas del dominio.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Parte del caso de uso y reparte responsabilidades por capa.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Cual es el flujo del caso de uso?</li>
                    <li>Que pasos hay que ejecutar?</li>
                    <li>Que objetos intervienen?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas flujos repetidos o inconsistentes entre endpoints.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Controllers con demasiada logica.</li>
                    <li>Reglas inconsistentes entre endpoints.</li>
                    <li>Flujos duplicados.</li>
                  </ul>
                  <pre>{testerChecklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>El Application Service contiene el flujo que usa las reglas.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend junior mete logica en controllers. Backend senior separa flujo, dominio e infraestructura.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Separar correctamente controller, service y dominio.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Endpoint ejemplo:</p>
                  <pre>{`POST /order`}</pre>

                  <h4>Paso 1 - Define responsabilidades</h4>
                  <pre>{miniResponsibilitiesSnippet}</pre>

                  <h4>Paso 2 - Flujo mental</h4>
                  <pre>{miniFlowSnippet}</pre>

                  <h4>Paso 3 - Pregunta clave</h4>
                  <pre>{keyQuestionSnippet}</pre>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>Cada capa tiene su rol.</li>
                    <li>Reduces acoplamiento.</li>
                    <li>El sistema queda mas mantenible.</li>
                  </ul>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Tus controllers hacen demasiado?</li>
                    <li>Tienes logica repetida en endpoints?</li>
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
                  <p>Dia 49 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> Application Service orquesta el caso de uso.
                </div>
                <div className={styles.li}>
                  <strong>Separacion:</strong> HTTP en controller, flujo en service, reglas en dominio.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> menos duplicacion y mas mantenibilidad.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
