"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const mappingDefinitionSnippet = `Mapping = transformar datos entre dos modelos distintos
DTO -> Dominio
Dominio -> DTO`;

const twoWorldsSnippet = `Mundo externo (API)
- datos sucios
- formatos inconsistentes
- tipos incorrectos

Mundo interno (dominio)
- reglas estrictas
- datos validos
- modelos claros`;

const rawInputSnippet = `email = " TEST@MAIL.COM "
price = "100.50"`;

const domainExpectationSnippet = `Email
Money`;

const mappingStepsSnippet = `trim
lowercase
parse decimal`;

const aclSnippet = `Datos externos -> Mapping -> Dominio limpio`;

const externalJsonSnippet = `{
  "user_email": "TEST@GMAIL.COM ",
  "user_age": "25"
}`;

const badWithoutMappingSnippet = `User.Create(dto.user_email)`;

const goodWithMappingSnippet = `trim -> lowercase -> parse -> crear objetos`;

const mapperSnippet = `public static class UserMapper
{
    public static User ToDomain(CreateUserRequest dto)
    {
        var email = Email.Create(dto.Email.Trim().ToLower());

        return User.Create(email);
    }
}`;

const mapperUsageSnippet = `var user = UserMapper.ToDomain(request);`;

const notMappingSnippet = `- copiar propiedades automaticamente
- usar automapper sin pensar
- ignorar validacion`;

const testerChecklistSnippet = `[ ] Enviar datos mal formateados
[ ] Probar casing y espacios
[ ] Validar tipos incorrectos
[ ] Revisar que el dominio reciba datos limpios`;

const miniInputSnippet = `email = " TEST@MAIL.COM "
price = "100.50"`;

const miniDomainSnippet = `Email
Money`;

const miniResultSnippet = `datos validos dentro del sistema`;

export default function Daily50Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/49";
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
            <Link className={styles.btn} href="/daily/49">
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
                <div className={styles.createdAt}>22/04/2026</div>
                <div className={styles.badge}>Daily #50 • Backend Foundations</div>
                <h2 className={styles.title}>Mapping y Anti-Corruption Layer: proteger tu dominio</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>6-11 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: DDD</span>
                  <span className={styles.chip}>Tag: Mapping</span>
                  <span className={styles.chip}>Tag: ACL</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Mapping traduce datos entre modelos distintos. Anti-Corruption Layer protege el dominio de formatos
                  externos incorrectos o inconsistentes.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Cuando trabajas con APIs y dominio, siempre necesitas transformar datos.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Mapping = proceso de convertir datos de una estructura a otra.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>No es copiar datos: es adaptarlos para otro contexto.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{mappingDefinitionSnippet}</pre>
                  <p>El objetivo es que los datos tengan sentido y sean validos en el modelo de destino.</p>
                </div>
              </section>

              <section className={styles.section} id="why-exists">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Por que existe el mapping</h3>
                    <p className={styles.sub}>Porque el mundo externo y el dominio no hablan el mismo idioma.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{twoWorldsSnippet}</pre>
                  <p>El mapping conecta ambos mundos sin contaminar el dominio.</p>
                </div>
              </section>

              <section className={styles.section} id="simple-example">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Ejemplo simple</h3>
                    <p className={styles.sub}>La API recibe strings; el dominio espera objetos con reglas.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Request</h4>
                  <pre>{rawInputSnippet}</pre>

                  <h4>Dominio espera</h4>
                  <pre>{domainExpectationSnippet}</pre>

                  <h4>Mapping</h4>
                  <pre>{mappingStepsSnippet}</pre>

                  <p>Resultado: Email valido y Money valido dentro del sistema.</p>
                </div>
              </section>

              <section className={styles.section} id="acl">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Anti-Corruption Layer (ACL)</h3>
                    <p className={styles.sub}>Capa que protege tu dominio de datos externos incorrectos o inconsistentes.</p>
                  </div>
                  <span className={styles.chip}>ACL</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Anti-Corruption Layer = capa que evita que el exterior ensucie el dominio.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="relation">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como se relaciona con mapping</h3>
                    <p className={styles.sub}>El mapping es la herramienta principal para limpiar y traducir datos.</p>
                  </div>
                  <span className={styles.chip}>Relacion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{aclSnippet}</pre>
                  <p>El dominio nunca deberia ver datos sucios directamente.</p>
                </div>
              </section>

              <section className={styles.section} id="real-example">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Ejemplo real</h3>
                    <p className={styles.sub}>Datos externos inconsistentes entrando desde un DTO.</p>
                  </div>
                  <span className={styles.chip}>Caso real</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Datos externos</h4>
                  <pre>{externalJsonSnippet}</pre>

                  <h4>Sin mapping</h4>
                  <pre>{badWithoutMappingSnippet}</pre>
                  <p>El dominio queda contaminado por formato externo.</p>

                  <h4>Con mapping</h4>
                  <pre>{goodWithMappingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dotnet-view">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Como se ve en .NET</h3>
                    <p className={styles.sub}>Mapper explicito para traducir DTOs a objetos de dominio.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mapper</h4>
                  <pre>{mapperSnippet}</pre>

                  <h4>Uso</h4>
                  <pre>{mapperUsageSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No copia propiedades: traduce datos externos a modelos internos validos.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    El dominio no se adapta al exterior. El exterior se adapta al dominio.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="not-mapping">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Que NO es mapping</h3>
                    <p className={styles.sub}>Automatizar por reflejo sin pensar rompe la proteccion del dominio.</p>
                  </div>
                  <span className={styles.chip}>Limites</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notMappingSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>11. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas errores de formato, tipos y limpieza de entrada.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Errores por formato.</li>
                    <li>Datos inconsistentes.</li>
                    <li>Bugs por tipos incorrectos.</li>
                  </ul>
                  <pre>{testerChecklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Mapping traduce datos entre modelos distintos de forma segura.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>Backend junior copia datos. Backend senior los traduce y protege.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Practicar mapping correctamente antes de tocar el dominio.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Input</h4>
                  <pre>{miniInputSnippet}</pre>

                  <h4>Paso 1 - Define dominio</h4>
                  <pre>{miniDomainSnippet}</pre>

                  <h4>Paso 2 - Define mapping</h4>
                  <pre>{mappingStepsSnippet}</pre>

                  <h4>Paso 3 - Resultado</h4>
                  <pre>{miniResultSnippet}</pre>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>No confias en datos externos.</li>
                    <li>Transformas antes de usar.</li>
                    <li>Proteges el dominio.</li>
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
                  <p>Dia 50 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Definicion:</strong> mapping transforma datos entre modelos distintos.
                </div>
                <div className={styles.li}>
                  <strong>ACL:</strong> protege el dominio del exterior inconsistente.
                </div>
                <div className={styles.li}>
                  <strong>Regla:</strong> el exterior se adapta al dominio, no al reves.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
