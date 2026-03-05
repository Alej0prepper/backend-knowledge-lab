"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const badSnippet = `// Anti-pattern: cada capa decide por su cuenta
var dbPrice = product.Price;
var cachePrice = cachedProduct.Price;
var uiPrice = request.ClientSidePrice;

// Cual es el oficial?
var finalPrice = Math.Min(dbPrice, Math.Min(cachePrice, uiPrice));`;

const sourceOfTruthSnippet = `public class ProductService
{
  private readonly IProductRepository _products;
  private readonly IDistributedCache _cache;

  public ProductService(IProductRepository products, IDistributedCache cache)
  {
    _products = products;
    _cache = cache;
  }

  public async Task UpdatePriceAsync(Guid productId, decimal newPrice, CancellationToken ct)
  {
    var product = await _products.GetByIdAsync(productId, ct)
      ?? throw new DomainException("PRODUCT_NOT_FOUND");

    product.UpdatePrice(newPrice); // regla central en dominio
    await _products.SaveAsync(product, ct);

    // cache replica estado oficial; no decide precio
    await _cache.RemoveAsync($"product:{productId}", ct);
  }
}`;

const checklistSnippet = `[ ] Verificar mismo valor en API, UI y reportes
[ ] Buscar endpoints que calculen/reescriban el mismo dato
[ ] Forzar actualizacion y validar propagacion consistente
[ ] Confirmar que cache replica y no define valores oficiales`;

export default function Daily17Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/16";
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
            <Link className={styles.btn} href="/daily/16">
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
                <div className={styles.badge}>Daily #17 • Backend Foundations</div>
                <h2 className={styles.title}>Source of Truth: una sola fuente de verdad</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: Datos</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Si el mismo dato vive en varios lugares sin control, tarde o temprano se desincroniza.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Cada dato importante debe tener una unica fuente confiable.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Source of Truth significa que existe un unico dueño oficial para cada dato critico.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Precio de producto repetido en multiples lugares genera inconsistencias.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Precio en base de datos.</li>
                    <li>Precio en cache.</li>
                    <li>Precio en frontend.</li>
                    <li>Precio en otra tabla.</li>
                  </ul>

                  <div className={styles.quote}>
                    Backend profesional define: el precio oficial vive aqui; el resto lee o deriva de ahi.
                  </div>

                  <pre>{badSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Primero identifica dueño del dato, luego define reglas de escritura.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Donde vive realmente este dato?</li>
                    <li>Quien tiene permiso para modificarlo?</li>
                    <li>Que sistemas dependen de el?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Servicios dueños de escritura y cache como replica, no como autoridad.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Services responsables de un tipo de dato.</li>
                    <li>Reglas claras de escritura.</li>
                    <li>Cache que replica, no decide.</li>
                    <li>Sin logica duplicada entre servicios.</li>
                  </ul>

                  <pre>{sourceOfTruthSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Valores distintos entre canales suelen indicar multiples fuentes.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Un valor cambia en una pantalla pero no en otra.</li>
                    <li>Datos inconsistentes entre endpoints.</li>
                    <li>Informacion distinta en reportes y API.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Cada dato importante del sistema debe tener un unico dueño.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Cuando buscas quien es dueño del dato, ya estas pensando como backend engineer.
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
                  <p>Dia 17 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> cada dato critico necesita un dueño unico.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> ProductService escribe; cache solo replica.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> fuentes multiples generan inconsistencia sistemica.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
