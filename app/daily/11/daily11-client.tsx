"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const badCouplingSnippet = `// Alto acoplamiento: controller sabe demasiado
[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
  [HttpPost]
  public async Task<IActionResult> Create(CreateOrderRequest request)
  {
    using var db = new AppDbContext();

    // Regla de negocio en controller
    if (request.Items.Count == 0)
      return BadRequest("Items required");

    // Integracion externa directa
    var paymentResult = await new HttpClient().PostAsJsonAsync(
      "https://payments.local/pay", request.Payment);

    if (!paymentResult.IsSuccessStatusCode)
      return StatusCode(502);

    db.Orders.Add(new Order { CustomerId = request.CustomerId });
    await db.SaveChangesAsync();

    return Ok();
  }
}`;

const lowCouplingSnippet = `public interface IOrderRepository
{
  Task AddAsync(Order order, CancellationToken ct);
}

public interface IPaymentGateway
{
  Task<PaymentResult> ChargeAsync(PaymentRequest request, CancellationToken ct);
}

public class OrderService : IOrderService
{
  private readonly IOrderRepository _repo;
  private readonly IPaymentGateway _payments;

  public OrderService(IOrderRepository repo, IPaymentGateway payments)
  {
    _repo = repo;
    _payments = payments;
  }

  public async Task<Guid> CreateAsync(CreateOrderCommand command, CancellationToken ct)
  {
    if (command.Items.Count == 0)
      throw new DomainValidationException("Items required");

    var payment = await _payments.ChargeAsync(command.Payment, ct);
    if (!payment.Accepted)
      throw new BusinessRuleException("Payment rejected");

    var order = Order.Create(command.CustomerId, command.Items);
    await _repo.AddAsync(order, ct);

    return order.Id;
  }
}`;

const checklistSnippet = `[ ] Cambia acceso a datos y verifica si rompe reglas de negocio
[ ] Fuerza fallo en un modulo y revisa impacto en modulos no relacionados
[ ] Prueba componentes por separado con dobles (mocks/fakes)
[ ] Mide cuantas capas tocas para un cambio pequeno`;

export default function Daily11Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/10";
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
            <Link className={styles.btn} href="/daily/10">
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
                <div className={styles.badge}>Daily #11 • Backend Foundations</div>
                <h2 className={styles.title}>Acoplamiento: el enemigo silencioso del backend</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Acoplamiento</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Cuanto mas acoplado esta un sistema, mas fragil se vuelve ante cambios. Backend profesional reduce
                  dependencias innecesarias.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Acoplamiento = una parte depende demasiado de otra.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Cuando una pieza cambia y rompe varias mas, tienes acoplamiento alto.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo real</h3>
                    <p className={styles.sub}>Controller con DB, reglas, integraciones y formato: todo mezclado.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Accede directo a base de datos.</li>
                    <li>Llama servicios externos.</li>
                    <li>Contiene reglas de negocio.</li>
                    <li>Formatea la respuesta HTTP.</li>
                  </ul>

                  <div className={styles.quote}>Cambiar una cosa rompe tres mas: senal clara de alto acoplamiento.</div>

                  <pre>{badCouplingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Evalua si puede cambiar piezas sin romper todo el sistema.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Puedo cambiar la base de datos sin tocar logica?</li>
                    <li>Puedo cambiar API sin tocar dominio?</li>
                    <li>Puedo testear esta pieza aislada?</li>
                  </ul>

                  <div className={styles.callout}>
                    Backend profesional busca interfaces, separacion de capas y dependencias claras.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Servicios desacoplados por interfaces y controllers delgados.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Buenas senales: `IRepository`, `IService`, logica aislada.</li>
                    <li>Malas senales: `new DbContext()` en controller.</li>
                    <li>Malas senales: metodos gigantes que hacen todo.</li>
                    <li>Malas senales: clases que conocen demasiadas cosas.</li>
                  </ul>

                  <pre>{lowCouplingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Un pequeno cambio rompiendo muchas areas suele indicar acoplamiento.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Un cambio pequeno rompe varias funcionalidades.</li>
                    <li>Un bug en una parte afecta areas no relacionadas.</li>
                    <li>Cuesta aislar donde realmente fallo.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Backend profesional = bajo acoplamiento y responsabilidades claras.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Si detectas dependencias innecesarias, ya estas desarrollando criterio arquitectonico.
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
                  <p>Dia 11 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> alto acoplamiento vuelve fragil el sistema.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> interfaces + servicios + controllers delgados.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> cambios chicos rompen muchas areas.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
