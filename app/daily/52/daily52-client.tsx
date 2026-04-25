"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const authHeaderSnippet = `Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`;

const tokenChecksSnippet = `1. Firma (signature)
2. Expiracion (exp)
3. Emisor (iss)
4. Audiencia (aud)
5. Integridad del token`;

const badCheckSnippet = `si hay token -> OK`;

const dotnetConfigSnippet = `builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });`;

const failureCasesSnippet = `- token expirado aceptado
- firma no validada
- issuer incorrecto
- audiencia incorrecta`;

const testerChecksSnippet = `[ ] Sin token
[ ] Token invalido (caracter alterado)
[ ] Token expirado
[ ] Token de otro sistema`;

const noTokenSnippet = `GET /orders`;

const corruptTokenSnippet = `cambia 1 letra del JWT`;

export default function Daily52Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/51";
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
            <Link className={styles.btn} href="/daily/51">
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
                <div className={styles.createdAt}>24/04/2026</div>
                <div className={styles.badge}>Daily #52 • Backend Foundations</div>
                <h2 className={styles.title}>Autenticacion: que valida realmente el backend</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: JWT</span>
                  <span className={styles.chip}>Tag: API</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Autenticacion no es tener un token, es validar estrictamente que ese token sea legitimo.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Preguntar solo &quot;tiene token&quot; es superficial.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>La autenticacion valida identidad a traves de un token confiable.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Verificar que el usuario es quien dice ser.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <p>
                    En APIs modernas, esto normalmente se implementa con JWT (JSON Web Token) y reglas de validacion
                    estrictas.
                  </p>
                </div>
              </section>

              <section className={styles.section} id="validations">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que deberia validar un backend</h3>
                    <p className={styles.sub}>Cuando llega un token, hay una lista minima obligatoria.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{tokenChecksSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="example">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Ejemplo simple</h3>
                    <p className={styles.sub}>Un header Authorization no implica confianza automatica.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{authHeaderSnippet}</pre>
                  <p>El backend no deberia confiar automaticamente.</p>
                </div>
              </section>

              <section className={styles.section} id="common-mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Error comun (muy real)</h3>
                    <p className={styles.sub}>Si hay token, entonces OK. Eso abre bypass graves.</p>
                  </div>
                  <span className={styles.chip}>Error tipico</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badCheckSnippet}</pre>
                  <div className={styles.quote}>GRAVE ERROR: tener token no equivale a token valido.</div>
                </div>
              </section>

              <section className={styles.section} id="dotnet-view">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como se ve en .NET</h3>
                    <p className={styles.sub}>TokenValidationParameters define que valida realmente el sistema.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{dotnetConfigSnippet}</pre>
                  <p>Punto clave: el backend no valida &quot;usuarios&quot;, valida tokens.</p>
                </div>
              </section>

              <section className={styles.section} id="what-can-go-wrong">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Que puede salir mal</h3>
                    <p className={styles.sub}>Pequenos errores de validacion permiten bypass reales.</p>
                  </div>
                  <span className={styles.chip}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{failureCasesSnippet}</pre>
                  <p>Todos son bypass posibles.</p>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No pregunta si hay token, valida si es legitimo y confiable.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    La pregunta correcta: este token es valido, legitimo y confiable?
                  </div>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Pruebas basicas que descubren validaciones debiles.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Sin token</h4>
                  <pre>{noTokenSnippet}</pre>
                  <p>Deberia fallar.</p>

                  <h4>Token invalido</h4>
                  <ul className={styles.bullets}>
                    <li>Modificar un caracter del token.</li>
                    <li>Usar token random.</li>
                  </ul>
                  <p>Deberia fallar.</p>

                  <h4>Token expirado</h4>
                  <p>Deberia fallar.</p>

                  <h4>Token de otro sistema</h4>
                  <p>Deberia fallar.</p>

                  <pre>{testerChecksSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="difference">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Diferencia importante</h3>
                    <p className={styles.sub}>Hoy estamos en autenticacion, no en autorizacion.</p>
                  </div>
                  <span className={styles.chip}>Fundamento</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Autenticacion -&gt; quien eres.</li>
                    <li>Autorizacion -&gt; que puedes hacer.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="insight">
                <div className={styles.shd}>
                  <div>
                    <h3>Insight importante</h3>
                    <p className={styles.sub}>Aceptar tokens invalidos es un problema serio de seguridad.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Insight</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Si puedes acceder con un token invalido, tienes un problema serio.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>JWT sin validacion correcta no protege nada.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend junior usa JWT. Backend senior valida correctamente cada token.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Romper la autenticacion mentalmente para evaluar su calidad real.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: probar si el backend valida o solo confia.</p>

                  <h4>Endpoint protegido</h4>
                  <pre>{noTokenSnippet}</pre>

                  <h4>Paso 1 - Sin token</h4>
                  <p>Funciona o falla?</p>

                  <h4>Paso 2 - Token corrupto</h4>
                  <pre>{corruptTokenSnippet}</pre>
                  <p>Sigue funcionando?</p>

                  <h4>Paso 3 - Token expirado</h4>
                  <p>Lo acepta?</p>

                  <h4>Paso 4 - Pregunta clave</h4>
                  <p>El backend valida o solo confia?</p>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>Autenticacion es validacion estricta.</li>
                    <li>Pequenos errores crean grandes vulnerabilidades.</li>
                    <li>No basta usar JWT: hay que validarlo bien.</li>
                  </ul>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Tu backend valida `exp`?</li>
                    <li>Valida `issuer`?</li>
                    <li>Confia en cualquier token?</li>
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
                  <p>Dia 52 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Regla:</strong> autenticacion valida tokens, no presencia de token.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> validaciones incompletas permiten bypass.
                </div>
                <div className={styles.li}>
                  <strong>Accion:</strong> probar tokens invalidos, expirados y externos.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
