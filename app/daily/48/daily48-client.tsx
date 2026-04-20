"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const noUowProblemSnippet = `guardar Order ✅
guardar Payment ❌ (falla)`;

const basicDotnetSnippet = `public async Task ProcessOrder(Guid orderId)
{
    var order = await _orderRepository.GetByIdAsync(orderId);

    order.Confirm();
    order.Pay(order.Total);

    await _dbContext.SaveChangesAsync();
}`;

const multipleChangesSnippet = `var order = await repo.GetByIdAsync(id);

order.AddItem(...);
order.Confirm();

await dbContext.SaveChangesAsync();`;

const explicitTransactionSnippet = `using var transaction = await dbContext.Database.BeginTransactionAsync();

try
{
    order.Confirm();
    order.Pay(order.Total);

    await dbContext.SaveChangesAsync();

    await transaction.CommitAsync();
}
catch
{
    await transaction.RollbackAsync();
    throw;
}`;

const notUowSnippet = `- otro service mas
- un wrapper innecesario
- logica de negocio`;

const badApproachSnippet = `await repo.SaveAsync(order);
await repo.SaveAsync(payment);`;

const goodApproachSnippet = `modificar todo
-> guardar una sola vez`;

const testerChecklistSnippet = `[ ] Forzar fallos a mitad del flujo
[ ] Validar rollback completo
[ ] Revisar integridad despues del error
[ ] Verificar que no queden datos parciales`;

const miniFlowSnippet = `POST /order/pay

Order -> cambiar estado
Payment -> crear registro`;

const miniProblemSnippet = `Order actualizado
Payment falla ❌`;

const miniSolutionSnippet = `hacer cambios
-> guardar TODO junto`;

const oneSaveRuleSnippet = `un solo SaveChanges()`;

export default function Daily48Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/47";
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
            <Link className={styles.btn} href="/daily/47">
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
                <div className={styles.createdAt}>20/04/2026</div>
                <div className={styles.badge}>Daily #48 • Backend Foundations</div>
                <h2 className={styles.title}>Unit of Work: guardar todo como una sola operacion</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>6-11 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: DDD</span>
                  <span className={styles.chip}>Tag: Unit of Work</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Cuando un flujo cambia multiples cosas, debes persistir todo junto para evitar inconsistencias.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Guardar todos los cambios juntos o no guardar ninguno.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Unit of Work = una unidad consistente de persistencia.</div>
                </div>
              </section>

              <section className={styles.section} id="problem">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema que resuelve</h3>
                    <p className={styles.sub}>Evita datos a medias cuando algo falla en mitad del proceso.</p>
                  </div>
                  <span className={styles.chip}>Problema</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{noUowProblemSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Datos inconsistentes.</li>
                    <li>Flujos corruptos.</li>
                    <li>Errores dificiles de recuperar.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="what-does">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que hace Unit of Work</h3>
                    <p className={styles.sub}>Agrupa cambios y los confirma como una sola operacion.</p>
                  </div>
                  <span className={styles.chip}>Rol</span>
                </div>
                <div className={styles.sbd}>
                  <p>Resultado esperado:</p>
                  <ul className={styles.bullets}>
                    <li>O todo se guarda.</li>
                    <li>O nada se guarda.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Evalua consistencia antes de persistir.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Este flujo modifica varias cosas?</li>
                    <li>Que pasa si falla a mitad?</li>
                    <li>Puedo garantizar consistencia?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="relation">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Relacion con dias anteriores</h3>
                    <p className={styles.sub}>Conecta transacciones, aggregates y repositories.</p>
                  </div>
                  <span className={styles.chip}>Contexto</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Dia 7: transacciones.</li>
                    <li>Dia 45: aggregates.</li>
                    <li>Dia 47: repositories.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet-basic">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Como se ve en .NET</h3>
                    <p className={styles.sub}>En EF Core, DbContext ya actua como Unit of Work.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Ejemplo basico</h4>
                  <pre>{basicDotnetSnippet}</pre>

                  <p>Punto clave: hasta `SaveChanges()` nada se persiste realmente.</p>

                  <h4>Multiples cambios</h4>
                  <pre>{multipleChangesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="explicit">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Forma explicita (avanzada)</h3>
                    <p className={styles.sub}>Cuando necesitas controlar la transaccion de forma manual.</p>
                  </div>
                  <span className={styles.chip}>Transaccion</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{explicitTransactionSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="not-uow">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Que NO es Unit of Work</h3>
                    <p className={styles.sub}>No es una capa extra de negocio.</p>
                  </div>
                  <span className={styles.chip}>Limites</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{notUowSnippet}</pre>
                  <p>Es control de persistencia y consistencia.</p>
                </div>
              </section>

              <section className={styles.section} id="typical-error">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Error tipico</h3>
                    <p className={styles.sub}>Guardar por pasos en operaciones que deberian ser atomicas.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{badApproachSnippet}</pre>
                  <p>Si falla la segunda operacion, dejas el sistema inconsistente.</p>

                  <h4>Buen enfoque</h4>
                  <pre>{goodApproachSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas operaciones que se quedan a medias tras errores.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Datos parcialmente guardados.</li>
                    <li>Inconsistencias tras excepciones.</li>
                    <li>Estados rotos despues de un fallo.</li>
                  </ul>
                  <pre>{testerChecklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Un sistema consistente guarda cambios como una unidad.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>Backend senior guarda en unidades consistentes, no paso a paso.</div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Detectar cuando necesitas Unit of Work.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Paso 1 - Flujo</h4>
                  <pre>{miniFlowSnippet}</pre>

                  <h4>Paso 2 - Problema</h4>
                  <pre>{miniProblemSnippet}</pre>

                  <h4>Paso 3 - Solucion mental</h4>
                  <pre>{miniSolutionSnippet}</pre>

                  <h4>Paso 4 - Regla</h4>
                  <pre>{oneSaveRuleSnippet}</pre>

                  <p>Que debes notar:</p>
                  <ul className={styles.bullets}>
                    <li>No guardas paso a paso.</li>
                    <li>Guardas al final.</li>
                    <li>Todo o nada.</li>
                  </ul>

                  <p>Nivel 2:</p>
                  <ul className={styles.bullets}>
                    <li>Que flujos en tu sistema tocan varias entidades?</li>
                    <li>Que pasaria si fallan a mitad?</li>
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
                  <p>Dia 48 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> guarda todo junto o no guardes nada.
                </div>
                <div className={styles.li}>
                  <strong>.NET real:</strong> `DbContext` funciona como Unit of Work.
                </div>
                <div className={styles.li}>
                  <strong>Regla:</strong> un solo `SaveChanges()` por flujo consistente.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
