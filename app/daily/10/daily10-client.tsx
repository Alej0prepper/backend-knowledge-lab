"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const endpointSnippet = `app.MapPost("/api/v1/orders", async (
  [FromBody] CreateOrderRequestDto request,
  ClaimsPrincipal user,
  IOrderService service,
  CancellationToken ct) =>
{
  // 400: request invalida
  if (request.Items.Count == 0)
  {
    return Results.BadRequest(new
    {
      status = 400,
      code = "ORDER_ITEMS_REQUIRED",
      detail = "At least one item is required"
    });
  }

  // 401: no autenticado
  if (user.Identity?.IsAuthenticated != true)
  {
    return Results.Unauthorized();
  }

  // 403: autenticado, pero sin permiso
  if (!user.IsInRole("orders:write"))
  {
    return Results.Forbid();
  }

  try
  {
    var order = await service.CreateAsync(request, ct);
    return Results.Created($"/api/v1/orders/{order.Id}", order);
  }
  catch (Exception ex)
  {
    // 500: fallo inesperado
    return Results.Problem(
      title: "Unexpected server error",
      detail: ex.Message,
      statusCode: StatusCodes.Status500InternalServerError);
  }
});`;

const antiPatternSnippet = `// Anti-pattern: todo responde 200
return Results.Ok(new { success = false, message = "Not authorized" });

// Correcto: usa el status real
return Results.Unauthorized(); // 401`;

const checklistSnippet = `[ ] Sin token => devuelve 401 (no 500)
[ ] Con token sin rol => devuelve 403 (no 401)
[ ] Error de validacion => devuelve 400
[ ] Error inesperado (DB/timeout no controlado) => devuelve 500`;

export default function Daily10Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/9";
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
            <Link className={styles.btn} href="/daily/9">
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
                <div className={styles.badge}>Daily #10 • Backend Foundations</div>
                <h2 className={styles.title}>400 vs 401 vs 403 vs 500: los errores tambien son diseno</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: HTTP</span>
                  <span className={styles.chip}>Tag: Errores</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Un backend profesional disena sus errores. Elegir bien cada status code mejora claridad, debugging y
                  contratos.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>No todo error es 500 y cada codigo comunica algo distinto.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Los codigos HTTP no son decorativos: forman parte del contrato entre cliente y backend.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="diferencias">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Diferencias esenciales</h3>
                    <p className={styles.sub}>Cada estado responde una pregunta tecnica distinta.</p>
                  </div>
                  <span className={styles.chip}>Mapa rapido</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>
                      <strong>400 (Bad Request):</strong> request mal formada o invalida.
                    </li>
                    <li>
                      <strong>401 (Unauthorized):</strong> no autenticado.
                    </li>
                    <li>
                      <strong>403 (Forbidden):</strong> autenticado, pero sin permiso.
                    </li>
                    <li>
                      <strong>500 (Internal Server Error):</strong> fallo inesperado del servidor.
                    </li>
                  </ul>

                  <pre>{antiPatternSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No piensa en devolver error; piensa en causa y responsabilidad.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>El cliente hizo algo mal?</li>
                    <li>Faltan credenciales?</li>
                    <li>Esta prohibido por permisos?</li>
                    <li>O realmente fallo el sistema?</li>
                  </ul>

                  <div className={styles.quote}>Elegir mal el status code genera confusiones tecnicas en cadena.</div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>En ASP.NET Core cada capa suele mapear a su codigo correcto.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Validaciones: 400 con `ModelState` o `Results.BadRequest`.</li>
                    <li>Auth middleware: 401 cuando falta autenticacion.</li>
                    <li>Policies/Roles: 403 si no hay permisos.</li>
                    <li>Exception middleware: 500 para errores inesperados.</li>
                  </ul>

                  <pre>{endpointSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Errores esperables devolviendo 500 son una senal de backend inmaduro.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Sin token: debe ser 401, no 500.</li>
                    <li>Con token sin permiso: debe ser 403, no 401.</li>
                    <li>Error de negocio/validacion: suele ser 400, no 500.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Los errores HTTP son diseno y contrato, no decoracion.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Cuando entiendes que comunica cada error, ya disenas APIs con criterio backend profesional.
                  </div>

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
                  <p>Dia 10 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> cada codigo HTTP comunica una causa distinta.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> validacion 400, auth 401, permisos 403, excepcion 500.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> devolver 500 en errores esperables rompe claridad de contrato.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
