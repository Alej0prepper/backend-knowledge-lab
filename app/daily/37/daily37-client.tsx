"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const noCqrsSnippet = `UserService
  CreateUser()
  GetUser()
  UpdateUser()

POST /users -> UserService.CreateUser()
GET /users  -> UserService.GetUser()`;

const commandFlowSnippet = `POST /users
-> Controller
-> CreateUserCommand
-> CreateUserHandler
-> Base de datos`;

const queryFlowSnippet = `GET /users/{id}
-> Controller
-> GetUserQuery
-> GetUserHandler
-> Base de datos o cache
-> Response`;

const foldersSnippet = `/Commands
  CreateUserCommand.cs
  CreateUserHandler.cs

/Queries
  GetUserQuery.cs
  GetUserHandler.cs`;

const comparisonSnippet = `Command: cambia estado, valida fuerte, riesgo alto
Query: solo lectura, validacion minima, optimizacion alta, cache comun`;

const miniExerciseSnippet = `Pregunta:
Existe un servicio que lee, modifica y valida todo junto?

Si la respuesta es SI:
  Todavia no hay separacion CQRS real`;

export default function Daily37Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/36";
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
            <Link className={styles.btn} href="/daily/36">
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
                <div className={styles.createdAt}>01/04/2026</div>
                <div className={styles.badge}>Daily #37 • Backend Foundations</div>
                <h2 className={styles.title}>CQRS en la practica: donde esta la separacion real</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-9 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: CQRS</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  En CQRS la separacion no es decorativa: son dos pipelines distintos dentro del backend.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. Sin CQRS (lo tipico)</h3>
                    <p className={styles.sub}>Lectura y escritura mezcladas en el mismo servicio.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{noCqrsSnippet}</pre>
                  <div className={styles.callout}>Cuando todo pasa por el mismo servicio, no hay separacion real.</div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Con CQRS (la separacion real)</h3>
                    <p className={styles.sub}>Dos caminos independientes: comandos y queries.</p>
                  </div>
                  <span className={styles.chip}>Estructura</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Camino de escritura (Command)</h4>
                  <pre>{commandFlowSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Valida reglas.</li>
                    <li>Modifica estado.</li>
                    <li>Tiene riesgo funcional alto.</li>
                  </ul>

                  <h4>Camino de lectura (Query)</h4>
                  <pre>{queryFlowSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>No modifica estado.</li>
                    <li>Busca performance de lectura.</li>
                    <li>Puede usar cache con facilidad.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Diferencias visibles</h3>
                    <p className={styles.sub}>No es teoria: cambia responsabilidades y decisiones tecnicas.</p>
                  </div>
                  <span className={styles.chip}>Comparacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{comparisonSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Donde se ve en codigo .NET</h3>
                    <p className={styles.sub}>Se refleja fisicamente en carpetas y handlers separados.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{foldersSnippet}</pre>
                  <div className={styles.quote}>
                    CreateUserHandler solo escribe. GetUserHandler solo lee. Dos responsabilidades distintas.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Por que esto importa</h3>
                    <p className={styles.sub}>La separacion permite optimizar y escalar sin efectos colaterales.</p>
                  </div>
                  <span className={styles.chip}>Impacto</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Optimizar queries sin tocar reglas de escritura.</li>
                    <li>Modificar commands sin romper lecturas.</li>
                    <li>Escalar lectura y escritura de forma distinta.</li>
                    <li>Testear mejor por responsabilidades separadas.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>
                      La separacion de CQRS no esta en el endpoint; esta en tener dos flujos independientes.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Si un mismo servicio lee, escribe y valida todo junto, todavia no hay CQRS real.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-ejercicio (2 min)</h3>
                    <p className={styles.sub}>Detectar si tu sistema ya tiene separacion CQRS real.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{miniExerciseSnippet}</pre>

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
                  <p>Dia 37 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> CQRS separa pipelines de escritura y lectura.
                </div>
                <div className={styles.li}>
                  <strong>.NET visible:</strong> Commands y Queries en handlers separados.
                </div>
                <div className={styles.li}>
                  <strong>Chequeo rapido:</strong> si un servicio hace todo, no hay separacion real.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
