"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const cacheFlowSnippet = `public async Task<IReadOnlyList<ProductDto>> GetCatalogAsync(CancellationToken ct)
{
  const string cacheKey = "catalog:products:v1";

  if (_memoryCache.TryGetValue(cacheKey, out IReadOnlyList<ProductDto>? cached) && cached is not null)
  {
    return cached; // 1) cache hit
  }

  var products = await _products.QueryCatalogAsync(ct); // 2) fallback a DB

  _memoryCache.Set(
    cacheKey,
    products,
    new MemoryCacheEntryOptions
    {
      AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
    }); // 3) guardar en cache

  return products;
}`;

const invalidationSnippet = `// Cuando actualizas un producto, invalidas su cache relacionada
await _products.UpdatePriceAsync(productId, newPrice, ct);
await _distributedCache.RemoveAsync("catalog:products:v1", ct);`;

const checklistSnippet = `[ ] Medir diferencia de latencia entre cache hit y cache miss
[ ] Verificar tiempo de expiracion esperado (TTL)
[ ] Confirmar que cambios de datos invalidan cache relevante
[ ] Probar inconsistencias temporales despues de actualizar`;

export default function Daily21Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/20";
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
            <Link className={styles.btn} href="/daily/20">
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
                <div className={styles.badge}>Daily #21 • Backend Foundations</div>
                <h2 className={styles.title}>Cache: no todo debe calcularse siempre</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Performance</span>
                  <span className={styles.chip}>Tag: Cache</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Cache guarda resultados calculados para evitar trabajo repetido y responder mucho mas rapido.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Un cache es una copia temporal para acelerar lecturas frecuentes.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Se aplica cuando un dato se consulta mucho y cambia poco.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Catalogo de tienda con miles de consultas por minuto.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Sin cache: cada request va a base de datos.</li>
                    <li>Con cache: respuesta desde memoria o Redis.</li>
                    <li>Resultado: menor latencia y menos carga de DB.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Cache es trade-off entre velocidad y frescura del dato.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Esto se consulta mucho?</li>
                    <li>Cuanto tiempo puede estar levemente desactualizado?</li>
                    <li>Vale recalcular en cada request?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>IMemoryCache, Redis y response caching segun necesidad.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>IMemoryCache para datos locales por instancia.</li>
                    <li>Redis para cache distribuido.</li>
                    <li>Response caching para respuestas HTTP repetibles.</li>
                  </ul>

                  <pre>{cacheFlowSnippet}</pre>
                  <pre>{invalidationSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Datos temporales desactualizados pueden ser comportamiento esperado.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Endpoints muy rapidos con mucha informacion.</li>
                    <li>Datos que tardan segundos en reflejar cambios.</li>
                    <li>Inconsistencias temporales tras actualizaciones.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Cache existe para evitar trabajo repetido, no para duplicar logica.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend profesional usa cache solo donde aporta valor real.
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
                  <p>Dia 21 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> cache evita trabajo costoso repetido.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> IMemoryCache/Redis + invalidacion correcta.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> velocidad sin estrategia de frescura genera confusiones.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
