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

const internalErrorSnippet = `NullReferenceException at OrderService.cs line 45`;

const badCatchSnippet = `catch (Exception ex)
{
    return BadRequest(ex.Message);
}`;

const badDotnetSnippet = `return BadRequest(ex.Message);`;

const goodDotnetSnippet = `return StatusCode(500, "Ha ocurrido un error");`;

const loggingSnippet = `_logger.LogError(ex, "Error en procesamiento de pedido");`;

const sqlErrorSnippet = `SQL Exception: table Users not found`;

const exceptionHandlerSnippet = `app.UseExceptionHandler("/error");`;

const safePatternSnippet = `mensaje generico + logging interno`;

const endpointSnippet = `POST /orders`;

const brokenRequestSnippet = `null
datos invalidos
estructura incorrecta`;

const classificationSnippet = `seguro -> mensaje generico
inseguro -> detalles tecnicos`;

export default function Daily56Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/55";
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
            <Link className={styles.btn} href="/daily/55">
              <span className={styles.kbd}>←</span> Dia 55
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
                <div className={styles.createdAt}>28/04/2026</div>
                <div className={styles.badge}>Daily #56 • Backend Foundations</div>
                <h2 className={styles.title}>Manejo de errores: como filtras informacion sin darte cuenta</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Error Handling</span>
                  <span className={styles.chip}>Tag: Logging</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Los errores no solo rompen funcionalidades. Tambien pueden revelar informacion sensible del sistema.
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
                    <p className={styles.sub}>Un error mal manejado puede explicar como funciona tu sistema.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Los errores no solo rompen funcionalidades. Tambien pueden revelar informacion sensible.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>La filtracion ocurre cuando el backend devuelve detalles internos.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Filtracion de informacion: ocurre cuando el backend devuelve datos internos que ayudan a entender
                    como funciona el sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo simple</h3>
                    <p className={styles.sub}>Un mensaje tecnico puede revelar estructura, nombres y ubicaciones.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{internalErrorSnippet}</pre>
                  <p>Esto revela:</p>
                  <ul className={styles.bullets}>
                    <li>Estructura interna.</li>
                    <li>Nombres de clases.</li>
                    <li>Ubicacion del codigo.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>4. El problema real</h3>
                    <p className={styles.sub}>Devolver `ex.Message` al cliente suele filtrar demasiado.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badCatchSnippet}</pre>
                  <div className={styles.quote}>MAL: el cliente recibe detalles internos de una excepcion.</div>
                </div>
              </section>

              <section className={styles.section} id="impact">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Por que es peligroso</h3>
                    <p className={styles.sub}>Cada detalle tecnico reduce el trabajo del atacante.</p>
                  </div>
                  <span className={styles.chip}>Impacto</span>
                </div>
                <div className={styles.sbd}>
                  <p>El atacante puede aprender:</p>
                  <ul className={styles.bullets}>
                    <li>Nombres de tablas.</li>
                    <li>Rutas internas.</li>
                    <li>Logica del sistema.</li>
                    <li>Tecnologia usada.</li>
                  </ul>

                  <h4>Ejemplo real peligroso</h4>
                  <pre>{sqlErrorSnippet}</pre>
                  <p>Ahora sabe que existe una tabla Users, que hay acceso a DB y que el fallo viene de SQL.</p>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como deberia hacerse en .NET</h3>
                    <p className={styles.sub}>Separa lo que ve el usuario de lo que registras internamente.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal</h4>
                  <pre>{badDotnetSnippet}</pre>

                  <h4>Bien</h4>
                  <pre>{goodDotnetSnippet}</pre>

                  <h4>Log interno</h4>
                  <pre>{loggingSnippet}</pre>

                  <div className={styles.callout}>El cliente no necesita saber que fallo internamente.</div>
                </div>
              </section>

              <section className={styles.section} id="pattern">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Buen patron muy usado</h3>
                    <p className={styles.sub}>Un middleware global centraliza respuestas seguras y logging.</p>
                  </div>
                  <span className={styles.chip}>Patron</span>
                </div>
                <div className={styles.sbd}>
                  <h4>En .NET</h4>
                  <pre>{exceptionHandlerSnippet}</pre>
                  <p>Y devuelves:</p>
                  <pre>{safePatternSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como piensa un backend developer</h3>
                    <p className={styles.sub}>El objetivo no es esconder el error; es controlar lo que revela.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    No piensa &quot;quiero ayudar al frontend con errores detallados&quot;. Piensa &quot;que informacion
                    estoy exponiendo?&quot;.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Fuerza errores y observa si aparecen detalles internos.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Forzar errores</h4>
                  <ul className={styles.bullets}>
                    <li>Enviar null.</li>
                    <li>Enviar datos invalidos.</li>
                    <li>Usar endpoints incorrectos.</li>
                  </ul>

                  <h4>Observar respuesta</h4>
                  <p>Busca stack traces, nombres de clases, queries SQL o rutas internas.</p>

                  <h4>Resultado</h4>
                  <ul className={styles.bullets}>
                    <li>Si ves detalles internos: filtracion.</li>
                    <li>Si ves mensaje generico: correcto.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Error tipico</h3>
                    <p className={styles.sub}>Pensar que esto solo pasa en desarrollo.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Alerta</span>
                </div>
                <div className={styles.sbd}>
                  <p>El problema aparece cuando:</p>
                  <ul className={styles.bullets}>
                    <li>Se despliega igual.</li>
                    <li>Se filtra en logs.</li>
                    <li>Queda expuesto en staging.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="insight">
                <div className={styles.shd}>
                  <div>
                    <h3>Insight importante</h3>
                    <p className={styles.sub}>Un error seguro protege; un error tecnico enseña.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Insight</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Un error bien manejado protege. Un error mal manejado enseña como atacarte.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Los errores tambien son una superficie de ataque.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>Los errores tambien son una superficie de ataque.</div>
                  <div className={styles.quote}>
                    Backend junior muestra errores. Backend senior controla lo que revela.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Detectar filtracion de informacion en respuestas de error.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: romper un request y revisar si la API revela informacion interna.</p>

                  <h4>Endpoint</h4>
                  <pre>{endpointSnippet}</pre>

                  <h4>Paso 1 - Rompe el request</h4>
                  <pre>{brokenRequestSnippet}</pre>

                  <h4>Paso 2 - Observa respuesta</h4>
                  <p>Ves detalles internos?</p>

                  <h4>Paso 3 - Clasifica</h4>
                  <pre>{classificationSnippet}</pre>

                  <h4>Paso 4 - Pregunta clave</h4>
                  <p>Un atacante aprende algo util aqui?</p>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>Los errores dicen mucho.</li>
                    <li>Ayudan a entender el sistema.</li>
                    <li>Deben controlarse cuidadosamente.</li>
                  </ul>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Tu API devuelve `exception.Message`?</li>
                    <li>Ves stack traces en responses?</li>
                  </ul>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={styles.btn} href="/daily/55">
                      Dia 55
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
                  <p>Dia 56 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Regla:</strong> el cliente recibe mensajes genericos; el detalle vive en logs internos.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> stack traces, rutas, clases o SQL revelan como atacar el sistema.
                </div>
                <div className={styles.li}>
                  <strong>Accion:</strong> usar middleware global de errores y logging seguro.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
