"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "example", label: "3) Ejemplo" },
  { id: "cause", label: "4) Por que pasa" },
  { id: "dotnet", label: "5) .NET" },
  { id: "testing", label: "6) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const endpointSnippet = `GET /orders/{id}`;

const userASnippet = `/orders/100`;

const userBSnippet = `/orders/101`;

const badFlowSnippet = `buscar por id -> devolver`;

const missingCheckSnippet = `este recurso pertenece al usuario?`;

const vulnerableDotnetSnippet = `[Authorize]
public async Task<Order> GetOrder(Guid id)
{
    return await _repository.GetByIdAsync(id);
}`;

const correctDotnetSnippet = `[Authorize]
public async Task<Order> GetOrder(Guid id)
{
    var order = await _repository.GetByIdAsync(id);

    if (order.UserId != CurrentUser.Id)
        throw new UnauthorizedAccessException();

    return order;
}`;

const commonEndpointsSnippet = `/orders/{id}
/users/{id}
/documents/{id}
/invoices/{id}`;

const testerIdsSnippet = `/orders/101
/orders/102
/orders/999`;

const subtleVariantsSnippet = `- filtras por ID pero no por usuario
- usas queries sin ownership
- devuelves listas sin restriccion`;

export default function Daily54Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/53";
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
            <Link className={styles.btn} href="/daily/53">
              <span className={styles.kbd}>←</span> Dia 53
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
                <div className={styles.createdAt}>26/04/2026</div>
                <div className={styles.badge}>Daily #54 • Backend Foundations</div>
                <h2 className={styles.title}>IDOR: acceder a datos de otros sin permiso</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Access Control</span>
                  <span className={styles.chip}>Tag: API</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  IDOR ocurre cuando el backend confia en un ID y no valida si el usuario puede acceder a ese recurso.
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
                    <p className={styles.sub}>Uno de los bugs mas comunes y peligrosos en APIs.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    IDOR significa Insecure Direct Object Reference: cambiar un identificador permite acceder a un
                    recurso que no deberia ser tuyo.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>El fallo esta en la autorizacion del recurso, no en el formato del ID.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    IDOR es una vulnerabilidad donde un usuario puede acceder a recursos de otro simplemente cambiando
                    un identificador.
                  </div>
                  <p>El problema no es el ID. El problema es no validar quien lo usa.</p>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Ejemplo simple</h3>
                    <p className={styles.sub}>Una URL con ID basta para probar el fallo.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Endpoint</h4>
                  <pre>{endpointSnippet}</pre>

                  <h4>Usuario A</h4>
                  <pre>{userASnippet}</pre>

                  <h4>Usuario B prueba</h4>
                  <pre>{userBSnippet}</pre>

                  <div className={styles.quote}>Si puede ver el pedido, hay IDOR.</div>
                </div>
              </section>

              <section className={styles.section} id="cause">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Por que pasa</h3>
                    <p className={styles.sub}>El backend busca por ID, pero no comprueba propiedad ni permiso.</p>
                  </div>
                  <span className={styles.chip}>Causa</span>
                </div>
                <div className={styles.sbd}>
                  <p>El backend vulnerable suele hacer esto:</p>
                  <pre>{badFlowSnippet}</pre>

                  <p>Pero no valida esto:</p>
                  <pre>{missingCheckSnippet}</pre>

                  <div className={styles.callout}>
                    Backend junior usa IDs. Backend senior valida ownership antes de devolver datos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como se ve en .NET</h3>
                    <p className={styles.sub}>[Authorize] valida autenticacion; no valida ownership por si solo.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Vulnerable</h4>
                  <pre>{vulnerableDotnetSnippet}</pre>
                  <p>Solo valida que hay login. No valida que el pedido pertenezca al usuario actual.</p>

                  <h4>Correcto</h4>
                  <pre>{correctDotnetSnippet}</pre>
                  <p>Ahora el endpoint valida acceso sobre el recurso concreto antes de devolverlo.</p>
                </div>
              </section>

              <section className={styles.section} id="where">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Donde aparece IDOR</h3>
                    <p className={styles.sub}>Cualquier endpoint con IDs merece una prueba de ownership.</p>
                  </div>
                  <span className={styles.chip}>Superficie</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{commonEndpointsSnippet}</pre>
                  <p>La pregunta correcta no es &quot;tengo el ID?&quot;. Es &quot;este usuario tiene derecho a este objeto?&quot;.</p>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Cambiar IDs es una tecnica basica, rapida y muy efectiva.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Paso 1</h4>
                  <p>Accede a un recurso valido:</p>
                  <pre>{userASnippet}</pre>

                  <h4>Paso 2</h4>
                  <p>Cambia el ID:</p>
                  <pre>{testerIdsSnippet}</pre>

                  <h4>Paso 3</h4>
                  <p>Observa si devuelve datos que no son tuyos.</p>

                  <ul className={styles.bullets}>
                    <li>Si devuelve datos de otro usuario, hay IDOR.</li>
                    <li>Si bloquea el acceso, el control de ownership funciona.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>Error tipico</h3>
                    <p className={styles.sub}>Creer que [Authorize] protege contra IDOR.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Alerta</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>[Authorize] no protege contra IDOR.</div>
                  <p>Protege el endpoint de usuarios anonimos, pero no decide si el usuario autenticado puede ver ese ID.</p>
                </div>
              </section>

              <section className={styles.section} id="variants">
                <div className={styles.shd}>
                  <div>
                    <h3>Variantes mas sutiles</h3>
                    <p className={styles.sub}>No siempre aparece como /orders/101.</p>
                  </div>
                  <span className={styles.chip}>Patrones</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{subtleVariantsSnippet}</pre>
                  <div className={styles.callout}>
                    Si puedes cambiar un numero en la URL y ver datos de otro, tienes una vulnerabilidad critica.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>No confies en el ID: autoriza el acceso al recurso.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    IDOR ocurre cuando el backend confia en el ID sin validar el usuario.
                  </div>
                  <div className={styles.quote}>Backend junior usa IDs. Backend senior valida ownership.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Detectar IDOR en una API cambiando identificadores.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: comprobar si el backend valida ownership o solo busca por ID.</p>

                  <h4>Endpoint</h4>
                  <pre>GET /resource/{`{id}`}</pre>

                  <h4>Paso 1 - Usuario A</h4>
                  <pre>/resource/1</pre>

                  <h4>Paso 2 - Modifica el ID</h4>
                  <pre>{`/resource/2
/resource/3`}</pre>

                  <h4>Paso 3 - Pregunta clave</h4>
                  <p>Ves datos que no son tuyos?</p>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>Cambiar IDs es una tecnica basica.</li>
                    <li>Muchas APIs fallan aqui.</li>
                    <li>Es facil de probar y muy grave.</li>
                  </ul>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Tu sistema filtra por usuario en DB?</li>
                    <li>O solo busca por ID?</li>
                  </ul>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={styles.btn} href="/daily/53">
                      Dia 53
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
                  <p>Dia 54 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Regla:</strong> tener un ID no significa tener permiso sobre ese recurso.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> cambiar IDs puede exponer pedidos, usuarios, documentos o facturas de otros.
                </div>
                <div className={styles.li}>
                  <strong>Accion:</strong> validar ownership en DB o en la capa de autorizacion antes de devolver datos.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
