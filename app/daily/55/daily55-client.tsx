"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "problem", label: "3) Problema" },
  { id: "impact", label: "4) Impacto" },
  { id: "dotnet", label: "5) .NET" },
  { id: "testing", label: "6) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const badConfigSnippet = `{
  "ConnectionString": "Server=...;User=admin;Password=123456",
  "ApiKey": "abc123"
}`;

const badLocationsSnippet = `appsettings.json
repositorios publicos
commits antiguos
logs
variables hardcodeadas`;

const envSnippet = `ConnectionString = ENV["DB_CONNECTION"]`;

const userSecretsSnippet = `dotnet user-secrets`;

const badDotnetSnippet = `var apiKey = "abc123";`;

const goodDotnetSnippet = `var apiKey = configuration["ApiKey"];`;

const secureSourcesSnippet = `env variables
vault
config seguro`;

const testerSearchSnippet = `password
apikey
secret
connection`;

const classificationSnippet = `seguro
inseguro
critico`;

export default function Daily55Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/54";
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
            <Link className={styles.btn} href="/daily/54">
              <span className={styles.kbd}>←</span> Dia 54
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
                <div className={styles.createdAt}>27/04/2026</div>
                <div className={styles.badge}>Daily #55 • Backend Foundations</div>
                <h2 className={styles.title}>Secretos en backend: donde se rompen los sistemas</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Secrets</span>
                  <span className={styles.chip}>Tag: Config</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Muchos sistemas no caen por logica compleja. Caen porque alguien expuso una clave, token o
                  credencial.
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
                    <p className={styles.sub}>Un secreto expuesto puede saltarse toda tu logica de negocio.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Los sistemas no suelen caer por logica compleja. Caen porque alguien expuso un secreto.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Un secreto es cualquier dato que da acceso o control.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Un secreto es cualquier dato que permite acceso o control sobre el sistema.
                  </div>

                  <ul className={styles.bullets}>
                    <li>API keys.</li>
                    <li>Connection strings.</li>
                    <li>Tokens.</li>
                    <li>Credenciales.</li>
                    <li>Private keys.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El problema real</h3>
                    <p className={styles.sub}>El backend funciona, pero la configuracion quedo expuesta.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <p>Muchos proyectos terminan con secretos dentro de archivos versionados:</p>
                  <pre>{badConfigSnippet}</pre>

                  <div className={styles.quote}>Subir esto al repositorio es un problema critico.</div>
                </div>
              </section>

              <section className={styles.section} id="impact">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Por que es tan grave</h3>
                    <p className={styles.sub}>Con un secreto valido, el atacante no necesita vulnerar tu codigo.</p>
                  </div>
                  <span className={styles.chip}>Impacto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Si alguien obtiene un secreto, puede:</p>
                  <ul className={styles.bullets}>
                    <li>Acceder a la base de datos.</li>
                    <li>Usar APIs externas como si fueras tu.</li>
                    <li>Robar informacion.</li>
                    <li>Ejecutar acciones en tu nombre.</li>
                  </ul>

                  <div className={styles.callout}>
                    Muchos sistemas no son hackeados. Son simplemente expuestos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="locations">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Donde suelen estar mal ubicados</h3>
                    <p className={styles.sub}>El secreto casi siempre aparece en sitios faciles de revisar.</p>
                  </div>
                  <span className={styles.chip}>Superficie</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badLocationsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como deberia hacerse en .NET</h3>
                    <p className={styles.sub}>El codigo debe referenciar secretos, no contenerlos.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Variables de entorno</h4>
                  <pre>{envSnippet}</pre>

                  <h4>User Secrets en desarrollo</h4>
                  <pre>{userSecretsSnippet}</pre>

                  <h4>Azure Key Vault / Secret Manager en produccion</h4>
                  <p>Los secretos viven fuera del codigo y se inyectan por configuracion segura.</p>

                  <h4>Mal</h4>
                  <pre>{badDotnetSnippet}</pre>

                  <h4>Bien</h4>
                  <pre>{goodDotnetSnippet}</pre>

                  <p>Ese valor debe venir de:</p>
                  <pre>{secureSourcesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No basta con que funcione en local.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    No pregunta &quot;funciona?&quot;. Pregunta &quot;que pasa si alguien ve este repositorio?&quot;.
                  </div>
                  <div className={styles.callout}>
                    El codigo no debe contener secretos. Solo debe referenciarlos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como lo detectas como tester</h3>
                    <p className={styles.sub}>La busqueda textual descubre muchos fallos de practica.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Revisar repo</h4>
                  <pre>{testerSearchSnippet}</pre>

                  <h4>Revisar appsettings</h4>
                  <p>Hay credenciales, tokens o connection strings reales?</p>

                  <h4>Revisar logs</h4>
                  <p>Se imprimen secretos completos en errores, trazas o debug?</p>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>Error tipico</h3>
                    <p className={styles.sub}>Pensar que un secreto de desarrollo no importa.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Alerta</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>Es solo para desarrollo.</div>
                  <p>Luego se sube a git, se comparte o se despliega. El secreto deja de ser privado.</p>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Un secreto versionado es una puerta abierta.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>Un secreto expuesto es una puerta abierta.</div>
                  <div className={styles.quote}>
                    Backend junior guarda secretos en codigo. Backend senior los mantiene fuera del sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Detectar exposicion de secretos en un proyecto.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: encontrar secretos expuestos y clasificarlos por riesgo.</p>

                  <h4>Paso 1 - Busca</h4>
                  <pre>{testerSearchSnippet}</pre>

                  <h4>Paso 2 - Revisa</h4>
                  <p>Estan en codigo, appsettings, logs o commits antiguos?</p>

                  <h4>Paso 3 - Clasifica</h4>
                  <pre>{classificationSnippet}</pre>

                  <h4>Paso 4 - Pregunta clave</h4>
                  <p>Alguien externo podria usar esto?</p>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>Los secretos suelen estar visibles.</li>
                    <li>El problema no es tecnico, es de practica.</li>
                    <li>Es facil de detectar.</li>
                  </ul>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Tu proyecto tiene secretos en appsettings?</li>
                    <li>Estan versionados?</li>
                  </ul>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={styles.btn} href="/daily/54">
                      Dia 54
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
                  <p>Dia 55 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Regla:</strong> el codigo referencia secretos; no los guarda.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> una clave expuesta permite acceso sin romper tu logica.
                </div>
                <div className={styles.li}>
                  <strong>Accion:</strong> usar variables de entorno, User Secrets o vaults segun el entorno.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
