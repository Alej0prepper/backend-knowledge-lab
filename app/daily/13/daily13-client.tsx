"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "fat", label: "2) Fat Controller" },
  { id: "mentalidad", label: "3) Mentalidad" },
  { id: "dotnet", label: "4) .NET" },
  { id: "testing", label: "5) Testing" },
  { id: "takeaway", label: "Takeaway" },
] as const;

const fatControllerSnippet = `// Controller gordo: mezcla transporte + negocio + infraestructura
[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
  [HttpPost]
  public async Task<IActionResult> Create(CreateOrderDto dto)
  {
    if (dto.Items is null || dto.Items.Count == 0)
      return BadRequest("Items required");

    if (dto.Total > 1000 && string.IsNullOrWhiteSpace(dto.ManagerApproval))
      return BadRequest("Manager approval required");

    await using var db = new AppDbContext();
    var stock = await db.Stocks.SingleAsync(x => x.Sku == dto.Sku);
    if (stock.Available < dto.Quantity) return Conflict("No stock");

    var http = new HttpClient();
    var payment = await http.PostAsJsonAsync("https://payments.local/charge", dto.Payment);
    if (!payment.IsSuccessStatusCode) return StatusCode(502);

    stock.Available -= dto.Quantity;
    db.Orders.Add(new Order(dto.CustomerId, dto.Sku, dto.Quantity, dto.Total));
    await db.SaveChangesAsync();

    return Ok(new { message = "Created" });
  }
}`;

const thinControllerSnippet = `[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
  private readonly IOrderService _orderService;

  public OrdersController(IOrderService orderService) => _orderService = orderService;

  [HttpPost]
  public async Task<IActionResult> Create([FromBody] CreateOrderDto dto, CancellationToken ct)
  {
    var result = await _orderService.CreateAsync(dto, ct);
    return Ok(result);
  }
}`;

const checklistSnippet = `[ ] Revisa si hay logica duplicada en varios controllers
[ ] Compara endpoints parecidos para detectar inconsistencias
[ ] Verifica si reglas de negocio estan en servicios y no en controllers
[ ] Evalua si la misma logica funcionaria fuera de HTTP (job/evento)`;

export default function Daily13Client() {
  const [activeSection, setActiveSection] = useState<string>("idea");

  useEffect(() => {
    const sections = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/12";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(
    () => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`,
    [activeSection]
  );

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
            <Link className={styles.pill} href="/rest-lite">
              REST Lite
            </Link>
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/12">
              <span className={styles.kbd}>←</span> Dia 12
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="#idea">
              Empezar
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.badge}>Daily #13 • Backend Foundations</div>
                <h2 className={styles.title}>Fat Controllers vs Thin Controllers</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Controllers</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Un controller no es el cerebro del sistema: solo traduce HTTP al mundo interno. Backend profesional
                  prefiere controllers delgados.
                </p>
              </div>

              <nav className={styles.toc} aria-label="Indice">
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className={tocLinkClass(item.id)}>
                    {item.label}
                  </a>
                ))}
              </nav>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Controller gordo = mal diseno. Controller delgado = mejor arquitectura.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    El controller debe conectar HTTP con la aplicacion, no contener la logica de negocio.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="fat">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Que es un Fat Controller</h3>
                    <p className={styles.sub}>Mezcla validaciones, negocio, DB, integraciones y respuesta.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Difcil de testear.</li>
                    <li>Dificil de reutilizar.</li>
                    <li>Dificil de mantener.</li>
                  </ul>

                  <pre>{fatControllerSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>El controller ideal recibe, valida basico, delega y responde.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ol className={styles.bullets}>
                    <li>Recibe request.</li>
                    <li>Valida formato basico.</li>
                    <li>Llama a un servicio.</li>
                    <li>Devuelve resultado.</li>
                  </ol>

                  <div className={styles.quote}>
                    Si mañana cambias HTTP por un job o evento, la logica debe seguir funcionando.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Controller limpio y servicio con la logica.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Si un metodo de controller tiene 80 lineas, probablemente hay grasa.</div>
                  <pre>{thinControllerSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Inconsistencias entre rutas suelen indicar logica en lugar equivocado.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Bugs distintos en endpoints similares.</li>
                    <li>Logica duplicada en varios controllers.</li>
                    <li>Comportamientos inconsistentes entre rutas.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      El controller no decide reglas: conecta el mundo HTTP con el mundo interno.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Cuando ves controllers delgados, normalmente estas viendo arquitectura madura.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/12">
                      ← Dia 12
                    </Link>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/rest-lite#aprendizaje-diario">
                      REST Lite
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
                  <p>Dia 13 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> controller delgado, servicio fuerte.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> endpoint fino que delega en `IOrderService`.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> fat controllers generan duplicacion e inconsistencias.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
