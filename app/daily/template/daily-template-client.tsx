"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "ejemplo", label: "2) Ejemplo" },
  { id: "mentalidad", label: "3) Mentalidad" },
  { id: "dotnet", label: "4) .NET" },
  { id: "testing", label: "5) Testing" },
  { id: "takeaway", label: "Takeaway" },
  { id: "mini-project", label: "Mini-proyecto" },
] as const;

const mainSnippet = `// TODO: snippet principal`;
const secondarySnippet = `// TODO: snippet secundario`;
const checklistSnippet = `[ ] Caso 1
[ ] Caso 2
[ ] Caso 3
[ ] Caso 4`;
const miniProjectSnippet = `// TODO: mini proyecto
if key in processedKeys:
  return processedKeys[key]

result = do_operation()
processedKeys[key] = result
return result`;

export default function DailyTemplateClient() {
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
            
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/previous">
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
                <div className={styles.createdAt}>DD/MM/AAAA</div>
                <div className={styles.badge}>Daily #XX • Backend Foundations</div>
                <h2 className={styles.title}>TITULO DE LA LECCION</h2>

               

                <p className={styles.lead}>Mensaje principal en 1 frase clara.</p>
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
                    <p className={styles.sub}>Concepto central en lenguaje simple.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Frase de impacto del tema.</div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo</h3>
                    <p className={styles.sub}>Escenario real donde se ve el problema y la solucion.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Punto clave 1.</li>
                    <li>Punto clave 2.</li>
                  </ul>
                  <pre>{mainSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Preguntas de criterio para tomar decisiones.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Pregunta 1?</li>
                    <li>Pregunta 2?</li>
                    <li>Pregunta 3?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Implementacion concreta aplicable.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Practica 1.</li>
                    <li>Practica 2.</li>
                    <li>Practica 3.</li>
                  </ul>
                  <pre>{secondarySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Pruebas clave para descubrir riesgos reales.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Riesgo 1.</li>
                    <li>Riesgo 2.</li>
                    <li>Riesgo 3.</li>
                  </ul>
                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Cierre en una frase accionable.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>Frase final memorable.</div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-15 min)</h3>
                    <p className={styles.sub}>Ejercicio opcional para aplicar el concepto del dia.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Objetivo: validar la idea en un caso pequeno.</li>
                    <li>Paso 1: simular estructura minima.</li>
                    <li>Paso 2: aplicar logica principal.</li>
                    <li>Paso 3: ejecutar prueba rapida y verificar resultado.</li>
                  </ul>
                  <pre>{miniProjectSnippet}</pre>
                </div>
              </section>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Resumen rapido</h2>
                  <p>Template en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> resumen del concepto.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> practica aplicada.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> error tipico a evitar.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
