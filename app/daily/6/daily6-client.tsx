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
] as const;

export default function Daily6Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/5";
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
            <Link className={styles.pill} href="/rest">
              REST ATLAS
            </Link>
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/5">
              <span className={styles.kbd}>←</span> Dia 5
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
                <div className={styles.badge}>Daily #6 • Backend Foundations</div>
                <h2 className={styles.title}>El backend no &quot;hace cosas&quot;, orquesta cosas</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Orquestacion</span>
                  <span className={styles.chip}>.NET</span>
                </div>

                <p className={styles.lead}>
                  Un backend senior no intenta hacerlo todo solo. Coordina responsabilidades para que el flujo sea
                  consistente incluso cuando hay fallos parciales.
                </p>

                <div className={styles.jump}>
                  <a className={`${styles.btn} ${styles.primary}`} href="#idea">
                    Empezar
                  </a>
                  <a className={styles.btn} href="#takeaway">
                    Idea final
                  </a>
                  <Link className={styles.btn} href="/rest-lite#aprendizaje-diario">
                    Ver en REST Lite
                  </Link>
                </div>
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
                    <p className={styles.sub}>Backend profesional = orquestacion de piezas, no codigo monolitico.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Coordina reglas, datos y servicios externos para producir un resultado consistente.
                  </div>
                  <div className={styles.quote}>
                    El backend no inventa nada. <strong>Orquesta componentes</strong>.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo real</h3>
                    <p className={styles.sub}>Crear un pedido suele ser un flujo de varias dependencias.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Validar usuario</li>
                    <li>Verificar stock</li>
                    <li>Calcular precio</li>
                    <li>Aplicar descuentos</li>
                    <li>Guardar en base de datos</li>
                    <li>Enviar evento</li>
                    <li>Notificar</li>
                  </ul>

                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No mete todo en un metodo. Disena responsabilidades claras.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Piensa en orden, dependencias y fallos parciales.</div>
                  <ul className={styles.bullets}>
                    <li>Quien es responsable de cada parte?</li>
                    <li>Que depende de que?</li>
                    <li>Que pasa si falla una parte?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Flujo tipico para coordinar bien el dominio y la infraestructura.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{`Controller
  -> Application Service
     -> Repositories
     -> Servicios externos
  -> Transaccion`}</pre>

                  <div className={styles.quote}>
                    Si un metodo de aplicacion tiene 200 lineas haciendo todo, hay falta de orquestacion limpia.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Muchos bugs aparecen por el orden de ejecucion, no por una sola regla.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Fallo una pieza puntual?</li>
                    <li>O fallo la coordinacion entre piezas?</li>
                    <li>Se guardo algo antes de validar una condicion critica?</li>
                  </ul>

                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Subir de nivel es pensar en sistema, no en funciones sueltas.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    <strong>Un backend senior escribe codigo para coordinar responsabilidades.</strong>
                  </div>

                  <div className={styles.footerNav} id="next">
                    <Link className={styles.btn} href="/daily/5">
                      ← Dia 5
                    </Link>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/rest-lite">
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
                  <p>Lo esencial del Dia 6.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.mini}>
                  <div className={styles.k}>
                    Idea en 1 frase <span className={`${styles.chip} ${styles.chipOk}`}>clave</span>
                  </div>
                  <div className={styles.v}>Backend = coordinacion clara de piezas con responsabilidades pequenas.</div>
                </div>

                <div className={styles.li}>
                  <strong>Riesgo comun:</strong> metodo gigante que valida, guarda, notifica y publica eventos junto.
                </div>
                <div className={styles.li}>
                  <strong>Deteccion:</strong> bugs por orden incorrecto de pasos.
                </div>
                <div className={styles.li}>
                  <strong>En .NET:</strong> Controller -&gt; App Service -&gt; repos/servicios externos.
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Checklist (30s)</h2>
                  <p>Para aplicarlo hoy mismo.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>✅ Cada pieza tiene una sola responsabilidad?</div>
                <div className={styles.li}>✅ El flujo de orquestacion tiene orden explicito?</div>
                <div className={styles.li}>✅ Si falla un paso, el sistema queda consistente?</div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
