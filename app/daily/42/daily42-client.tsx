"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const nonNegativeSnippet = `total >= 0`;

const uniqueEmailSnippet = `Un usuario no puede tener dos emails iguales`;

const weakDesignSnippet = `order.Status = Shipped`;

const strongDesignSnippet = `order.Ship()`;

const shipRuleSnippet = `si no está pagado -> error`;

const serviceFlowSnippet = `OrderService
  obtiene productos
  llama Order.Create(products)`;

const createRuleSnippet = `si products vacío -> error`;

const architectureSnippet = `Controller
  ↓
Service
  ↓
Entidad (métodos del dominio)`;

const entityMethodsSnippet = `Order.Create()
Order.AddItem()
Order.Ship()`;

const invalidAssignmentsSnippet = `order.Total = -5
order.Status = Shipped`;

const miniInvariantsSnippet = `- total >= 0
- debe tener al menos 1 producto
- no puede enviarse si no está pagado`;

const badApproachSnippet = `Controller valida
Service crea sin proteger reglas
Entidad acepta cualquier estado`;

const goodApproachSnippet = `Order.Create()
Order.AddItem()
Order.Ship()`;

const checklistSnippet = `[ ] Intentar crear pedido con total negativo
[ ] Intentar crear pedido sin productos
[ ] Intentar enviar pedido no pagado
[ ] Validar que ningún flujo pueda saltarse estas reglas`;

export default function Daily42Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/41";
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
              <div className={styles.brandSub}>1 lección al día • aprendizaje visible • criterio real</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegación">
            <Link className={styles.pill} href="/daily">
              Archivo
            </Link>
            <Link className={styles.pill} href="/">
              Sobre mí
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/41">
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
                <div className={styles.createdAt}>10/04/2026</div>
                <div className={styles.badge}>Daily #42 • Backend Foundations</div>
                <h2 className={styles.title}>Invariantes: reglas que nunca pueden romperse</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>7-12 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Dominio</span>
                  <span className={styles.chip}>Tag: Invariantes</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Un invariante es una condición que siempre debe ser verdadera. Si se rompe, el sistema queda en un
                  estado inválido.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>No depende del endpoint ni del flujo; depende del dominio.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Un invariante no es opcional: debe sostenerse siempre.</div>
                  <p>Ejemplos:</p>
                  <pre>{nonNegativeSnippet}</pre>
                  <pre>{uniqueEmailSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="validacion-vs-invariante">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Diferencia con validación</h3>
                    <p className={styles.sub}>Validar entrada no es lo mismo que proteger estado interno.</p>
                  </div>
                  <span className={styles.chip}>Fundamento</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Validación: puede fallar en la entrada del request.</li>
                    <li>Invariante: no puede existir violada dentro del sistema.</li>
                  </ul>
                  <p>Si se viola una invariante, el sistema queda corrupto.</p>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Cómo piensa un backend developer</h3>
                    <p className={styles.sub}>Primero identifica condiciones no negociables; luego diseña el modelo.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>¿Qué condiciones nunca deben romperse?</li>
                    <li>¿Qué datos harían inválido el sistema?</li>
                    <li>¿Dónde debo proteger cada regla?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="donde-van">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Dónde van esas condiciones de dominio</h3>
                    <p className={styles.sub}>Principalmente en entidades y métodos que modifican su estado.</p>
                  </div>
                  <span className={styles.chip}>Diseño</span>
                </div>
                <div className={styles.sbd}>
                  <p>Las invariantes deben vivir dentro del dominio, no en controllers o queries.</p>
                  <ul className={styles.bullets}>
                    <li>Entidad: protege su estado.</li>
                    <li>Métodos de dominio: validan transiciones.</li>
                    <li>Controller: solo valida formato.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="metodos">
                <div className={styles.shd}>
                  <div>
                    <h3>5. En métodos, no en propiedades libres</h3>
                    <p className={styles.sub}>Evita asignaciones directas que permitan estados inválidos.</p>
                  </div>
                  <span className={styles.chip}>Encapsulación</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Diseño débil</h4>
                  <pre>{weakDesignSnippet}</pre>

                  <h4>Diseño sano</h4>
                  <pre>{strongDesignSnippet}</pre>
                  <pre>{shipRuleSnippet}</pre>

                  <div className={styles.callout}>Nadie desde fuera debería poder romper el objeto.</div>
                </div>
              </section>

              <section className={styles.section} id="service-vs-entidad">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Service vs Entidad</h3>
                    <p className={styles.sub}>El service coordina; la entidad impone invariantes.</p>
                  </div>
                  <span className={styles.chip}>Responsabilidades</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{serviceFlowSnippet}</pre>
                  <p>Dentro de la entidad:</p>
                  <pre>{createRuleSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="cuando-no-entidad">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Cuándo no va en la entidad</h3>
                    <p className={styles.sub}>Si requiere mirar fuera, suele ir en Service o Domain Service.</p>
                  </div>
                  <span className={styles.chip}>Límite</span>
                </div>
                <div className={styles.sbd}>
                  <p>Ejemplo clásico: email único. Requiere consultar almacenamiento externo.</p>
                  <ul className={styles.bullets}>
                    <li>Reglas internas de estado: entidad.</li>
                    <li>Reglas que consultan DB o servicios: service/domain service.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Cómo se ve en .NET</h3>
                    <p className={styles.sub}>Flujo sano: Controller → Service → Entidad.</p>
                  </div>
                  <span className={styles.chip}>Implementación</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{architectureSnippet}</pre>
                  <p>Métodos donde viven reglas críticas:</p>
                  <pre>{entityMethodsSnippet}</pre>
                  <p>Evitar asignaciones directas como:</p>
                  <pre>{invalidAssignmentsSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="ejemplo-concreto">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Ejemplo concreto</h3>
                    <p className={styles.sub}>No enviar pedido no pagado.</p>
                  </div>
                  <span className={styles.chip}>Caso real</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Mal enfoque</h4>
                  <pre>{`Controller:
  si no está pagado -> error`}</pre>
                  <p>Otro flujo interno puede saltarse esa validación.</p>

                  <h4>Buen enfoque</h4>
                  <pre>{`Order.Ship()
  si no está pagado -> error`}</pre>
                  <p>La regla se cumple siempre, venga de donde venga la llamada.</p>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Cómo lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas inconsistencias según el camino de ejecución.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Una regla se cumple en un endpoint pero no en otro.</li>
                    <li>Puedes forzar estados imposibles.</li>
                    <li>Hay datos inválidos en DB.</li>
                    <li>El resultado cambia según el flujo que lo ejecuta.</li>
                  </ul>
                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Las invariantes deben vivir dentro del modelo, no del endpoint.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend junior valida inputs. Backend senior protege invariantes desde el dominio.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Identificar invariantes y decidir dónde deben vivir.</p>
                  </div>
                  <span className={styles.chip}>Práctica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Objetivo: separar reglas internas de reglas que dependen de infraestructura.</p>

                  <p>Entidad de trabajo:</p>
                  <pre>{`Order`}</pre>

                  <p>Paso 1: define invariantes</p>
                  <pre>{miniInvariantsSnippet}</pre>

                  <p>Paso 2: clasifica</p>
                  <ul className={styles.bullets}>
                    <li>Total no negativo: entidad.</li>
                    <li>Al menos un producto: entidad.</li>
                    <li>No enviar sin pagar: entidad.</li>
                    <li>Email único: service/domain service.</li>
                  </ul>

                  <p>Paso 3: compara enfoques</p>
                  <h4>Enfoque malo</h4>
                  <pre>{badApproachSnippet}</pre>

                  <h4>Enfoque bueno</h4>
                  <pre>{goodApproachSnippet}</pre>

                  <p>Pregunta final:</p>
                  <pre>{`¿Desde fuera puedo dejar este objeto en un estado inválido?`}</pre>

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
                  <h2>Resumen rápido</h2>
                  <p>Día 42 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> invariantes = reglas que nunca pueden romperse.
                </div>
                <div className={styles.li}>
                  <strong>Diseño:</strong> entidad protege estado; service coordina.
                </div>
                <div className={styles.li}>
                  <strong>Práctica:</strong> clasificar qué reglas van en entidad y cuáles no.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
