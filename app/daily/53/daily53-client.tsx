"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "broken-access", label: "3) Bug grave" },
  { id: "dotnet", label: "4) .NET" },
  { id: "types", label: "5) Tipos" },
  { id: "testing", label: "6) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const endpointSnippet = `GET /orders/{id}`;

const wrongRuleSnippet = `si usuario esta autenticado -> permitir acceso`;

const rightQuestionSnippet = `este usuario tiene acceso a ESTE recurso?`;

const wrongDotnetSnippet = `[Authorize]
public async Task<Order> GetOrder(Guid id)
{
    return await _service.GetOrder(id);
}`;

const correctDotnetSnippet = `[Authorize]
public async Task<Order> GetOrder(Guid id)
{
    var order = await _service.GetOrder(id);

    if (order.UserId != CurrentUser.Id)
        throw new UnauthorizedAccessException();

    return order;
}`;

const changeIdSnippet = `/orders/1 -> /orders/2`;

const sensitiveActionSnippet = `DELETE /users/{id}`;

const authFormulaSnippet = `usuario + recurso + accion`;

export default function Daily53Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/52";
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
            <Link className={styles.btn} href="/daily/52">
              <span className={styles.kbd}>←</span> Dia 52
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
                <div className={styles.createdAt}>25/04/2026</div>
                <div className={styles.badge}>Daily #53 • Backend Foundations</div>
                <h2 className={styles.title}>Autorizacion: quien puede hacer que</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Access Control</span>
                  <span className={styles.chip}>Tag: API</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Autenticacion dice quien eres. Autorizacion decide que puedes hacer sobre un recurso concreto.
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
                    <p className={styles.sub}>Ya validaste quien es el usuario; ahora debes decidir que puede hacer.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Autorizacion es verificar si un usuario autenticado tiene permiso para realizar una accion o
                    acceder a un recurso.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>El permiso real depende del contexto, no solo del login.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>Autorizacion responde una pregunta mas precisa que autenticacion:</p>
                  <pre>{rightQuestionSnippet}</pre>
                  <p>La formula practica siempre combina:</p>
                  <pre>{authFormulaSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="broken-access">
                <div className={styles.shd}>
                  <div>
                    <h3>3. El error mas comun y peligroso</h3>
                    <p className={styles.sub}>Confundir usuario autenticado con usuario autorizado.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <p>El backend vulnerable suele razonar asi:</p>
                  <pre>{wrongRuleSnippet}</pre>
                  <div className={styles.quote}>Estar autenticado no significa tener permiso.</div>

                  <h4>Ejemplo real</h4>
                  <pre>{endpointSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Usuario A pide /orders/1.</li>
                    <li>Usuario B prueba /orders/1.</li>
                    <li>Si ambos pueden verlo, hay una vulnerabilidad de Broken Access Control.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>[Authorize] valida autenticacion, pero no ownership del recurso.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Incorrecto</h4>
                  <pre>{wrongDotnetSnippet}</pre>
                  <p>Aqui solo validas que hay un usuario autenticado.</p>

                  <h4>Correcto</h4>
                  <pre>{correctDotnetSnippet}</pre>
                  <p>Ahora validas autorizacion: este recurso pertenece al usuario actual.</p>
                </div>
              </section>

              <section className={styles.section} id="types">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Tipos de autorizacion</h3>
                    <p className={styles.sub}>Roles y propiedad resuelven problemas distintos.</p>
                  </div>
                  <span className={styles.chip}>Modelos</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Basada en roles</h4>
                  <ul className={styles.bullets}>
                    <li>Admin puede borrar usuarios.</li>
                    <li>User no puede borrar usuarios.</li>
                  </ul>

                  <h4>Basada en propiedad</h4>
                  <ul className={styles.bullets}>
                    <li>Solo puedes acceder a tus datos.</li>
                    <li>Este es uno de los casos mas vulnerables en APIs.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como piensa un backend developer</h3>
                    <p className={styles.sub}>La pregunta correcta cambia por completo el diseno del endpoint.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    No pregunta &quot;esta logueado?&quot;. Pregunta &quot;este usuario puede hacer ESTO sobre ESTE
                    recurso?&quot;.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Las pruebas simples de cambio de ID descubren bugs criticos.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Cambiar ID</h4>
                  <pre>{changeIdSnippet}</pre>
                  <p>La pregunta es: puedes ver datos de otro usuario?</p>

                  <h4>Usar otro usuario</h4>
                  <ul className={styles.bullets}>
                    <li>Login con usuario A.</li>
                    <li>Acceder a datos de usuario B.</li>
                  </ul>

                  <h4>Acciones sensibles</h4>
                  <pre>{sensitiveActionSnippet}</pre>
                  <p>Puede hacerlo cualquiera autenticado?</p>
                </div>
              </section>

              <section className={styles.section} id="insight">
                <div className={styles.shd}>
                  <div>
                    <h3>Insight importante</h3>
                    <p className={styles.sub}>Muchos bugs criticos viven despues del login.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Insight</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    La mayoria de los bugs criticos no estan en autenticacion; estan en autorizacion.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Proteger un endpoint no basta si no proteges el recurso.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Autenticacion dice quien eres. Autorizacion dice que puedes hacer.
                  </div>
                  <div className={styles.quote}>Backend junior protege endpoints. Backend senior protege recursos.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Detectar fallos de autorizacion cambiando el recurso solicitado.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: comprobar si el backend valida ownership o solo valida login.</p>

                  <h4>Endpoint</h4>
                  <pre>{endpointSnippet}</pre>

                  <h4>Paso 1 - Usuario A</h4>
                  <pre>/orders/1</pre>

                  <h4>Paso 2 - Cambia ID</h4>
                  <pre>/orders/2</pre>
                  <p>Deberia poder?</p>

                  <h4>Paso 3 - Conclusion</h4>
                  <p>Si puede acceder, hay una vulnerabilidad critica.</p>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>Autenticacion no es suficiente.</li>
                    <li>El control real esta en autorizacion.</li>
                    <li>Cambiar IDs es una prueba clave.</li>
                  </ul>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Tu sistema valida ownership?</li>
                    <li>O solo valida login?</li>
                  </ul>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={styles.btn} href="/daily/52">
                      Dia 52
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
                  <p>Dia 53 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Regla:</strong> autenticado no significa autorizado.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> Broken Access Control expone recursos de otros usuarios.
                </div>
                <div className={styles.li}>
                  <strong>Accion:</strong> validar usuario, recurso y accion en cada endpoint sensible.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
