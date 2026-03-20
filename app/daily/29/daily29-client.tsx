"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const versioningSnippet = `// Ejemplo de versionado por URL
[ApiController]
[Route("api/v1/[controller]")]
public class OrdersControllerV1 : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { version = "v1" });
}

[ApiController]
[Route("api/v2/[controller]")]
public class OrdersControllerV2 : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { version = "v2" });
}`;

const checklistSnippet = `[ ] Validar que v1 sigue funcionando sin cambios
[ ] Validar nuevas mejoras en v2
[ ] Revisar que no haya cambios incompatibles sin version
[ ] Comprobar comunicacion de deprecacion`;

export default function Daily29Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/28";
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
            <Link className={styles.btn} href="/daily/28">
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
                <div className={styles.createdAt}>20/03/2026</div>
                <div className={styles.badge}>Daily #29 • Backend Foundations</div>
                <h2 className={styles.title}>Versionado de API: cambiar sin romper</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: API Design</span>
                  <span className={styles.chip}>Tag: Contracts</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Las APIs evolucionan, pero el cambio profesional protege la compatibilidad con clientes existentes.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>El reto no es cambiar; es cambiar sin romper integraciones.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Versionar API permite evolucionar el contrato sin afectar a quienes dependen de versiones previas.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Cambiar `name` por `fullName` rompe clientes si no versionas.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>`GET /users` devolvia `&#123;&quot;name&quot;:&quot;Alejandro&quot;&#125;`.</li>
                    <li>
                      Al cambiar a `&#123;&quot;fullName&quot;:&quot;Alejandro Alvarez&quot;&#125;`, el frontend
                      puede romperse.
                    </li>
                    <li>Con versionado, v1 se mantiene estable y v2 introduce cambios.</li>
                  </ul>

                  <div className={styles.quote}>Buen enfoque: `GET /v1/users` y `GET /v2/users`.</div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Analiza impacto contractual antes de cambiar un endpoint.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Este cambio rompe el contrato actual?</li>
                    <li>Hay clientes activos en la version vigente?</li>
                    <li>Debo mantener compatibilidad hacia atras?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>ASP.NET Core permite versionado por URL, header o query.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Lo mas simple: versionado por URL (`/api/v1/...`, `/api/v2/...`).</li>
                    <li>Alternativas: version por header o query parameter.</li>
                    <li>Definir estrategia unica para toda la API.</li>
                  </ul>

                  <pre>{versioningSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Un cambio sin versionado puede romper integraciones en silencio.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Detectar endpoints con comportamiento cambiado sin aviso.</li>
                    <li>Probar que v1 siga funcionando igual.</li>
                    <li>Validar mejoras en v2 sin afectar clientes previos.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Versionar es disenar para el futuro sin romper el presente.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend profesional evoluciona rapido, pero respeta a quienes ya dependen de su API.
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
                  <p>Dia 29 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> cambiar sin versionar rompe contratos.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> versionado por URL suele ser el enfoque mas simple.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> integraciones rotas por cambios incompatibles.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
