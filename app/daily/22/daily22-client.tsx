"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const timeoutSnippet = `public async Task<PaymentResult> ChargeAsync(PaymentRequest request, CancellationToken ct)
{
  using var timeoutCts = CancellationTokenSource.CreateLinkedTokenSource(ct);
  timeoutCts.CancelAfter(TimeSpan.FromSeconds(3));

  var response = await _httpClient.PostAsJsonAsync(
    "/payments/charge",
    request,
    timeoutCts.Token
  );

  if (!response.IsSuccessStatusCode)
    throw new ExternalServiceException("PAYMENT_GATEWAY_ERROR");

  return await response.Content.ReadFromJsonAsync<PaymentResult>(cancellationToken: timeoutCts.Token)
    ?? throw new ExternalServiceException("INVALID_PAYMENT_RESPONSE");
}`;

const resilientSnippet = `// Ejemplo de configuracion en startup
builder.Services.AddHttpClient<IPaymentGateway, PaymentGateway>(client =>
{
  client.BaseAddress = new Uri("https://payments.internal");
  client.Timeout = TimeSpan.FromSeconds(5);
});

// Nota: Polly puede agregar retry/circuit-breaker sobre este cliente`;

const checklistSnippet = `[ ] Simular servicio externo lento y medir tiempo de corte
[ ] Verificar que el endpoint falla en tiempo controlado
[ ] Revisar que no queden requests colgadas indefinidamente
[ ] Probar cascada de errores cuando dependencia externa cae`;

export default function Daily22Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/21";
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
            <Link className={styles.btn} href="/daily/21">
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
                <div className={styles.badge}>Daily #22 • Backend Foundations</div>
                <h2 className={styles.title}>Sin timeouts, tu backend puede quedarse bloqueado</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Resiliencia</span>
                  <span className={styles.chip}>Tag: Timeout</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Un backend robusto define cuanto espera; no deja llamadas externas bloqueando recursos sin limite.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Timeout define cuando abandonar una operacion que no responde.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Sin timeout, un backend puede quedarse esperando indefinidamente y degradar todo el sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo simple</h3>
                    <p className={styles.sub}>Servicio de pagos lento puede congestionar toda la API.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Normal: responde en 300 ms.</li>
                    <li>Incidente: servicio se cuelga y no responde.</li>
                    <li>Sin timeout: requests acumuladas y threads ocupados.</li>
                    <li>Con timeout: corte controlado y error gestionado.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Define tiempos limite segun riesgo y experiencia esperada.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Que pasa si el externo no responde?</li>
                    <li>Cuanto tiempo tiene sentido esperar?</li>
                    <li>Conviene reintentar o fallar rapido?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>HttpClient, CancellationToken y politicas de resiliencia.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Timeout en HttpClient para limites globales.</li>
                    <li>CancellationToken para cortes por operacion.</li>
                    <li>Polly para retry/circuit-breaker segun criticidad.</li>
                  </ul>

                  <pre>{timeoutSnippet}</pre>
                  <pre>{resilientSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Un sistema lento puede arrastrar a otros si no hay limites claros.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Endpoints cargando demasiado tiempo.</li>
                    <li>Requests que no terminan.</li>
                    <li>Cascadas de errores ante caida externa.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Backend robusto sabe cuando dejar de esperar y fallar rapido.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Definir tiempos limite es parte central del diseno profesional en backend.
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
                  <p>Dia 22 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> timeout protege recursos y estabilidad.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> HttpClient + CancellationToken + resiliencia.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> sin limites, un externo lento congestiona todo.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
