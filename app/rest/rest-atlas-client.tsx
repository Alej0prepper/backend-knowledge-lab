"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./rest-page.module.css";

type TabKey = "req" | "ok" | "err";

type AccordionKey = "m" | "s" | "p" | "a";

const methodRows = [
  {
    method: "GET",
    use: "Leer recursos",
    safe: "Si",
    idempotent: "Si",
    note: "Cacheable con ETag / Cache-Control",
    safeTag: "ok",
    idemTag: "ok",
  },
  {
    method: "POST",
    use: "Crear o ejecutar accion",
    safe: "No",
    idempotent: "No",
    note: "Usar Idempotency-Key en flujos criticos",
    safeTag: "bad",
    idemTag: "bad",
  },
  {
    method: "PUT",
    use: "Reemplazar recurso completo",
    safe: "No",
    idempotent: "Si",
    note: "Actualizacion total determinista (ideal con If-Match)",
    safeTag: "bad",
    idemTag: "ok",
  },
  {
    method: "PATCH",
    use: "Actualizar parcialmente",
    safe: "No",
    idempotent: "Depende",
    note: "Define estrategia clara de merge",
    safeTag: "bad",
    idemTag: "warn",
  },
  {
    method: "DELETE",
    use: "Eliminar recurso",
    safe: "No",
    idempotent: "Si",
    note: "204 o 404 segun politica; considera soft delete",
    safeTag: "bad",
    idemTag: "ok",
  },
] as const;

const statusRows = [
  ["200", "Operacion correcta con body", "2xx"],
  ["201", "Creado (ideal incluir Location)", "2xx"],
  ["204", "Correcto sin body", "2xx"],
  ["400", "Request invalido / parametros mal", "4xx"],
  ["401", "No autenticado", "4xx"],
  ["403", "Sin permiso", "4xx"],
  ["404", "No encontrado", "4xx"],
  ["409", "Conflicto de estado / concurrencia", "4xx"],
  ["422", "Regla de negocio no cumplida", "4xx"],
  ["429", "Rate limit", "4xx"],
  ["500", "Error no controlado", "5xx"],
] as const;

const codeByTab: Record<TabKey, string> = {
  req: `POST /api/v1/orders
Content-Type: application/json
Idempotency-Key: 6dcb9cb0-cf17-4f70

{
  "customerId": "cus_123",
  "shippingAddressId": "addr_909",
  "items": [
    { "sku": "sku-abc", "qty": 2, "unitPrice": 74.99 }
  ]
}`,
  ok: `HTTP/1.1 201 Created
Location: /api/v1/orders/ord_901
ETag: "order-v1-ord_901"

{
  "id": "ord_901",
  "status": "created",
  "total": 149.98,
  "currency": "USD",
  "createdAt": "2026-02-16T15:00:00Z",
  "links": {
    "self": "/api/v1/orders/ord_901",
    "payments": "/api/v1/orders/ord_901/payments"
  }
}`,
  err: `HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json
X-Request-Id: req_8f31

{
  "type": "https://api.example.com/problems/invalid-order",
  "title": "Invalid order payload",
  "status": 422,
  "code": "ORDER_ITEM_SKU_UNKNOWN",
  "detail": "sku sku-abc is not active",
  "requestId": "req_8f31",
  "errors": [
    { "field": "items[0].sku", "message": "Unknown SKU" }
  ]
}`,
};

const sectionIds = ["pilares", "framework", "semantica", "contrato", "antip", "rubrica"] as const;

const weights = [18, 16, 14, 12, 10] as const;

export default function RestAtlasClient() {
  const [activeTab, setActiveTab] = useState<TabKey>("req");
  const [copyLabel, setCopyLabel] = useState("Copiar");
  const [activeSection, setActiveSection] = useState<string>("pilares");
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false, false]);
  const [acc, setAcc] = useState<Record<AccordionKey, boolean>>({
    m: true,
    s: false,
    p: false,
    a: false,
  });

  const { pct, level } = useMemo(() => {
    const total = weights.reduce((sum, item) => sum + item, 0);
    const got = checks.reduce((sum, checked, idx) => (checked ? sum + weights[idx] : sum), 0);
    const percent = total ? Math.round((got / total) * 100) : 0;

    let maturity = "Base";
    if (percent >= 70) maturity = "Avanzado";
    else if (percent >= 40) maturity = "Intermedio";

    return { pct: percent, level: maturity };
  }, [checks]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      const key = event.key.toLowerCase();
      if (key === "h") window.location.hash = "#home";
      if (key === "r") window.location.hash = "#ruta";
      if (key === "p") window.location.hash = "#rubrica";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeByTab[activeTab]);
      setCopyLabel("Copiado ✓");
    } catch {
      setCopyLabel("No se pudo copiar");
    } finally {
      window.setTimeout(() => setCopyLabel("Copiar"), 1200);
    }
  };

  const toggleAcc = (key: AccordionKey) => {
    setAcc((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCheck = (index: number) => {
    setChecks((prev) => prev.map((value, idx) => (idx === index ? !value : value)));
  };

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true" />
            <div>
              <h1>REST ATLAS</h1>
              <div className={styles.sub}>Learning + Craft • criterio backend en produccion</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegacion">
            <a className={styles.pill} href="#ruta">
              Ruta
            </a>
            <a className={styles.pill} href="#pilares">
              Pilares
            </a>
            <a className={styles.pill} href="#semantica">
              Semantica HTTP
            </a>
            <a className={styles.pill} href="#contrato">
              Contrato robusto
            </a>
            <a className={styles.pill} href="#rubrica">
              Rubrica
            </a>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/">
              Volver <span className={styles.kbd}>H</span>
            </Link>
            <a className={`${styles.btn} ${styles.primary}`} href="#ruta">
              Empezar ruta <span className={styles.kbd}>R</span>
            </a>
            <a className={styles.btn} href="#rubrica">
              Ver rubrica <span className={styles.kbd}>P</span>
            </a>
          </div>
        </div>
      </header>

      <main className={styles.container} id="home">
        <div className={styles.grid}>
          <section className={styles.card}>
            <div className={styles.hero}>
              <div className={styles.titleRow}>
                <div>
                  <div className={styles.badge}>Atlas • de fundamentos a criterio arquitectonico</div>
                  <h3>Aprende REST como se opera en produccion</h3>
                  <p className={styles.lead}>
                    Disena recursos, contratos y politicas operables: compatibilidad al evolucionar, idempotencia en
                    flujos criticos, errores uniformes, trazabilidad por request y semantica HTTP sin ambiguedad.
                  </p>
                  <div className={styles.ctaRow}>
                    <a className={`${styles.btn} ${styles.primary}`} href="#ruta">
                      Empezar ruta
                    </a>
                    <a className={styles.btn} href="#contrato">
                      Ver ejemplo pro
                    </a>
                    <a className={styles.btn} href="#rubrica">
                      Autoevaluarme
                    </a>
                  </div>
                </div>

                <div className={styles.winsWrap}>
                  <div className={styles.wins}>
                    <div className={styles.win}>
                      <div className={styles.t}>Foco</div>
                      <div className={styles.v}>Recursos, contratos y operacion en produccion.</div>
                    </div>
                    <div className={styles.win}>
                      <div className={styles.t}>Perfil</div>
                      <div className={styles.v}>Backend dev que quiere subir nivel tecnico real.</div>
                    </div>
                    <div className={styles.win}>
                      <div className={styles.t}>Resultado</div>
                      <div className={styles.v}>
                        API mantenible, medible, segura y facil de evolucionar.
                        <div className={styles.chipsWrap}>
                          <span className={styles.chip}>ETag/If-Match</span>
                          <span className={styles.chip}>Idempotency-Key</span>
                          <span className={styles.chip}>Problem Details</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="ruta" className={styles.stepper} aria-label="Ruta de aprendizaje">
                <div className={`${styles.step} ${styles.active}`}>
                  <div className={styles.lvl}>
                    Nivel 1 <span className={`${styles.tag} ${styles.ok}`}>base</span>
                  </div>
                  <div className={styles.name}>Fundamentos y lenguaje REST</div>
                  <ul>
                    <li>Recursos vs acciones</li>
                    <li>Safe / idempotencia</li>
                    <li>Colecciones y detalle</li>
                  </ul>
                  <div className={styles.indicator}>Indicador: CRUD consistente sin romper semantica HTTP.</div>
                </div>

                <div className={styles.step}>
                  <div className={styles.lvl}>
                    Nivel 2 <span className={`${styles.tag} ${styles.warn}`}>contratos</span>
                  </div>
                  <div className={styles.name}>Diseno de APIs que escalan</div>
                  <ul>
                    <li>Versionado</li>
                    <li>Filtros / paginacion</li>
                    <li>Error unico</li>
                  </ul>
                  <div className={styles.indicator}>Indicador: compatibilidad al evolucionar features.</div>
                </div>

                <div className={styles.step}>
                  <div className={styles.lvl}>
                    Nivel 3 <span className={`${styles.tag} ${styles.warn}`}>produccion</span>
                  </div>
                  <div className={styles.name}>Confiabilidad en produccion</div>
                  <ul>
                    <li>AuthN/AuthZ</li>
                    <li>Rate limiting</li>
                    <li>Request IDs + trazas</li>
                  </ul>
                  <div className={styles.indicator}>Indicador: metricas, trazas y politicas de retries.</div>
                </div>

                <div className={styles.step}>
                  <div className={styles.lvl}>
                    Nivel 4 <span className={styles.tag}>trade-offs</span>
                  </div>
                  <div className={styles.name}>Criterio arquitectonico</div>
                  <ul>
                    <li>Bounded contexts</li>
                    <li>Consistencia / idempotencia</li>
                    <li>Integraciones</li>
                  </ul>
                  <div className={styles.indicator}>Indicador: argumentas REST vs webhooks vs GraphQL.</div>
                </div>
              </div>
            </div>

            <div className={styles.bd}>
              <div className={styles.subnav}>
                <a href="#pilares" className={activeSection === "pilares" ? styles.active : undefined}>
                  Pilares
                </a>
                <a href="#framework" className={activeSection === "framework" ? styles.active : undefined}>
                  Decision
                </a>
                <a href="#semantica" className={activeSection === "semantica" ? styles.active : undefined}>
                  Semantica
                </a>
                <a href="#contrato" className={activeSection === "contrato" ? styles.active : undefined}>
                  Contrato
                </a>
                <a href="#antip" className={activeSection === "antip" ? styles.active : undefined}>
                  Anti-patrones
                </a>
                <a href="#rubrica" className={activeSection === "rubrica" ? styles.active : undefined}>
                  Rubrica
                </a>
              </div>

              <section className={styles.section} id="pilares">
                <h4>Pilares REST que nunca debes romper</h4>
                <p>Reglas de diseno que evitan APIs confusas y dificiles de operar.</p>

                <div className={styles.tri}>
                  <div className={styles.mini}>
                    <div className={styles.k}>Resource-first</div>
                    <div className={styles.v}>
                      Modela entidades de negocio antes que acciones: <span className={styles.chip}>/orders</span>{" "}
                      <span className={styles.chip}>/users</span>.
                    </div>
                  </div>
                  <div className={styles.mini}>
                    <div className={styles.k}>HTTP semantico</div>
                    <div className={styles.v}>Metodos con naturaleza intacta: safe, idempotente, mutable.</div>
                  </div>
                  <div className={styles.mini}>
                    <div className={styles.k}>Stateless</div>
                    <div className={styles.v}>Cada request es autosuficiente para auth, autorizacion y procesamiento.</div>
                  </div>
                  <div className={styles.mini}>
                    <div className={styles.k}>Cache inteligente</div>
                    <div className={styles.v}>ETag + Cache-Control para performance predecible y revalidacion segura.</div>
                  </div>
                  <div className={styles.mini}>
                    <div className={styles.k}>Contratos estables</div>
                    <div className={styles.v}>Versiona, documenta y depreca con reglas claras.</div>
                  </div>
                  <div className={styles.mini}>
                    <div className={styles.k}>Operacion</div>
                    <div className={styles.v}>Logs estructurados + metricas por endpoint + trazas por requestId.</div>
                  </div>
                </div>
              </section>

              <section className={styles.section} id="framework">
                <h4>Framework para decidir si REST es ideal</h4>
                <p>REST gana cuando el dominio es resource-friendly y necesitas contratos simples y cacheables.</p>

                <div className={styles.two}>
                  <div className={`${styles.ap} ${styles.ok}`}>
                    <div className={styles.k}>
                      REST gana cuando... <span className={`${styles.tag} ${styles.ok}`}>si</span>
                    </div>
                    <div className={styles.v}>
                      <ul className={styles.ulMuted}>
                        <li>API publica simple y cacheable.</li>
                        <li>Dominio modelable como recursos y colecciones.</li>
                        <li>Observabilidad directa por endpoint + metodo.</li>
                      </ul>
                    </div>
                  </div>

                  <div className={`${styles.ap} ${styles.bad}`}>
                    <div className={styles.k}>
                      Complementa cuando... <span className={`${styles.tag} ${styles.bad}`}>evalua</span>
                    </div>
                    <div className={styles.v}>
                      <ul className={styles.ulMuted}>
                        <li>Realtime/subscriptions: webhooks o SSE.</li>
                        <li>Agregacion profunda para UI: GraphQL.</li>
                        <li>Enterprise legacy: SOAP/WSDL o adaptadores.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.section} id="semantica">
                <h4>Semantica HTTP aplicada</h4>
                <p>
                  Lo que diferencia una API correcta de una API confusa es la operabilidad: cache, retries, debugging
                  y trazas.
                </p>

                <table aria-label="Metodos HTTP">
                  <thead>
                    <tr>
                      <th>Metodo</th>
                      <th>Uso</th>
                      <th>Safe</th>
                      <th>Idempotente</th>
                      <th>Nota de implementacion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {methodRows.map((row) => (
                      <tr key={row.method}>
                        <td>
                          <span className={styles.tag}>{row.method}</span>
                        </td>
                        <td>{row.use}</td>
                        <td>
                          <span className={`${styles.tag} ${styles[row.safeTag]}`}>{row.safe}</span>
                        </td>
                        <td>
                          <span className={`${styles.tag} ${styles[row.idemTag]}`}>{row.idempotent}</span>
                        </td>
                        <td>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <table aria-label="Status codes" className={styles.tableTop}>
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Significado</th>
                      <th>Grupo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statusRows.map(([code, meaning, group]) => (
                      <tr key={code}>
                        <td>
                          <span className={styles.tag}>{code}</span>
                        </td>
                        <td>{meaning}</td>
                        <td>{group}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <section className={styles.section} id="contrato">
                <h4>Muestra de conocimiento: contrato de endpoint robusto</h4>
                <p>Ejemplo con idempotencia, ubicacion del recurso, ETag y error uniforme (Problem Details).</p>

                <div className={`${styles.card} ${styles.noShadow}`}>
                  <div className={styles.bd}>
                    <div className={styles.tabs} role="tablist" aria-label="Contrato">
                      <button
                        type="button"
                        role="tab"
                        className={`${styles.tab} ${activeTab === "req" ? styles.active : ""}`}
                        onClick={() => setActiveTab("req")}
                        aria-selected={activeTab === "req"}
                      >
                        Request
                      </button>
                      <button
                        type="button"
                        role="tab"
                        className={`${styles.tab} ${activeTab === "ok" ? styles.active : ""}`}
                        onClick={() => setActiveTab("ok")}
                        aria-selected={activeTab === "ok"}
                      >
                        Success (201)
                      </button>
                      <button
                        type="button"
                        role="tab"
                        className={`${styles.tab} ${activeTab === "err" ? styles.active : ""}`}
                        onClick={() => setActiveTab("err")}
                        aria-selected={activeTab === "err"}
                      >
                        Error (422)
                      </button>
                    </div>

                    <div className={styles.panelInner}>
                      <pre>{codeByTab[activeTab]}</pre>
                    </div>

                    <div className={styles.codeMeta}>
                      <div className={styles.hdrs}>
                        <span className={styles.chip}>Location</span>
                        <span className={styles.chip}>ETag</span>
                        <span className={styles.chip}>X-Request-Id</span>
                        <span className={styles.chip}>application/problem+json</span>
                      </div>
                      <div className={styles.metaActions}>
                        <div className={styles.hint}>Tip: este bloque esta pensado para copy & paste en docs.</div>
                        <button className={styles.copy} type="button" onClick={onCopy}>
                          {copyLabel}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.section} id="antip">
                <h4>Anti-patrones comunes y alternativa profesional</h4>
                <p>Evita el &quot;funciona hoy&quot; que rompe manana. Aqui se compra compatibilidad y operabilidad.</p>

                <div className={styles.two}>
                  <div className={`${styles.ap} ${styles.bad}`}>
                    <div className={styles.k}>
                      Evita <span className={`${styles.tag} ${styles.bad}`}>anti</span>
                    </div>
                    <div className={styles.v}>
                      Endpoints verbosos tipo <code>/getUserById</code> o <code>/createPaymentNow</code>.
                      <br />
                      Respuestas de error distintas por endpoint.
                      <br />
                      Ignorar concurrencia en actualizaciones.
                      <br />
                      Versionado improvisado por query string sin politica.
                    </div>
                  </div>

                  <div className={`${styles.ap} ${styles.ok}`}>
                    <div className={styles.k}>
                      Haz esto <span className={`${styles.tag} ${styles.ok}`}>pro</span>
                    </div>
                    <div className={styles.v}>
                      Recursos claros: <code>GET /users/{"{id}"}</code>, <code>POST /payments</code>.
                      <br />
                      Error unificado con <code>code</code>, <code>detail</code>, <code>errors[]</code>, <code>requestId</code>.
                      <br />
                      <code>ETag</code> + <code>If-Match</code> contra lost updates.
                      <br />
                      Versionado explicito (path o header) con deprecacion documentada.
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.section} id="rubrica">
                <div className={styles.rubricHead}>
                  <div>
                    <h4>Rubrica de calidad REST (autoevaluacion)</h4>
                    <p className={styles.muted}>Si se puede verificar, se puede mantener. Si no, es opinion.</p>
                  </div>
                  <div className={styles.score} aria-label="Score">
                    <span>Madurez</span>
                    <div className={styles.bar} aria-hidden="true">
                      <div className={styles.fill} style={{ width: `${Math.max(10, pct)}%` }} />
                    </div>
                    <span>{level}</span>
                  </div>
                </div>

                <table aria-label="Rubrica">
                  <thead>
                    <tr>
                      <th>Eje</th>
                      <th>Criterio verificable</th>
                      <th>Madurez esperada</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Diseno de recursos</td>
                      <td>URLs consistentes, nombres estables, relaciones claras</td>
                      <td>Base</td>
                    </tr>
                    <tr>
                      <td>Contratos</td>
                      <td>OpenAPI vigente y ejemplos reales de request/response</td>
                      <td>Intermedio</td>
                    </tr>
                    <tr>
                      <td>Confiabilidad</td>
                      <td>Idempotencia, retries seguros, timeouts y circuit breakers</td>
                      <td>Intermedio</td>
                    </tr>
                    <tr>
                      <td>Seguridad</td>
                      <td>AuthN/AuthZ, scopes, validacion estricta y rate limiting</td>
                      <td>Avanzado</td>
                    </tr>
                    <tr>
                      <td>Operacion</td>
                      <td>SLI/SLO, logs estructurados, trazas y alertas accionables</td>
                      <td>Avanzado</td>
                    </tr>
                  </tbody>
                </table>

                <div className={styles.check}>
                  <input type="checkbox" checked={checks[0]} onChange={() => toggleCheck(0)} />
                  <div>
                    <strong>Contratos</strong> — tengo OpenAPI vigente + ejemplos de exito/error consistentes.
                  </div>
                </div>
                <div className={styles.check}>
                  <input type="checkbox" checked={checks[1]} onChange={() => toggleCheck(1)} />
                  <div>
                    <strong>Operacion</strong> — requestId, logs estructurados y metricas por endpoint.
                  </div>
                </div>
                <div className={styles.check}>
                  <input type="checkbox" checked={checks[2]} onChange={() => toggleCheck(2)} />
                  <div>
                    <strong>Confiabilidad</strong> — idempotencia + retries + timeouts definidos por policy.
                  </div>
                </div>
                <div className={styles.check}>
                  <input type="checkbox" checked={checks[3]} onChange={() => toggleCheck(3)} />
                  <div>
                    <strong>Seguridad</strong> — AuthZ por scopes/roles + rate limiting por cliente.
                  </div>
                </div>
                <div className={styles.check}>
                  <input type="checkbox" checked={checks[4]} onChange={() => toggleCheck(4)} />
                  <div>
                    <strong>Concurrencia</strong> — ETag/If-Match para updates donde importa.
                  </div>
                </div>

                <div className={styles.footerActions}>
                  <a className={`${styles.btn} ${styles.primary}`} href="#ruta">
                    Releer ruta
                  </a>
                  <a className={styles.btn} href="#semantica">
                    Ir a semantica HTTP
                  </a>
                  <a className={styles.btn} href="#home">
                    Volver al inicio
                  </a>
                </div>
              </section>
            </div>
          </section>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Referencia rapida</h2>
                  <p>Atajos para disenar y operar sin ambiguedad.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.accordion}>
                  <div className={`${styles.item} ${acc.m ? styles.open : ""}`}>
                    <button type="button" onClick={() => toggleAcc("m")}>
                      Metodos HTTP <span>safe • idempotencia</span>
                    </button>
                    <div className={styles.content}>
                      <div className={styles.list}>
                        <div className={styles.li}>
                          <strong>GET</strong> = lectura safe + cacheable con <code>ETag</code>.
                        </div>
                        <div className={styles.li}>
                          <strong>POST</strong> = creacion/accion; en critico usa <code>Idempotency-Key</code>.
                        </div>
                        <div className={styles.li}>
                          <strong>PUT</strong>/<strong>PATCH</strong> = updates; considera <code>If-Match</code>.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.item} ${acc.s ? styles.open : ""}`}>
                    <button type="button" onClick={() => toggleAcc("s")}>
                      Status codes <span>operabilidad</span>
                    </button>
                    <div className={styles.content}>
                      <div className={styles.list}>
                        <div className={styles.li}>
                          <strong>201</strong> con <code>Location</code> = contrato limpio de creacion.
                        </div>
                        <div className={styles.li}>
                          <strong>409</strong> = conflicto (estado/concurrencia), no error generico.
                        </div>
                        <div className={styles.li}>
                          <strong>422</strong> = regla de negocio, no validacion sintactica.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.item} ${acc.p ? styles.open : ""}`}>
                    <button type="button" onClick={() => toggleAcc("p")}>
                      Pilares <span>no negociables</span>
                    </button>
                    <div className={styles.content}>
                      <div className={styles.list}>
                        <div className={styles.li}>
                          <strong>Resource-first</strong>: entidades antes que acciones.
                        </div>
                        <div className={styles.li}>
                          <strong>Stateless</strong>: no dependas de sesion implicita.
                        </div>
                        <div className={styles.li}>
                          <strong>Contratos estables</strong>: versiona + depreca con reglas.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.item} ${acc.a ? styles.open : ""}`}>
                    <button type="button" onClick={() => toggleAcc("a")}>
                      Anti-patrones <span>y fixes</span>
                    </button>
                    <div className={styles.content}>
                      <div className={styles.list}>
                        <div className={styles.li}>
                          <strong>No</strong> endpoints verbosos -&gt; <strong>Si</strong> recursos claros.
                        </div>
                        <div className={styles.li}>
                          <strong>No</strong> errores distintos -&gt; <strong>Si</strong> Problem Details.
                        </div>
                        <div className={styles.li}>
                          <strong>No</strong> updates ciegos -&gt; <strong>Si</strong> ETag/If-Match.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.sidebarFoot}>
                  <div className={styles.mutedSmall}>
                    <strong>Filosofia:</strong> menos guia bonita, mas criterio verificable. Cada seccion termina con un
                    indicador de dominio.
                  </div>
                  <div className={styles.sidebarButtons}>
                    <a className={styles.btn} href="#contrato">
                      Ver contrato
                    </a>
                    <a className={styles.btn} href="#rubrica">
                      Pasar rubrica
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Siguiente iteracion</h2>
                  <p>Roadmap alineado al craft.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Laboratorio interactivo</strong>
                  <br />
                  Playground de requests con validacion (headers, retries, errors).
                </div>
                <div className={`${styles.li} ${styles.liGap}`}>
                  <strong>Casos reales por dominio</strong>
                  <br />
                  Ecommerce, pagos, auth, notificaciones con trade-offs.
                </div>
                <div className={`${styles.li} ${styles.liGap}`}>
                  <strong>Checklist de entrevistas</strong>
                  <br />
                  Preguntas para medir criterio REST en equipos.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
