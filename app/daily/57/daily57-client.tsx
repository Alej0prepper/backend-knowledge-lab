"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "mindset", label: "3) Mentalidad" },
  { id: "checklist", label: "4) Checklist" },
  { id: "real-life", label: "5) Vida real" },
  { id: "tester", label: "6) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const keyQuestionSnippet = `este usuario puede acceder a ESTE recurso?`;

const idorSnippet = `/orders/1 -> /orders/2`;

const secretsSnippet = `password
apikey
connection`;

const quickStartSnippet = `1. endpoints
2. probar auth
3. cambiar IDs
4. romper inputs`;

const prioritySnippet = `critico -> acceso a datos
alto -> secretos
medio -> errores`;

const endpointListSnippet = `GET /users
GET /orders/{id}
POST /login`;

const checklistMiniSnippet = `- tiene auth?
- puedo cambiar ID?
- devuelve errores internos?
- hay secretos visibles?`;

export default function Daily57Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/56";
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
            <Link className={styles.btn} href="/daily/56">
              <span className={styles.kbd}>←</span> Dia 56
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
                <div className={styles.createdAt}>30/04/2026</div>
                <div className={styles.badge}>Daily #57 • Backend Foundations</div>
                <h2 className={styles.title}>Checklist real: como evaluar la seguridad de una API en minutos</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: API</span>
                  <span className={styles.chip}>Tag: Checklist</span>
                  <span className={styles.chip}>Tag: Auditoria</span>
                </div>

                <p className={styles.lead}>
                  Auditar seguridad no es magia. Es metodo, curiosidad y criterio para detectar riesgos rapido.
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
                    <p className={styles.sub}>Unir piezas sueltas en una herramienta practica para auditar rapido.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Un checklist mental permite detectar riesgos sin revisar todo el sistema.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Verificaciones rapidas para detectar problemas graves en poco tiempo.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Checklist de seguridad: conjunto de verificaciones rapidas que detectan riesgos sin analizar toda la
                    arquitectura en profundidad.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Buscar senales de riesgo rapido: eficiencia por encima de perfeccion.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    No piensa &quot;reviso todo el codigo&quot;. Piensa &quot;donde estan las senales de riesgo&quot;.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="checklist">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Checklist en 7 pasos</h3>
                    <p className={styles.sub}>La nueva herramienta para auditorias express de APIs.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Guia</span>
                </div>
                <div className={styles.sbd}>
                  <h4>1) Superficie de ataque</h4>
                  <ul className={styles.bullets}>
                    <li>Que endpoints existen?</li>
                    <li>Hay endpoints sin `Authorize`?</li>
                    <li>Hay endpoints olvidados?</li>
                  </ul>

                  <h4>2) Autenticacion</h4>
                  <ul className={styles.bullets}>
                    <li>Sin token: bloquea?</li>
                    <li>Token invalido: bloquea?</li>
                    <li>Token expirado: bloquea?</li>
                  </ul>

                  <h4>3) Autorizacion</h4>
                  <p>No basta con autenticar. Debes validar acceso al recurso concreto.</p>
                  <pre>{keyQuestionSnippet}</pre>

                  <h4>4) IDOR</h4>
                  <p>Cambiar IDs y validar aislamiento de datos.</p>
                  <pre>{idorSnippet}</pre>

                  <h4>5) Secretos</h4>
                  <p>Buscar en appsettings, repositorio y codigo:</p>
                  <pre>{secretsSnippet}</pre>

                  <h4>6) Errores</h4>
                  <ul className={styles.bullets}>
                    <li>Forzar null e input invalido.</li>
                    <li>Evitar stack traces o mensajes internos al cliente.</li>
                  </ul>

                  <h4>7) Integraciones externas</h4>
                  <ul className={styles.bullets}>
                    <li>Confia ciegamente en datos externos?</li>
                    <li>Valida input de APIs terceras?</li>
                    <li>Maneja certificados correctamente?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="real-life">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como usarlo en la vida real</h3>
                    <p className={styles.sub}>Empieza por pruebas de riesgo rapido, no por lectura exhaustiva.</p>
                  </div>
                  <span className={styles.chip}>Practico</span>
                </div>
                <div className={styles.sbd}>
                  <p>Secuencia recomendada para los primeros 30-60 minutos:</p>
                  <pre>{quickStartSnippet}</pre>
                  <p>Con esto sueles detectar el 80% de problemas graves.</p>

                  <h4>Insight importante</h4>
                  <div className={styles.quote}>La seguridad no empieza con herramientas. Empieza con preguntas correctas.</div>
                </div>
              </section>

              <section className={styles.section} id="tester">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como lo detectas como tester</h3>
                    <p className={styles.sub}>No necesitas acceso total ni todo el codigo para encontrar fallos reales.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No necesitas acceso completo.</li>
                    <li>No necesitas revisar toda la base de codigo.</li>
                    <li>Solo necesitas un metodo de pruebas claro.</li>
                  </ul>

                  <div className={styles.quote}>Auditar seguridad no es magia. Es metodo + curiosidad + criterio.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (10 min)</h3>
                    <p className={styles.sub}>Simular una auditoria rapida sobre cualquier API.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Paso 1 - Lista endpoints</h4>
                  <pre>{endpointListSnippet}</pre>

                  <h4>Paso 2 - Aplica checklist</h4>
                  <pre>{checklistMiniSnippet}</pre>

                  <h4>Paso 3 - Detecta un problema</h4>
                  <p>Siempre suele aparecer al menos uno.</p>

                  <h4>Paso 4 - Prioriza</h4>
                  <pre>{prioritySnippet}</pre>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>No necesitas analizar todo.</li>
                    <li>Puedes detectar riesgos rapidamente.</li>
                    <li>El valor esta en saber donde mirar.</li>
                  </ul>

                  <h4>Nivel siguiente</h4>
                  <ul className={styles.bullets}>
                    <li>Hacer mini auditorias reales.</li>
                    <li>Documentar findings con prioridad.</li>
                    <li>Crear reportes utiles para el equipo.</li>
                  </ul>

                  <div className={styles.quote}>Backend junior prueba funcionalidades. Backend senior evalua riesgos.</div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={styles.btn} href="/daily/56">
                      Dia 56
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
                  <p>Dia 57 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Regla:</strong> primero preguntas correctas, despues herramientas.
                </div>
                <div className={styles.li}>
                  <strong>Metodo:</strong> 7 pasos para auditar seguridad en 30-60 minutos.
                </div>
                <div className={styles.li}>
                  <strong>Resultado:</strong> detectar y priorizar riesgos reales sin revisar todo.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
