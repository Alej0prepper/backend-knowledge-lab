"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "problem", label: "3) Problema" },
  { id: "dotnet", label: "4) .NET" },
  { id: "types", label: "5) Tipos" },
  { id: "testing", label: "6) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const exampleLimitSnippet = `100 requests por minuto por usuario`;

const abuseSnippet = `usuario -> 10 requests normales
atacante -> 10,000 requests por segundo`;

const loginSnippet = `POST /login`;

const fixedLimiterSnippet = `builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("fixed", config =>
    {
        config.PermitLimit = 100;
        config.Window = TimeSpan.FromMinutes(1);
        config.QueueLimit = 0;
    });
});`;

const applyLimiterSnippet = `app.UseRateLimiter();

[EnableRateLimiting("fixed")]
public class OrdersController : ControllerBase
{
}`;

const endpointTableSnippet = `/login  -> muy bajo (5-10/min)
/orders -> medio
/health -> alto
/search -> controlado`;

const limitTypesSnippet = `Fixed window   -> 100 requests por minuto
Sliding window -> mas preciso, evita picos
Token bucket   -> permite rafagas controladas`;

const testerScriptSnippet = `llamar endpoint muchas veces seguidas`;

const expectedSnippet = `429 Too Many Requests`;

const miniProjectLoadSnippet = `50 requests en 10 segundos`;

export default function Daily58Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/57";
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
            <Link className={styles.btn} href="/daily/57">
              <span className={styles.kbd}>←</span> Dia 57
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
                <div className={styles.createdAt}>01/05/2026</div>
                <div className={styles.badge}>Daily #58 • Backend Foundations</div>
                <h2 className={styles.title}>Rate Limiting: controlar cuantas veces te pueden llamar</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Rate Limiting</span>
                  <span className={styles.chip}>Tag: DoS</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Tu backend puede ser correcto y aun asi caerse si no limitas el volumen de peticiones.
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
                    <p className={styles.sub}>No basta con logica correcta: tambien debes resistir abuso.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Un sistema sin limites es un sistema facil de tumbar.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Limitar cuantas solicitudes puede hacer un cliente por periodo.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Rate Limiting: tecnica para limitar cuantas solicitudes puede hacer un cliente en un periodo de
                    tiempo.
                  </div>
                  <h4>Ejemplo</h4>
                  <pre>{exampleLimitSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El problema real</h3>
                    <p className={styles.sub}>Ataques simples de volumen pueden saturar CPU, DB y API.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{abuseSnippet}</pre>
                  <p>Resultado sin limites:</p>
                  <ul className={styles.bullets}>
                    <li>CPU saturada.</li>
                    <li>DB colapsada.</li>
                    <li>API caida.</li>
                  </ul>

                  <h4>Que protege realmente</h4>
                  <ul className={styles.bullets}>
                    <li>Abuso de endpoints.</li>
                    <li>Scraping masivo.</li>
                    <li>Brute force.</li>
                    <li>Ataques de volumen.</li>
                    <li>Errores de clientes (loops infinitos).</li>
                  </ul>

                  <div className={styles.quote}>
                    Un backend senior no solo pregunta si el endpoint funciona. Pregunta que pasa si lo llaman 10,000
                    veces.
                  </div>

                  <h4>Ejemplo simple</h4>
                  <pre>{loginSnippet}</pre>
                  <p>Sin limite: intentos infinitos de password. Con limite: maximo 5 intentos por minuto.</p>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Usar middleware de Rate Limiting y aplicarlo por endpoint.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Configurar limitador fijo</h4>
                  <pre>{fixedLimiterSnippet}</pre>

                  <h4>Aplicar a endpoints</h4>
                  <pre>{applyLimiterSnippet}</pre>

                  <div className={styles.callout}>No todos los endpoints necesitan el mismo limite.</div>

                  <h4>Diferenciacion recomendada</h4>
                  <pre>{endpointTableSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="types">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Tipos de rate limiting</h3>
                    <p className={styles.sub}>No necesitas dominarlos hoy, pero debes conocerlos.</p>
                  </div>
                  <span className={styles.chip}>Modelos</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{limitTypesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como lo detectas como tester</h3>
                    <p className={styles.sub}>La prueba es simple: volumen alto en poco tiempo.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Script mental</h4>
                  <pre>{testerScriptSnippet}</pre>

                  <h4>Resultado esperado</h4>
                  <pre>{expectedSnippet}</pre>

                  <h4>Si no bloquea</h4>
                  <p>La API queda vulnerable a abuso.</p>

                  <h4>Error tipico</h4>
                  <p>
                    Pensar que esto solo lo maneja infraestructura (NGINX, Cloudflare). Puede ayudar, pero el backend
                    tambien debe protegerse.
                  </p>

                  <div className={styles.quote}>Rate limiting no es optimizacion. Es defensa.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Detectar falta de proteccion contra abuso en un endpoint critico.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Endpoint sugerido</h4>
                  <pre>{loginSnippet}</pre>

                  <h4>Paso 1 - Simula carga</h4>
                  <pre>{miniProjectLoadSnippet}</pre>

                  <h4>Paso 2 - Pregunta clave</h4>
                  <ul className={styles.bullets}>
                    <li>Bloquea: correcto.</li>
                    <li>Sigue aceptando: problema.</li>
                  </ul>

                  <h4>Paso 3 - Identifica riesgo</h4>
                  <p>Lista endpoints criticos sin limite configurado.</p>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>No todos los ataques son inteligentes.</li>
                    <li>Muchos ataques son solo volumen.</li>
                    <li>Es facil de prevenir con reglas claras.</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Tu API ya tiene rate limiting?</li>
                    <li>Que endpoint seria mas facil de abusar hoy?</li>
                  </ul>

                  <div className={styles.quote}>Backend junior optimiza rendimiento. Backend senior protege contra abuso.</div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={styles.btn} href="/daily/57">
                      Dia 57
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
                  <p>Dia 58 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> sin limites, cualquier endpoint puede caerse por volumen.
                </div>
                <div className={styles.li}>
                  <strong>Defensa:</strong> limites distintos por tipo de endpoint.
                </div>
                <div className={styles.li}>
                  <strong>Prueba:</strong> si no responde 429 ante abuso, hay vulnerabilidad.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
