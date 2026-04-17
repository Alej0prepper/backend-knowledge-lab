"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const noRepoProblemSnippet = `Entidad -> accede directamente a DB`;

const repositoryPurposeSnippet = `Order
User
Product`;

const repoInterfaceSnippet = `public interface IOrderRepository
{
    Task<Order?> GetByIdAsync(Guid id);
    Task SaveAsync(Order order);
}`;

const repoImplementationSnippet = `public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;

    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Order?> GetByIdAsync(Guid id)
    {
        return await _context.Orders
            .Include(o => o.Items)
            .Include(o => o.Payments)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task SaveAsync(Order order)
    {
        _context.Update(order);
        await _context.SaveChangesAsync();
    }
}`;

const aggregateUsageSnippet = `var order = await repo.GetByIdAsync(id);

order.AddItem(...);
order.Pay(...);

await repo.SaveAsync(order);`;

const notRepositorySnippet = `- clase llena de queries sin sentido
- servicio de base de datos generico
- lugar para logica de negocio`;

const badRepoSnippet = `public interface IUserRepository
{
    Task<List<User>> GetUsersByComplexFilterX(...);
}`;

const goodOperationsSnippet = `GetById
Save
ExistsByEmail`;

const testerChecklistSnippet = `[ ] Buscar logica de negocio en queries SQL
[ ] Verificar consistencia al guardar aggregates
[ ] Probar reglas antes y despues de persistir
[ ] Detectar multiples cargas inconsistentes del mismo dato`;

const miniFlowSnippet = `Controller
  -> Service
  -> Repository carga Order
  -> Order.AddItem()
  -> Repository guarda Order`;

export default function Daily47Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/46";
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
            <Link className={styles.btn} href="/daily/46">
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
                <div className={styles.createdAt}>17/04/2026</div>
                <div className={styles.badge}>Daily #47 • Backend Foundations</div>
                <h2 className={styles.title}>Repositories: como persistir el dominio sin contaminarlo</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>6-11 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: DDD</span>
                  <span className={styles.chip}>Tag: Repository</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  El dominio no debe saber como se guarda en base de datos. El Repository actua como puente con
                  infraestructura.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Entidades y aggregates no deben conocer persistencia.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Repository = puente entre dominio y base de datos.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema que resuelve</h3>
                    <p className={styles.sub}>Sin repository, se mezcla logica de dominio con acceso a datos.</p>
                  </div>
                  <span className={styles.chip}>Problema</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{noRepoProblemSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Acoplamiento fuerte.</li>
                    <li>Dificil de testear.</li>
                    <li>Logica mezclada con persistencia.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="what-does">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que hace un Repository</h3>
                    <p className={styles.sub}>Encapsula acceso a datos con objetos del dominio.</p>
                  </div>
                  <span className={styles.chip}>Rol</span>
                </div>
                <div className={styles.sbd}>
                  <p>En vez de pensar en SQL/EF, trabajas con:</p>
                  <pre>{repositoryPurposeSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No piensa en SELECT, piensa en cargar/agregar objetos de dominio.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <p>&quot;Voy a obtener un Order&quot; y el repository traduce eso a la base de datos.</p>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como se ve en .NET</h3>
                    <p className={styles.sub}>Interfaz en dominio, implementacion en infraestructura.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Interfaz (dominio)</h4>
                  <pre>{repoInterfaceSnippet}</pre>

                  <h4>Implementacion (infraestructura)</h4>
                  <pre>{repoImplementationSnippet}</pre>

                  <ul className={styles.bullets}>
                    <li>Dominio usa interfaces.</li>
                    <li>Infraestructura implementa con EF/SQL.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="aggregate-usage">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Uso con aggregates</h3>
                    <p className={styles.sub}>Se carga y guarda el aggregate completo.</p>
                  </div>
                  <span className={styles.chip}>Aggregate</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{aggregateUsageSnippet}</pre>
                  <p>No guardas partes sueltas; guardas el aggregate.</p>
                </div>
              </section>

              <section className={styles.section} id="not-repository">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Que NO es un Repository</h3>
                    <p className={styles.sub}>No es un cajon de queries ni logica de negocio.</p>
                  </div>
                  <span className={styles.chip}>Limites</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notRepositorySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="typical-error">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Error tipico</h3>
                    <p className={styles.sub}>Interfaces de repositorio con filtros de aplicacion.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badRepoSnippet}</pre>
                  <p>Eso suele ser logica de aplicacion o query service.</p>
                </div>
              </section>

              <section className={styles.section} id="rule">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Regla practica</h3>
                    <p className={styles.sub}>Exponer operaciones con sentido de dominio.</p>
                  </div>
                  <span className={styles.chip}>Regla</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{goodOperationsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas mezcla entre persistencia y reglas de negocio.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Logica de negocio incrustada en SQL/queries.</li>
                    <li>Resultados inconsistentes segun consulta.</li>
                    <li>Formas distintas de cargar el mismo agregado.</li>
                  </ul>
                  <pre>{testerChecklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>El dominio no debe saber de base de datos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend junior mezcla logica y persistencia. Backend senior las separa con repositories.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Entender el flujo completo del repository.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Endpoint ejemplo:</p>
                  <pre>{`POST /order/add-item`}</pre>

                  <p>Flujo:</p>
                  <pre>{miniFlowSnippet}</pre>

                  <p>Pregunta clave: quien accede a la DB?</p>
                  <ul className={styles.bullets}>
                    <li>Entity: no.</li>
                    <li>Domain Service: no.</li>
                    <li>Repository: si.</li>
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
                  <p>Dia 47 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> repository desacopla dominio de DB.
                </div>
                <div className={styles.li}>
                  <strong>.NET real:</strong> interfaz en dominio, EF en infraestructura.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> cargar/modificar/guardar aggregates por raiz.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
