import type { Metadata } from "next";
import Link from "next/link";
import styles from "./rest-lite.module.css";

export const metadata: Metadata = {
  title: "REST Lite - Learning + Craft",
  description: "Ruta REST para principiantes con base solida para produccion.",
};

const methods = [
  {
    method: "GET",
    meaning: "Leer recursos",
    note: "No debe cambiar estado; ideal para consultas",
  },
  {
    method: "POST",
    meaning: "Crear recurso o ejecutar accion",
    note: "En flujos criticos, usar Idempotency-Key",
  },
  {
    method: "PUT",
    meaning: "Reemplazar recurso completo",
    note: "Piensa en 'queda exactamente como este payload'",
  },
  {
    method: "PATCH",
    meaning: "Actualizar una parte",
    note: "Define claramente estrategia de merge",
  },
  {
    method: "DELETE",
    meaning: "Eliminar recurso",
    note: "Puede responder 204 o 404 segun politica",
  },
];

const statusRows = [
  ["200", "OK con body", "2xx"],
  ["201", "Created", "2xx"],
  ["204", "No Content", "2xx"],
  ["400", "Request mal formado", "4xx"],
  ["401", "No autenticado", "4xx"],
  ["403", "Sin permisos", "4xx"],
  ["404", "No existe", "4xx"],
  ["409", "Conflicto de estado/concurrencia", "4xx"],
  ["422", "Regla de negocio no cumplida", "4xx"],
  ["429", "Demasiadas requests", "4xx"],
  ["500", "Error inesperado del servidor", "5xx"],
] as const;

const dailyLessons = [
  {
    date: "2026-02-19",
    title: "DTO != Entidad",
    lesson:
      "La entidad refleja persistencia interna; el DTO define el contrato externo. Nunca expongas PasswordHash o campos internos.",
  },
  {
    date: "2026-02-18",
    title: ".NET Minimal API",
    lesson:
      "En ASP.NET Core puedes mapear endpoints REST como /daily/7 con MapGet/MapPost y responder con Results.Ok/Results.Created.",
  },
  {
    date: "2026-02-17",
    title: "Backend = orquestacion",
    lesson:
      "Un backend senior coordina responsabilidades: valida, consulta, persiste y publica eventos en el orden correcto.",
  },
  {
    date: "2026-02-16",
    title: "401 vs 403",
    lesson: "401 es identidad invalida o ausente; 403 es identidad valida pero sin permiso.",
  },
  {
    date: "2026-02-15",
    title: "POST idempotente en cobros",
    lesson: "Para evitar duplicados en reintentos, usa Idempotency-Key y persiste resultado por key.",
  },
  {
    date: "2026-02-14",
    title: "ETag en lecturas",
    lesson: "ETag + If-None-Match reduce carga devolviendo 304 cuando no hay cambios.",
  },
] as const;

function ProBox({ children }: { children: React.ReactNode }) {
  return (
    <details className={styles.pro}>
      <summary>Ver Pro</summary>
      <div>{children}</div>
    </details>
  );
}

export default function RestLitePage() {
  return (
    <main className={styles.page} id="inicio">
      <div className={styles.container}>
        <header className={styles.hero}>
          <p className={styles.kicker}>REST LITE • Learning + Craft</p>
          <h1>REST desde cero (sin perder criterio)</h1>
          <p className={styles.lead}>
            Aprende a pensar en recursos, usar HTTP con semantica y construir APIs consistentes.
          </p>
          <div className={styles.actions}>
            <a href="#seccion-0" className={styles.buttonPrimary}>
              Empezar
            </a>
            <a href="#ejemplo-completo" className={styles.button}>
              Ver ejemplo completo
            </a>
            <a href="#checklist-final" className={styles.button}>
              Ver checklist final
            </a>
            <Link href="/rest" className={styles.button}>
              REST Atlas
            </Link>
            <Link href="/" className={styles.button}>
              Home
            </Link>
          </div>
        </header>

        <nav className={styles.quickNav}>
          <a href="#aprendizaje-diario">Diario</a>
          <a href="#seccion-0">0. API</a>
          <a href="#seccion-1">1. REST</a>
          <a href="#seccion-2">2. Recursos</a>
          <a href="#seccion-3">3. Metodos</a>
          <a href="#seccion-4">4. Status</a>
          <a href="#seccion-5">5. Payloads</a>
          <a href="#seccion-6">6. Stateless</a>
          <a href="#seccion-7">7. Contratos</a>
          <a href="#seccion-8">8. Idempotencia</a>
          <a href="#seccion-9">9. Cache</a>
          <a href="#seccion-10">10. Seguridad</a>
          <a href="#seccion-11">11. Operacion</a>
          <a href="#seccion-12">12. Anti-patrones</a>
        </nav>

        <section className={styles.section} id="aprendizaje-diario">
          <h2>Aprendizaje diario (lecciones cortas)</h2>
          <p>
            Este bloque es para registrar una idea breve cada dia. Enfocate en 1 concepto, 1 ejemplo y 1 takeaway
            accionable.
          </p>

          <div className={styles.dailyGrid}>
            {dailyLessons.map((item) => (
              <article key={`${item.date}-${item.title}`} className={styles.dailyCard}>
                <p className={styles.dailyMeta}>{item.date}</p>
                <h3>{item.title}</h3>
                <p className={styles.dailyLesson}>{item.lesson}</p>
              </article>
            ))}
          </div>

          <div className={styles.note}>
            <p>Como agregar tu leccion del dia:</p>
            <ol>
              <li>Abre `app/rest-lite/page.tsx`.</li>
              <li>En `dailyLessons`, agrega un nuevo objeto al inicio.</li>
              <li>Mantén la leccion en 1 o 2 lineas para que siga siendo rapida de leer.</li>
            </ol>
          </div>

          <pre className={styles.code}>{`{
  date: "2026-02-17",
  title: "Nombre corto de la leccion",
  lesson: "Aprendizaje breve y concreto del dia."
}`}</pre>

          <h3>Ejemplo rapido en .NET (ASP.NET Core Minimal API)</h3>
          <pre className={styles.code}>{`using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/daily/7", () =>
{
  return Results.Ok(new { day = 7, topic = "REST", status = "ready" });
});

app.MapPost("/daily/7", (CreateOrderRequest request) =>
{
  if (request.Items.Count == 0)
  {
    return Results.BadRequest(new
    {
      code = "ORDER_ITEMS_REQUIRED",
      detail = "At least one item is required"
    });
  }

  var orderId = $"ord_{Guid.NewGuid():N}";

  return Results.Created($"/daily/7/{orderId}", new
  {
    id = orderId,
    status = "created"
  });
});

app.Run();

public record CreateOrderRequest(string CustomerId, List<OrderItem> Items);
public record OrderItem(string Sku, int Qty, decimal UnitPrice);`}</pre>

          <ProBox>
            Si luego quieres filtrarlo por tema, agrega `tag` (ej: &quot;cache&quot;, &quot;seguridad&quot;,
            &quot;observabilidad&quot;) y renderiza chips por categoria.
          </ProBox>
        </section>

        <section className={styles.section} id="seccion-0">
          <h2>0) Que es una API</h2>
          <p>Una API es la forma en que un sistema le pide datos o acciones a otro sistema,sin necesidad de que compartan informacion de como funcionan</p>
          <div className={styles.note}>
            <p>Ejemplo mental:</p>
            <ul>
              <li>Cliente: “dame mis pedidos”.</li>
              <li>API: responde con la lista de pedidos.</li>
            </ul>
          </div>
    
        </section>

        <section className={styles.section} id="seccion-1">
          <h2>1) REST en una frase</h2>
          <p>
            REST es una forma de disenar APIs donde trabajas con recursos del negocio a traves de HTTP. Sus siglas significan Representational State Transfer, pero no te preocupes por el nombre. Lo importante es entender los principios basicos para construir APIs que sean faciles de usar, mantener y escalar.
          </p>
          <div className={styles.highlight}>
            Disena URLs como recursos y usa metodos HTTP segun su significado.
          </div>
        </section>

        <section className={styles.section} id="seccion-2">
          <h2>2) Recursos y URLs (resource-first)</h2>
          <p>Recurso = cosa del negocio: users, orders, invoices.</p>
          <p> Un recurso se obtiene cuando el cliente hace una peticion a una URL determinada por la que escucha el Servidor
            Los verbos en la URL confunden al cliente y hacen que la API sea menos intuitiva. En cambio, si usas recursos claros y metodos HTTP con significado, tu API sera mas predecible y facil de usar.
          </p>
          <ul>
            <li>Coleccion: `GET /orders`</li>
            <li>Detalle: `GET /orders/ord_901`</li>
          </ul>
          <div className={styles.twoCol}>
            <article className={styles.badCard}>
              <h3>Evita</h3>
              <p>`/getOrders`</p>
              <p>`/createOrderNow`</p>
            </article>
            <article className={styles.goodCard}>
              <h3>Haz esto</h3>
              <p>`GET /orders`</p>
              <p>`POST /orders`</p>
            </article>
          </div>
          <ProBox>Relaciones por subrecursos o links: `/orders/{"{id}"}/payments` o `links.self`.</ProBox>
        </section>

        <section className={styles.section} id="seccion-3">
          <h2>3) Metodos HTTP: que significan de verdad</h2>
          <p>No se trata de memorizar. Se trata de no confundir al cliente.
            Los verbos HTTP tienen un significado standarizado. Si los usas segun su proposito, tu API sera mas intuitiva y facil de integrar. Si los usas mal, el cliente se va a confundir y va a tener que leer la documentacion cada vez para entender como usar tu API.
            El objetivo es que la API sea sencilla y facil de utilizar, no que el cliente tenga que adivinar como funciona.
          </p>
          <div className={styles.methodGrid}>
            {methods.map((row) => (
              <article key={row.method} className={styles.methodCard}>
                <h3>{row.method}</h3>
                <p>{row.meaning}</p>
                <span>{row.note}</span>
              </article>
            ))}
          </div>
          <div className={styles.note}>
            <p>Ejemplo minimo:</p>
            <ul>
              <li>`GET /users/u_1`</li>
              <li>`POST /orders`</li>
              <li>`PATCH /orders/ord_901`</li>
              <li>`DELETE /orders/ord_901`</li>
            </ul>
          </div>
          <ProBox>GET es safe; PUT y DELETE suelen ser idempotentes; PATCH depende de implementacion.</ProBox>
        </section>

        <section className={styles.section} id="seccion-4">
          <h2>4) Status codes que necesitas si o si</h2>
          <p>Si usas bien los status codes, integrar y depurar es mucho mas simple. Los status code son otra forma de standarizar los mensajes de comunicacion entre el cliente y el servidor.
            Cuando se usa correctamente, el cliente puede entender rapidamente el resultado de su peticion sin tener que leer el cuerpo de la respuesta. Esto hace que la API sea mas facil de usar y de integrar.
          </p>
          <div className={styles.tableWrap}>
            <table>
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
                    <td>{code}</td>
                    <td>{meaning}</td>
                    <td>{group}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section} id="seccion-5">
          <h2>5) Payloads (lo que viaja en request/response)</h2>
          <p>
            Normalmente vas a usar JSON. Esta es la parte donde se define si tu API es facil o dificil de integrar.
          </p>
          <ul>
            <li>Campos claros y estables.</li>
            <li>Fechas en ISO 8601 (`2026-02-16T15:00:00Z`).</li>
            <li>Dinero: `amount` + `currency`.</li>
            <li>No cambies nombres por endpoint.</li>
            <li>Evita mezclar formatos (`user_id` y `userId`) en la misma API.</li>
            <li>Distingue bien entre `null`, campo ausente y arreglo vacio (`[]`).</li>
          </ul>

          <div className={styles.note}>
            <p>Piensalo como dos contratos:</p>
            <ul>
              <li>
                <strong>Request payload:</strong> lo minimo necesario para ejecutar la accion.
              </li>
              <li>
                <strong>Response payload:</strong> resultado util + identificadores para continuar flujo.
              </li>
            </ul>
          </div>

          <div className={styles.twoCol}>
            <article>
              <h3>Ejemplo request (crear orden)</h3>
              <pre className={styles.code}>{`{
  "customerId": "cus_123",
  "shippingAddressId": "addr_909",
  "items": [
    { "sku": "sku-abc", "qty": 2, "unitPrice": 74.99 }
  ]
}`}</pre>
            </article>
            <article>
              <h3>Ejemplo response (creada)</h3>
              <pre className={styles.code}>{`{
  "id": "ord_901",
  "status": "created",
  "total": 149.98,
  "currency": "USD",
  "createdAt": "2026-02-16T15:00:00Z"
}`}</pre>
            </article>
          </div>

          <h3>Ejemplo de error de validacion</h3>
          <pre className={styles.code}>{`{
  "status": 422,
  "code": "ORDER_ITEM_SKU_UNKNOWN",
  "detail": "sku sku-abc is not active",
  "requestId": "req_8f31",
  "errors": [
    { "field": "items[0].sku", "message": "Unknown SKU" }
  ]
}`}</pre>

          <ProBox>
            Versiona representaciones con cuidado y usa ETag para concurrencia/cache. En APIs maduras define
            lineamientos de serializacion: precision decimal, zonas horarias, enums estables y reglas de backward
            compatibility (nunca borrar campos sin deprecacion).
          </ProBox>
        </section>

        <section className={styles.section} id="seccion-6">
          <h2>6) Stateless (sin estado por request)</h2>
          <p>
            Cada request debe traer lo necesario para procesarse. El servidor no debe depender de una sesion oculta
            en memoria para entender quien eres o que accion puedes ejecutar.
          </p>
          <ul>
            <li>Autenticacion en cada request (token, API key o mecanismo equivalente).</li>
            <li>Contexto suficiente para procesar la operacion (headers, parametros, body).</li>
            <li>Respuesta independiente: el cliente no necesita &quot;estado magico&quot; del request anterior.</li>
          </ul>
          <div className={styles.note}>
            <p>En practica:</p>
            <ul>
              <li>Cliente envia `Authorization: Bearer &lt;token&gt;`.</li>
              <li>API valida y responde.</li>
              <li>Si el token no sirve, responde `401` sin depender de sesion previa.</li>
            </ul>
          </div>

          <h3>Flujo minimo recomendado</h3>
          <pre className={styles.code}>{`Request
GET /api/v1/orders
Authorization: Bearer eyJ...
X-Request-Id: req_01H...

Response
HTTP/1.1 200 OK
X-Request-Id: req_01H...
Content-Type: application/json

{ "data": [ ... ] }`}</pre>

          <div className={styles.note}>
            <p>Errores comunes:</p>
            <ul>
              <li>Guardar estado del usuario en memoria local del servidor (rompe al escalar).</li>
              <li>Depender de cookies de sesion sin estrategia clara para APIs publicas.</li>
              <li>No devolver el mismo `X-Request-Id` en la respuesta para trazabilidad.</li>
            </ul>
          </div>

          <ProBox>
            Stateless facilita escalado horizontal, caching y debugging. En sistemas grandes, esto permite balanceo
            entre multiples instancias sin &quot;sticky sessions&quot; y mejora recuperacion ante fallos.
          </ProBox>
        </section>

        <section className={styles.section} id="seccion-7">
          <h2>7) Contratos y consistencia</h2>
          <p>
            Una API profesional es predecible. Cuando el contrato es claro, frontend, mobile y terceros pueden integrar
            mas rapido y con menos bugs.
          </p>
          <ul>
            <li>Convenciones consistentes (URLs, payloads).</li>
            <li>Respuestas predecibles.</li>
            <li>Errores uniformes.</li>
            <li>Misma regla de paginacion, filtros y orden en todos los listados.</li>
            <li>Mismo formato de fechas, montos y enums en toda la API.</li>
          </ul>

          <div className={styles.twoCol}>
            <article className={styles.badCard}>
              <h3>Rompe contratos</h3>
              <ul>
                <li>Cambiar nombres de campos sin aviso (`total` a `amountTotal`).</li>
                <li>Responder error distinto en cada endpoint.</li>
                <li>Devolver tipos distintos para el mismo campo.</li>
              </ul>
            </article>
            <article className={styles.goodCard}>
              <h3>Contrato sano</h3>
              <ul>
                <li>Agregar campos nuevos sin romper los existentes.</li>
                <li>Usar una estructura de error unica.</li>
                <li>Versionar y deprecar con fechas y documentacion.</li>
              </ul>
            </article>
          </div>

          <div className={styles.note}>
            Formato de error recomendado: `status`, `code`, `detail`, `requestId`, `errors[]`.
          </div>

          <h3>Ejemplo de respuesta consistente</h3>
          <pre className={styles.code}>{`{
  "data": {
    "id": "ord_901",
    "status": "created",
    "total": 149.98,
    "currency": "USD"
  },
  "meta": {
    "requestId": "req_8f31",
    "version": "v1"
  }
}`}</pre>

          <h3>Ejemplo de error consistente</h3>
          <pre className={styles.code}>{`{
  "status": 422,
  "code": "ORDER_ITEM_SKU_UNKNOWN",
  "detail": "sku sku-abc is not active",
  "requestId": "req_8f31",
  "errors": [
    { "field": "items[0].sku", "message": "Unknown SKU" }
  ]
}`}</pre>

          <h3>DTO != Entidad (.NET en practica)</h3>
          <p>
            La entidad puede tener datos sensibles o internos. El DTO de respuesta solo expone lo que el cliente
            necesita consumir.
          </p>
          <pre className={styles.code}>{`// Entidad interna (persistencia)
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

  // Mapping explicito para proteger el modelo interno
  var dto = new UserResponseDto(user.Id, user.Email);
  return Results.Ok(dto);
});`}</pre>
          <div className={styles.note}>
            Si mañana cambias `InternalNotes` o `PasswordHash` en base de datos, el contrato externo no se rompe porque
            el frontend consume el DTO.
          </div>

          <ProBox>
            Problem Details (`application/problem+json`) es una gran base estandar. En equipos grandes, define
            governance del contrato: changelog de API, tests de contrato y politica de backward compatibility.
          </ProBox>
        </section>

        <section className={styles.section} id="seccion-8">
          <h2>8) Idempotencia (para reintentos seguros)</h2>
          <p>
            Si el cliente reintenta, no quieres duplicados en operaciones criticas. Sin idempotencia puedes terminar
            con doble cobro, doble orden o estados inconsistentes.
          </p>
          <ul>
            <li>Importa especialmente en pagos y ordenes.</li>
            <li>Solucion tipica: `Idempotency-Key` en POST.</li>
            <li>La misma key + mismo payload debe devolver el mismo resultado.</li>
            <li>Si cambia el payload con la misma key, responde error de conflicto.</li>
          </ul>

          <div className={styles.note}>
            <p>Flujo recomendado:</p>
            <ul>
              <li>Cliente envia `Idempotency-Key` unica por intento de operacion.</li>
              <li>Servidor guarda key + hash del payload + estado de la respuesta.</li>
              <li>Si llega un replay, servidor retorna la respuesta ya registrada.</li>
            </ul>
          </div>

          <h3>Ejemplo minimo</h3>
          <pre className={styles.code}>{`POST /api/v1/orders
Idempotency-Key: idem_9f42
Content-Type: application/json

{ "customerId": "cus_123", "amount": 149.98, "currency": "USD" }

HTTP/1.1 201 Created
{ "id": "ord_901", "status": "created" }

# Retry con misma key y mismo body
HTTP/1.1 201 Created
{ "id": "ord_901", "status": "created" }`}</pre>

          <div className={styles.twoCol}>
            <article className={styles.badCard}>
              <h3>Errores comunes</h3>
              <ul>
                <li>No persistir la key (se pierde en reinicios).</li>
                <li>No validar que el payload sea el mismo.</li>
                <li>TTL demasiado corto para reintentos reales.</li>
              </ul>
            </article>
            <article className={styles.goodCard}>
              <h3>Buena implementacion</h3>
              <ul>
                <li>Persistencia duradera (DB o cache distribuido).</li>
                <li>Hash del body para detectar cambios indebidos.</li>
                <li>Metrica de replays para observar comportamiento cliente.</li>
              </ul>
            </article>
          </div>

          <ProBox>
            Guardar key + hash de payload + TTL y medir replays. En dominios financieros, combina esto con estado de
            transaccion y locks de concurrencia para evitar duplicados incluso bajo fallos parciales.
          </ProBox>
        </section>

        <section className={styles.section} id="seccion-9">
          <h2>9) Cache</h2>
          <p>
            Cache reduce latencia y carga cuando hay lecturas repetidas. Bien aplicada, mejora performance y baja
            costo de infraestructura sin cambiar logica de negocio.
          </p>
          <ul>
            <li>`Cache-Control` para politica de cache.</li>
            <li>`ETag` para revalidacion.</li>
            <li>Define que endpoints son cacheables (normalmente GET).</li>
            <li>Evita cachear respuestas con datos sensibles por defecto.</li>
          </ul>

          <div className={styles.note}>
            <p>Regla simple para empezar:</p>
            <ul>
              <li>Listados y catalogos: cache corto (`max-age` bajo).</li>
              <li>Datos muy dinamicos: revalidacion con ETag.</li>
              <li>Acciones de escritura (POST/PUT/PATCH/DELETE): no cachear respuesta por defecto.</li>
            </ul>
          </div>

          <h3>Flujo de revalidacion con ETag</h3>
          <pre className={styles.code}>{`# Primera lectura
GET /api/v1/products

HTTP/1.1 200 OK
Cache-Control: public, max-age=60
ETag: "products-v12"

[ ... ]

# Siguiente lectura
GET /api/v1/products
If-None-Match: "products-v12"

HTTP/1.1 304 Not Modified`}</pre>

          <div className={styles.twoCol}>
            <article className={styles.badCard}>
              <h3>Errores comunes</h3>
              <ul>
                <li>No invalidar cache despues de cambios relevantes.</li>
                <li>Usar TTL largos en datos que cambian seguido.</li>
                <li>Cachear respuestas personalizadas sin `Vary` adecuado.</li>
              </ul>
            </article>
            <article className={styles.goodCard}>
              <h3>Buena implementacion</h3>
              <ul>
                <li>Politicas de cache por tipo de recurso.</li>
                <li>ETag consistente y estable por representacion.</li>
                <li>Monitoreo de hit ratio, latencia y respuestas 304.</li>
              </ul>
            </article>
          </div>

          <ProBox>
            `If-None-Match` puede devolver `304 Not Modified`. En entornos con CDN, combina `Cache-Control`, `ETag`,
            `Vary` y estrategias de invalidacion para evitar stale data.
          </ProBox>
        </section>

        <section className={styles.section} id="seccion-10">
          <h2>10) Seguridad minima viable (AuthN/AuthZ)</h2>
          <p>
            Seguridad minima viable significa que cada request esta autenticado, autorizado y controlado antes de tocar
            logica de negocio sensible.
          </p>
          <ul>
            <li>AuthN: quien eres (token valido).</li>
            <li>AuthZ: que puedes hacer (roles/scopes).</li>
            <li>AuthN responde `401` cuando falta/expira credencial.</li>
            <li>AuthZ responde `403` cuando existe identidad pero no permiso.</li>
          </ul>
          <div className={styles.note}>
            <p>Basico de implementacion:</p>
            <ul>
              <li>Validar token.</li>
              <li>Validar permisos por endpoint/accion.</li>
              <li>Rate limiting para abuso.</li>
              <li>Usar HTTPS siempre para proteger credenciales en transito.</li>
            </ul>
          </div>

          <h3>Flujo recomendado (orden de chequeos)</h3>
          <pre className={styles.code}>{`Request -> AuthN -> AuthZ -> Validacion -> Logica de negocio -> Response

GET /api/v1/orders/ord_901
Authorization: Bearer eyJ...

# Caso token invalido
HTTP/1.1 401 Unauthorized

# Caso token valido, scope insuficiente
HTTP/1.1 403 Forbidden`}</pre>

          <div className={styles.twoCol}>
            <article className={styles.badCard}>
              <h3>Errores comunes</h3>
              <ul>
                <li>Confiar solo en frontend para permisos.</li>
                <li>Mezclar reglas de auth dentro de handlers sin consistencia.</li>
                <li>No rotar secretos ni expirar tokens correctamente.</li>
              </ul>
            </article>
            <article className={styles.goodCard}>
              <h3>Buena implementacion</h3>
              <ul>
                <li>Middleware central de autenticacion/autorizacion.</li>
                <li>Permisos por recurso y accion (least privilege).</li>
                <li>Logs de seguridad con `requestId`, actor y resultado.</li>
              </ul>
            </article>
          </div>

          <ProBox>
            Scopes por cliente, limites por IP/consumer y auditoria de acciones. En entornos exigentes, agrega
            rotacion automatica de secretos, deteccion de anomalias y politicas de bloqueo temporal por abuso.
          </ProBox>
        </section>

        <section className={styles.section} id="seccion-11">
          <h2>11) Operacion en produccion</h2>
          <p>
            Operar en produccion significa detectar problemas rapido, entender impacto y recuperar servicio sin adivinar.
          </p>
          <ul>
            <li>`X-Request-Id` en request y response.</li>
            <li>Logs estructurados con requestId.</li>
            <li>Metricas por endpoint (latencia, errores, 429).</li>
            <li>Timeouts y politica de retries.</li>
            <li>Health checks reales (`/health`, `/ready`) y dashboards visibles para el equipo.</li>
            <li>Alertas por sintomas de usuario (errores y latencia), no solo por CPU/memoria.</li>
          </ul>

          <div className={styles.note}>
            <p>Minimo operativo recomendado:</p>
            <ul>
              <li>Correlacion: cada log y error con `requestId`.</li>
              <li>Metricas clave: p95/p99, tasa de 5xx, timeouts, rate limit hits.</li>
              <li>Trazabilidad: saber en que dependencia (DB, cache, third-party) se rompio.</li>
            </ul>
          </div>

          <h3>Ejemplo de log util para incidentes</h3>
          <pre className={styles.code}>{`{
  "level": "error",
  "service": "orders-api",
  "requestId": "req_8f31",
  "method": "POST",
  "path": "/api/v1/orders",
  "status": 504,
  "latencyMs": 12003,
  "dependency": "payments-provider",
  "message": "upstream timeout"
}`}</pre>

          <div className={styles.twoCol}>
            <article className={styles.badCard}>
              <h3>Errores comunes</h3>
              <ul>
                <li>Logs sin contexto (sin requestId, endpoint o latencia).</li>
                <li>Alertas ruidosas que nadie atiende.</li>
                <li>No definir dueños de servicio ni runbook de incidentes.</li>
              </ul>
            </article>
            <article className={styles.goodCard}>
              <h3>Buena implementacion</h3>
              <ul>
                <li>Alertas accionables con umbral y playbook claro.</li>
                <li>Dashboards por API: trafico, errores, saturacion y dependencias.</li>
                <li>Postmortems cortos con acciones concretas de mejora.</li>
              </ul>
            </article>
          </div>

          <ProBox>
            OpenTelemetry, SLI/SLO y alertas accionables para equipos on-call. Define error budgets para equilibrar
            velocidad de entrega y confiabilidad sin sacrificar experiencia de usuario.
          </ProBox>
        </section>

        <section className={styles.section} id="seccion-12">
          <h2>12) Anti-patrones (y alternativa)</h2>
          <p>
            Los anti-patrones no solo “se ven feos”: rompen integraciones, aumentan incidentes y vuelven lenta la
            evolucion de la API.
          </p>
          <div className={styles.twoCol}>
            <article className={styles.badCard}>
              <h3>Evita</h3>
              <ul>
                <li>Endpoints con verbos: `/getUserById`.</li>
                <li>GET que muta estado.</li>
                <li>Errores distintos por endpoint.</li>
                <li>Versionado improvisado sin politica.</li>
                <li>Respuestas sin estructura consistente (`data`, `meta`, `error`).</li>
                <li>Ignorar concurrencia en updates (lost updates).</li>
              </ul>
            </article>
            <article className={styles.goodCard}>
              <h3>Haz esto</h3>
              <ul>
                <li>Recursos claros: `GET /users/{"{id}"}`.</li>
                <li>Semantica HTTP correcta.</li>
                <li>Error unificado.</li>
                <li>Versionado explicito con deprecacion.</li>
                <li>Contratos estables con ejemplos de exito y error.</li>
                <li>ETag + If-Match en actualizaciones sensibles.</li>
              </ul>
            </article>
          </div>

          <div className={styles.note}>
            <p>Impacto real de estos anti-patrones:</p>
            <ul>
              <li>Mayor tiempo de integracion para frontend y terceros.</li>
              <li>Mas errores 5xx por manejo inconsistente de casos borde.</li>
              <li>Cambios de producto mas lentos por miedo a romper clientes.</li>
            </ul>
          </div>

          <h3>Mini checklist para revisar en PR</h3>
          <pre className={styles.code}>{`[ ] El endpoint representa un recurso (no una accion con verbo)
[ ] El metodo HTTP coincide con la semantica esperada
[ ] Los status codes son correctos (200/201/204/4xx/5xx)
[ ] El error sigue el formato comun de la API
[ ] El cambio es backward compatible o viene versionado`}</pre>

          <ProBox>
            En equipos grandes, convierte esta lista en reglas automatizadas: lint de OpenAPI, tests de contrato y
            validaciones en CI para evitar regresiones de diseno.
          </ProBox>
        </section>

        <section className={styles.section} id="ejemplo-completo">
          <h2>Ejemplo completo (conecta todo)</h2>
          <p>Crear una orden con idempotencia, Location, ETag y error uniforme.</p>
          <div className={styles.exampleGrid}>
            <article>
              <h3>Request</h3>
              <pre className={styles.code}>{`POST /api/v1/orders
Content-Type: application/json
Idempotency-Key: 6dcb9cb0-cf17-4f70

{
  "customerId": "cus_123",
  "shippingAddressId": "addr_909",
  "items": [
    { "sku": "sku-abc", "qty": 2, "unitPrice": 74.99 }
  ]
}`}</pre>
            </article>
            <article>
              <h3>Response Success (201)</h3>
              <pre className={styles.code}>{`HTTP/1.1 201 Created
Location: /api/v1/orders/ord_901
ETag: "order-v1-ord_901"

{
  "id": "ord_901",
  "status": "created",
  "total": 149.98,
  "currency": "USD",
  "createdAt": "2026-02-16T15:00:00Z"
}`}</pre>
            </article>
            <article>
              <h3>Response Error (422)</h3>
              <pre className={styles.code}>{`HTTP/1.1 422 Unprocessable Entity
Content-Type: application/problem+json
X-Request-Id: req_8f31

{
  "type": "https://api.example.com/problems/invalid-order",
  "title": "Invalid order payload",
  "status": 422,
  "code": "ORDER_ITEM_SKU_UNKNOWN",
  "detail": "sku sku-abc is not active",
  "requestId": "req_8f31"
}`}</pre>
            </article>
          </div>
        </section>

        <section className={styles.section} id="checklist-final">
          <h2>Checklist final (principiantes)</h2>
          <p>Si puedes marcar esto, ya tienes una base muy util.</p>
          <label className={styles.check}>
            <input type="checkbox" /> Mis URLs son recursos (no verbos).
          </label>
          <label className={styles.check}>
            <input type="checkbox" /> Uso GET/POST/PUT/PATCH/DELETE con significado correcto.
          </label>
          <label className={styles.check}>
            <input type="checkbox" /> Devuelvo status codes correctos (201, 422, 409, etc.).
          </label>
          <label className={styles.check}>
            <input type="checkbox" /> Mis errores tienen un formato unico.
          </label>
          <label className={styles.check}>
            <input type="checkbox" /> Mis requests llevan auth y son stateless.
          </label>
          <label className={styles.check}>
            <input type="checkbox" /> Para POST critico uso Idempotency-Key.
          </label>
          <label className={styles.check}>
            <input type="checkbox" /> Tengo requestId, logs y metricas basicas.
          </label>
        </section>

        <section className={styles.section}>
          <h2>Siguiente paso</h2>
          <ul>
            <li>Ruta Nivel 1 → Nivel 2: paginacion, filtros, versionado, contrato estable.</li>
            <li>Ruta Produccion: rate limiting, tracing, retries y SLO.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
