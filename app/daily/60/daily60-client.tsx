"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "example", label: "3) Ejemplo" },
  { id: "why", label: "4) Por que funciona" },
  { id: "mindset", label: "5) Mentalidad backend" },
  { id: "signals", label: "6) Senales de riesgo" },
  { id: "dotnet", label: "7) .NET" },
  { id: "protection", label: "8) Proteccion" },
  { id: "testing", label: "9) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const loginSnippet = `POST /login`;

const bruteListSnippet = `email: user@test.com
password: 123456
password: 1234567
password: password
password: admin123
...`;

const leakMessagesSnippet = `"user not found"
"wrong password"`;

const badDotnetSnippet = `public async Task Login(string email, string password)
{
    var user = await _repo.GetByEmail(email);

    if (user == null)
        return "Usuario no existe";

    if (!VerifyPassword(password))
        return "Contrasena incorrecta";
}`;

const genericResponseSnippet = `respuesta generica:
"Credenciales invalidas"`;

const rateLimitSnippet = `maximo 5 intentos por minuto`;

const temporaryBlockSnippet = `despues de 5 intentos -> bloquear usuario`;

const repeatedAttemptsSnippet = `login 20 veces seguidas`;

const conclusionSnippet = `seguro / vulnerable`;

export default function Daily60Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/59";
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
            <Link className={styles.btn} href="/daily/59">
              <span className={styles.kbd}>←</span> Dia 59
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
                <div className={styles.createdAt}>05/05/2026</div>
                <div className={styles.badge}>Daily #60 • Backend Foundations</div>
                <h2 className={styles.title}>Brute Force: romper autenticacion por repeticion</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Brute Force</span>
                  <span className={styles.chip}>Tag: Auth</span>
                  <span className={styles.chip}>Tag: Login</span>
                </div>

                <p className={styles.lead}>
                  Algunos ataques no son sofisticados: solo prueban miles de combinaciones hasta acertar.
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
                    <p className={styles.sub}>Brute force es repeticion automatizada hasta encontrar acceso.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Si puedes intentar login infinitamente, alguien lo hara.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Intentar muchas credenciales hasta encontrar una valida.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Brute Force: ataque donde se prueban muchas combinaciones de usuario/contrasena o tokens hasta
                    acertar.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo simple</h3>
                    <p className={styles.sub}>Un endpoint comun de login puede ser explotado por repeticion.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{loginSnippet}</pre>
                  <p>Atacante:</p>
                  <pre>{bruteListSnippet}</pre>
                  <p>Miles de intentos automatizados.</p>
                </div>
              </section>

              <section className={styles.section} id="why">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Por que funciona</h3>
                    <p className={styles.sub}>La ausencia de limites vuelve el ataque cuestion de tiempo.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No limitan intentos.</li>
                    <li>No bloquean temporalmente.</li>
                    <li>No aplican rate limiting.</li>
                  </ul>
                  <p>Se puede romper cuentas de usuario, admin, accesos internos y tokens debiles.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No solo validar login, sino controlar el numero de intentos.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No: &quot;el login funciona&quot;.</li>
                    <li>Si: &quot;cuantas veces pueden intentar entrar&quot;.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="signals">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Senales de vulnerabilidad</h3>
                    <p className={styles.sub}>Filtrar mensajes y no limitar intentos ayuda al atacante.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Login sin rate limiting.</li>
                    <li>Mensajes diferentes para usuario y contrasena.</li>
                  </ul>
                  <pre>{leakMessagesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Ejemplo en .NET (problema tipico)</h3>
                    <p className={styles.sub}>Respuestas especificas exponen informacion util para ataque.</p>
                  </div>
                  <span className={styles.chip}>.NET</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badDotnetSnippet}</pre>
                  <p>Esto filtra informacion y facilita ataques dirigidos.</p>
                  <h4>Buen enfoque</h4>
                  <pre>{genericResponseSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="protection">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como se protege</h3>
                    <p className={styles.sub}>Defensa por capas para reducir automatizacion y abuso.</p>
                  </div>
                  <span className={styles.chip}>Proteccion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>1) Rate limiting</h4>
                  <pre>{rateLimitSnippet}</pre>

                  <h4>2) Bloqueo temporal</h4>
                  <pre>{temporaryBlockSnippet}</pre>

                  <h4>3) Captcha (opcional)</h4>
                  <h4>4) Logging de intentos</h4>
                  <p>Permite detectar ataques temprano.</p>

                  <div className={styles.quote}>
                    Brute force no rompe tu codigo. Rompe tu falta de limites.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Pruebas para verificar limites, bloqueo y fuga de informacion.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Intentos repetidos</h4>
                  <pre>{repeatedAttemptsSnippet}</pre>
                  <p>Bloquea?</p>

                  <h4>Cambio de contrasenas</h4>
                  <p>Hay limite?</p>

                  <h4>Mensajes de error</h4>
                  <p>Revela si el usuario existe?</p>

                  <p>Resultado: sin limite o mensajes claros = vulnerable.</p>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Objetivo: detectar vulnerabilidad de brute force en login.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Endpoint</h4>
                  <pre>{loginSnippet}</pre>

                  <h4>Paso 1 - Simula ataques</h4>
                  <p>Multiples intentos seguidos.</p>

                  <h4>Paso 2 - Observa</h4>
                  <p>Bloquea?</p>

                  <h4>Paso 3 - Mensajes</h4>
                  <p>Distingue usuario vs contrasena?</p>

                  <h4>Paso 4 - Conclusion</h4>
                  <pre>{conclusionSnippet}</pre>

                  <div className={styles.quote}>
                    Backend junior implementa login. Backend senior protege el acceso.
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
