"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const whySnippet = `- involucra varias entidades
- necesita consultar fuera (DB/APIs)
- no encaja en un solo objeto`;

const badEntitySnippet = `User.Create(email)
  existe en DB?`;

const badControllerSnippet = `Controller valida email unico`;

const goodApproachSnippet = `UserDomainService
  verifica si email existe
  decide si se puede crear usuario`;

const userDomainServiceSnippet = `public class UserDomainService
{
    private readonly IUserRepository _userRepository;

    public UserDomainService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task ValidateEmailIsUnique(string email)
    {
        var exists = await _userRepository.ExistsByEmailAsync(email);

        if (exists)
            throw new InvalidOperationException("El email ya esta en uso.");
    }
}`;

const appServiceUsageSnippet = `public class UserService
{
    private readonly UserDomainService _domainService;
    private readonly IUserRepository _repository;

    public UserService(UserDomainService domainService, IUserRepository repository)
    {
        _domainService = domainService;
        _repository = repository;
    }

    public async Task CreateUser(string email)
    {
        await _domainService.ValidateEmailIsUnique(email);

        var user = User.Create(email);

        await _repository.SaveAsync(user);
    }
}`;

const orderRuleSnippet = `Un pedido no puede superar el credito disponible del usuario`;

const orderDomainServiceSnippet = `public class OrderDomainService
{
    public void ValidateCredit(User user, Order order)
    {
        if (order.Total > user.CreditLimit)
            throw new InvalidOperationException("Credito insuficiente.");
    }
}`;

const notDomainServiceSnippet = `- wrapper de repository
- helper utilitario sin reglas
- servicio generico sin negocio`;

const responsibilitiesSnippet = `Entidad -> protege su estado
Aggregate -> protege consistencia
Domain Service -> logica entre entidades/sistemas`;

const testerChecklistSnippet = `[ ] Buscar reglas duplicadas en varios servicios
[ ] Revisar si hay logica de negocio en controllers
[ ] Revisar entidades que consultan DB directamente
[ ] Probar reglas que cruzan varios modelos`;

const miniRuleOneSnippet = `un email no puede repetirse`;

const miniRuleTwoSnippet = `Order no puede superar credito del usuario`;

export default function Daily46Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/45";
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
            <Link className={styles.btn} href="/daily/45">
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
                <div className={styles.createdAt}>16/04/2026</div>
                <div className={styles.badge}>Daily #46 • Backend Foundations</div>
                <h2 className={styles.title}>Domain Services: cuando la logica no pertenece a una entidad</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>7-12 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: DDD</span>
                  <span className={styles.chip}>Tag: Domain Service</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Un Domain Service encapsula logica de negocio que no pertenece claramente a una sola entidad o
                  aggregate.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Hay reglas de dominio que viven entre entidades, no dentro de una sola.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Si una regla no pertenece a una sola entidad, probablemente pertenece a un Domain Service.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema que resuelve</h3>
                    <p className={styles.sub}>Reglas que cruzan objetos o requieren datos externos.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{whySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="email-example">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo simple</h3>
                    <p className={styles.sub}>Email unico en registro de usuario.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal en entidad</h4>
                  <pre>{badEntitySnippet}</pre>

                  <h4>Mal en controller</h4>
                  <pre>{badControllerSnippet}</pre>

                  <h4>Buen enfoque</h4>
                  <pre>{goodApproachSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Ubica la logica segun su naturaleza, no por comodidad.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Esta logica pertenece a una sola entidad?</li>
                    <li>Necesita consultar datos externos?</li>
                    <li>Involucra multiples aggregates?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet-user">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como se ve en .NET</h3>
                    <p className={styles.sub}>Domain Service para regla de email unico.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>UserDomainService</h4>
                  <pre>{userDomainServiceSnippet}</pre>

                  <h4>Uso desde Application Service</h4>
                  <pre>{appServiceUsageSnippet}</pre>

                  <ul className={styles.bullets}>
                    <li>Domain Service: logica de negocio.</li>
                    <li>Repository: acceso a datos.</li>
                    <li>Entidad: protege su estado.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="cross-entity">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Otro ejemplo claro</h3>
                    <p className={styles.sub}>Validar credito disponible en pedidos.</p>
                  </div>
                  <span className={styles.chip}>Caso cruzado</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{orderRuleSnippet}</pre>
                  <pre>{orderDomainServiceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="not-domain-service">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Que NO es un Domain Service</h3>
                    <p className={styles.sub}>No es un helper ni un wrapper sin negocio real.</p>
                  </div>
                  <span className={styles.chip}>Limites</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notDomainServiceSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="differences">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Diferencia importante</h3>
                    <p className={styles.sub}>Cada capa protege algo distinto del dominio.</p>
                  </div>
                  <span className={styles.chip}>Mapa mental</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{responsibilitiesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas reglas mal ubicadas y duplicadas.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Reglas duplicadas en varios lugares.</li>
                    <li>Logica de negocio en controllers.</li>
                    <li>Entidades consultando DB directamente.</li>
                  </ul>
                  <pre>{testerChecklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>La logica que cruza entidades suele vivir en Domain Service.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Si una regla no pertenece a una sola entidad, probablemente pertenece a un Domain Service.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Detectar cuando necesitas un Domain Service.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Regla 1:</p>
                  <pre>{miniRuleOneSnippet}</pre>
                  <p>No puede validarla sola la entidad porque necesita DB. Ubicacion correcta: `UserDomainService`.</p>

                  <p>Regla 2:</p>
                  <pre>{miniRuleTwoSnippet}</pre>
                  <p>Involucra dos entidades. Ubicacion correcta: Domain Service.</p>

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
                  <p>Dia 46 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> reglas compartidas van en Domain Service.
                </div>
                <div className={styles.li}>
                  <strong>.NET real:</strong> servicio de dominio + repositorio + entidad.
                </div>
                <div className={styles.li}>
                  <strong>Practica:</strong> detectar reglas que cruzan entidades o dependen de DB.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
