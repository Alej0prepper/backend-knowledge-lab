"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const endpointsSnippet = `GET /users
POST /login
POST /orders
GET /orders/{id}`;

const classifySnippet = `Publico
Autenticado
Sensible`;

const dotnetSnippet = `[HttpGet("orders/{id}")]
public async Task<Order> GetOrder(Guid id)
{
    return await _service.GetOrder(id);
}`;

const securityQuestionsSnippet = `requiere [Authorize]?
valida que el usuario sea dueno?
puedo probar otros IDs?`;

const riskSignalsSnippet = `- endpoints sin [Authorize]
- endpoints que devuelven datos sin validar usuario
- endpoints con IDs en URL
- endpoints que aceptan input sin validar`;

const testerChecksSnippet = `[ ] acceder sin token
[ ] usar token de otro usuario
[ ] cambiar IDs manualmente
[ ] enviar datos inesperados`;

const miniEndpointsSnippet = `GET /users
POST /login
GET /orders/{id}`;

export default function Daily51Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/50";
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
            <Link className={styles.btn} href="/daily/50">
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
                <div className={styles.createdAt}>23/04/2026</div>
                <div className={styles.badge}>Daily #51 • Backend Foundations</div>
                <h2 className={styles.title}>Superficie de ataque: donde puede entrar un problema</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: API</span>
                  <span className={styles.chip}>Tag: Testing</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Antes de proteger un backend, necesitas mapear todos los puntos por donde alguien puede interactuar.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>No puedes proteger lo que no ves.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Superficie de ataque = todos los puntos de entrada donde un backend puede ser usado o abusado.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Incluye endpoints, inputs y entradas externas.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>
                    Superficie de ataque: conjunto de endpoints, inputs y entradas externas que pueden ser explotadas o
                    usadas incorrectamente.
                  </p>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo simple</h3>
                    <p className={styles.sub}>Cada endpoint es una puerta de entrada.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{endpointsSnippet}</pre>
                  <p>Todos estos endpoints forman parte de la superficie de ataque.</p>
                </div>
              </section>

              <section className={styles.section} id="common-mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>4. El error comun</h3>
                    <p className={styles.sub}>&quot;Solo protejo lo importante&quot; deja huecos peligrosos.</p>
                  </div>
                  <span className={styles.chip}>Error tipico</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>Un endpoint &quot;simple&quot; tambien puede usarse para atacar.</div>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No ve solo funcionalidad: ve puntos de entrada que pueden abusarse.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Todo endpoint es una puerta. Algunas estan cerradas. Otras, no.</div>
                </div>
              </section>

              <section className={styles.section} id="sensitive-endpoint">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que hace sensible a un endpoint</h3>
                    <p className={styles.sub}>Algunos endpoints son mas criticos por su impacto.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Maneja datos sensibles.</li>
                    <li>Modifica estado.</li>
                    <li>Depende de identidad.</li>
                    <li>Accede a recursos de otros usuarios.</li>
                  </ul>
                  <p>Ejemplo: que pasa si cambian el ID en `GET /orders/&#123;id&#125;`?</p>
                </div>
              </section>

              <section className={styles.section} id="dotnet-view">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como se ve en .NET</h3>
                    <p className={styles.sub}>Endpoint funcional, pero con preguntas de seguridad obligatorias.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dotnetSnippet}</pre>
                  <h4>Preguntas de seguridad</h4>
                  <pre>{securityQuestionsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="risk-signals">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Senales de riesgo</h3>
                    <p className={styles.sub}>Patrones rapidos para detectar problemas.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{riskSignalsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como lo detectas como tester</h3>
                    <p className={styles.sub}>No necesitas hackear: necesitas explorar.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{testerChecksSnippet}</pre>
                  <p>Estas pruebas exploran la superficie de ataque real del sistema.</p>
                </div>
              </section>

              <section className={styles.section} id="insight">
                <div className={styles.shd}>
                  <div>
                    <h3>Insight importante</h3>
                    <p className={styles.sub}>Seguridad aplicada empieza por observar puntos de entrada.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Insight</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    No necesitas &quot;hackear&quot;. Solo usar el sistema como un usuario curioso.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Primero visibilidad, luego proteccion.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>Backend senior no solo construye endpoints: mapea superficie de ataque.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Mapear superficie de ataque basica en tu API.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Paso 1 - Lista endpoints</h4>
                  <pre>{miniEndpointsSnippet}</pre>

                  <h4>Paso 2 - Marca riesgos</h4>
                  <ul className={styles.bullets}>
                    <li>Tiene `[Authorize]`?</li>
                    <li>Devuelve datos sensibles?</li>
                    <li>Usa ID en URL?</li>
                  </ul>

                  <h4>Paso 3 - Clasifica</h4>
                  <pre>{classifySnippet}</pre>

                  <h4>Paso 4 - Pregunta clave</h4>
                  <p>Cual probarias primero si quisieras romper algo?</p>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>No todos los endpoints son iguales.</li>
                    <li>Algunos son mucho mas criticos.</li>
                    <li>Necesitas visibilidad antes de proteger.</li>
                  </ul>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Tu API tiene endpoints olvidados?</li>
                    <li>Hay endpoints antiguos sin proteccion?</li>
                  </ul>

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
                  <p>Dia 51 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Superficie:</strong> todos los puntos de entrada de tu backend.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> endpoints simples tambien pueden ser explotados.
                </div>
                <div className={styles.li}>
                  <strong>Accion:</strong> mapear, clasificar y probar antes de confiar.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
