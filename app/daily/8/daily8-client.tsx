"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const dtoSnippet = `// Entidad interna (persistencia)
public class User
{
  public Guid Id { get; set; }
  public string Email { get; set; } = "";
  public string PasswordHash { get; set; } = "";
  public bool IsAdmin { get; set; }
  public string InternalNotes { get; set; } = "";
}

// Contrato de salida (API)
public record UserResponseDto(Guid Id, string Email);

app.MapGet("/api/v1/users/{id:guid}", async (Guid id, AppDbContext db) =>
{
  var user = await db.Users.FindAsync(id);
  if (user is null) return Results.NotFound();

  var dto = new UserResponseDto(user.Id, user.Email);
  return Results.Ok(dto);
});`;

const testerChecklist = `[ ] Cambia columnas internas en DB y verifica que el contrato siga igual
[ ] Revisa que PasswordHash nunca aparezca en response JSON
[ ] Verifica que solo campos del DTO salgan al cliente
[ ] Prueba versionado al agregar nuevos campos publicos`;

export default function Daily8Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/7";
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
            <Link className={styles.btn} href="/daily/7">
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
                <div className={styles.badge}>Daily #8 • Backend Foundations</div>
                <h2 className={styles.title}>DTO != Entidad: no expongas tu modelo interno</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Contratos</span>
                  <span className={styles.chip}>Tag: .NET</span>
                  <span className={styles.chip}>Tag: API Design</span>
                </div>

                <p className={styles.lead}>
                  La entidad representa como guardas datos; el DTO representa como hablas con el exterior. Mezclarlos
                  vuelve fragil tu API.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Entidad interna y contrato externo tienen objetivos distintos.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    El backend profesional separa como guarda datos de como los expone.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo real</h3>
                    <p className={styles.sub}>User interno puede tener campos sensibles.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Entidad interna: `Id`, `Email`, `PasswordHash`, `IsAdmin`, `InternalNotes`.</li>
                    <li>DTO de salida: `Id`, `Email`.</li>
                  </ul>
                  <div className={styles.quote}>
                    El cliente necesita datos de negocio, no detalles de persistencia ni campos de seguridad interna.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Protege contrato publico aunque cambie la base de datos.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que quiero exponer?</li>
                    <li>Que quiero ocultar?</li>
                    <li>Que pasa si cambia el esquema interno?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Entidad en Domain, DTO en Contracts y mapping explicito.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Si un controller devuelve entidades de EF Core directamente, el diseno queda acoplado y fragil.
                  </div>

                  <pre>{dtoSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Cuando DTO y entidad se mezclan, cambios tecnicos rompen clientes.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Cambias DB y rompe frontend.</li>
                    <li>Aparecen campos sensibles en respuestas.</li>
                    <li>Versionar API se vuelve costoso.</li>
                  </ul>

                  <pre>{testerChecklist}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Arquitectura primero: persistencia interna != contrato externo.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Separar entidades y DTOs no es sintaxis: es diseno para estabilidad y seguridad.
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
                  <p>Dia 8 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> DTO y entidad cumplen roles distintos.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> mapping explicito de `User` a `UserResponseDto`.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> exponer datos internos y romper clientes al cambiar DB.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
