"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "how", label: "3) Como ocurre" },
  { id: "types", label: "4) Tipos" },
  { id: "mindset", label: "5) Mentalidad backend" },
  { id: "signals", label: "6) Senales de riesgo" },
  { id: "dotnet", label: "7) .NET" },
  { id: "testing", label: "8) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const loginSnippet = `POST /login`;

const attackRateSnippet = `10,000 requests por segundo`;

const floodingSnippet = `GET /orders
GET /orders
GET /orders
...`;

const heavyEndpointSnippet = `GET /reports/heavy-query`;

const badDesignSnippet = `GET /users?include=everything`;

const dotnetSnippet = `public async Task<List<Order>> GetOrders()
{
    return await _context.Orders.ToListAsync();
}`;

const testerCase1Snippet = `llamar endpoint muchas veces`;
const testerCase2Snippet = `endpoint pesado repetido`;
const testerCase3Snippet = `muchos usuarios simultaneos`;

const miniProjectEndpointsSnippet = `GET /orders
GET /reports
GET /users`;

const concurrentSnippet = `1000 requests simultaneos`;

const classifySnippet = `seguro
riesgo medio
riesgo alto`;

export default function Daily59Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/58";
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
            <Link className={styles.btn} href="/daily/58">
              <span className={styles.kbd}>←</span> Dia 58
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
                <div className={styles.createdAt}>04/05/2026</div>
                <div className={styles.badge}>Daily #59 • Backend Foundations</div>
                <h2 className={styles.title}>Denegacion de servicio (DoS): como se tumba un backend</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: DoS</span>
                  <span className={styles.chip}>Tag: DDoS</span>
                  <span className={styles.chip}>Tag: Resiliencia</span>
                </div>

                <p className={styles.lead}>
                  No todos los ataques buscan entrar: algunos solo quieren que tu sistema deje de funcionar.
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
                    <p className={styles.sub}>Un backend correcto puede caer igual si no resiste volumen.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>DoS no busca acceso: busca indisponibilidad.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Saturar el sistema con solicitudes o cargas para degradarlo.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    DoS: ataque en el que se envian muchas solicitudes o cargas para hacer que el sistema sea lento o
                    deje de responder.
                  </div>
                  <ul className={styles.bullets}>
                    <li>DoS: una fuente atacante.</li>
                    <li>DDoS: multiples fuentes (botnet).</li>
                    <li>Para backend, el efecto es el mismo: saturacion.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="how">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como ocurre en la practica</h3>
                    <p className={styles.sub}>Un endpoint comun bajo volumen extremo rompe recursos compartidos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Ejemplo</h4>
                  <pre>{loginSnippet}</pre>
                  <p>Atacante:</p>
                  <pre>{attackRateSnippet}</pre>
                  <p>Resultado:</p>
                  <ul className={styles.bullets}>
                    <li>CPU al 100%.</li>
                    <li>Base de datos saturada.</li>
                    <li>Timeouts y usuarios reales fuera.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="types">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Tipos comunes de DoS (backend)</h3>
                    <p className={styles.sub}>No todo DoS es solo trafico alto: importa el costo por request.</p>
                  </div>
                  <span className={styles.chip}>Patrones</span>
                </div>
                <div className={styles.sbd}>
                  <h4>1) Flooding</h4>
                  <pre>{floodingSnippet}</pre>
                  <p>Volumen puro.</p>

                  <h4>2) Resource exhaustion</h4>
                  <pre>{heavyEndpointSnippet}</pre>
                  <p>Cada request cuesta mucho.</p>

                  <h4>3) Endpoint mal disenado</h4>
                  <pre>{badDesignSnippet}</pre>
                  <p>Carga excesiva por peticion.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No evaluar con 1 request, sino bajo concurrencia realista.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No: &quot;funciona con 1 request&quot;.</li>
                    <li>Si: &quot;que pasa con 10,000 requests simultaneos&quot;.</li>
                  </ul>
                  <div className={styles.quote}>Un endpoint lento es un arma en manos de un atacante.</div>
                </div>
              </section>

              <section className={styles.section} id="signals">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Senales de vulnerabilidad</h3>
                    <p className={styles.sub}>Patrones tecnicos que aumentan riesgo de saturacion.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Endpoints pesados sin proteccion.</li>
                    <li>Sin rate limiting.</li>
                    <li>Sin caching.</li>
                    <li>Queries lentas.</li>
                    <li>Operaciones sincronas bloqueantes.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como se ve en .NET</h3>
                    <p className={styles.sub}>Codigo correcto que puede colapsar bajo carga.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dotnetSnippet}</pre>
                  <p>Si hay millones de registros y muchas llamadas, este endpoint puede degradar todo el backend.</p>
                  <div className={styles.callout}>
                    Punto clave: no todos los endpoints deben poder ejecutarse ilimitadamente.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Pruebas para detectar degradacion antes de produccion.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Caso 1</h4>
                  <pre>{testerCase1Snippet}</pre>
                  <p>Pregunta: responde igual?</p>

                  <h4>Caso 2</h4>
                  <pre>{testerCase2Snippet}</pre>
                  <p>Pregunta: se degrada rapido?</p>

                  <h4>Caso 3</h4>
                  <pre>{testerCase3Snippet}</pre>
                  <p>Pregunta: aparecen timeouts?</p>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Objetivo: detectar endpoints vulnerables a DoS.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Paso 1 - Identifica endpoints</h4>
                  <pre>{miniProjectEndpointsSnippet}</pre>

                  <h4>Paso 2 - Pregunta clave</h4>
                  <p>Cual consume mas recursos?</p>

                  <h4>Paso 3 - Simulacion mental</h4>
                  <pre>{concurrentSnippet}</pre>
                  <p>Que pasa?</p>

                  <h4>Paso 4 - Clasifica</h4>
                  <pre>{classifySnippet}</pre>

                  <h4>Que protege contra DoS</h4>
                  <ul className={styles.bullets}>
                    <li>Rate limiting.</li>
                    <li>Caching.</li>
                    <li>Queries eficientes.</li>
                    <li>Colas y background jobs.</li>
                    <li>Timeouts.</li>
                    <li>Infraestructura (CDN, WAF).</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend junior piensa en funcionalidad. Backend senior piensa en resistencia.
                  </div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
