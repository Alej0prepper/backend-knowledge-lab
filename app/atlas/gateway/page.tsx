import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - Gateway",
  description: "Que es un Gateway y como se implementa en .NET y Python.",
};

export default function GatewayConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>Gateway</h2>
          <p>Puerta de entrada para integrar servicios externos o enrutar acceso.</p>

          <div className={shell.actions}>
            <Link href="/" className={shell.buttonPrimary}>
              Volver al Home
            </Link>
            <Link href="/atlas" className={shell.button}>
              Ver Atlas
            </Link>
          </div>
        </header>

        <article className={styles.article}>
          <section>
            <h2>1. La idea clave</h2>
            <p>
              Un Gateway es un componente que actua como puerta de entrada hacia otro sistema, servicio o recurso
              externo.
            </p>
            <p>Su rol es intermediar la comunicacion: recibe, enruta, traduce y controla acceso.</p>
            <blockquote>
              Un gateway conecta tu aplicacion con sistemas externos o centraliza acceso hacia varios servicios.
            </blockquote>
            <ul>
              <li>Intermediar</li>
              <li>Enrutar</li>
              <li>Abstraer</li>
              <li>Controlar acceso</li>
            </ul>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>Supongamos que tu sistema necesita consultar pagos en un proveedor externo.</p>
            <p>En lugar de llamar esa API desde todos lados, creas un `PaymentGateway`.</p>
            <p>Ese gateway se encarga de:</p>
            <ul>
              <li>Construir la request</li>
              <li>Llamar al servicio externo</li>
              <li>Procesar la respuesta</li>
              <li>Devolver datos al sistema</li>
            </ul>
            <pre>{`App -> Gateway -> Servicio externo -> Gateway -> App`}</pre>
          </section>

          <section>
            <h2>3. Para que se usa</h2>
            <ul>
              <li>Centralizar llamadas a servicios externos</li>
              <li>Ocultar detalles tecnicos de integracion</li>
              <li>Traducir formatos de datos</li>
              <li>Manejar autenticacion hacia terceros</li>
              <li>Controlar acceso a multiples servicios</li>
            </ul>
            <blockquote>
              El gateway evita que el resto de la aplicacion dependa directamente del detalle de un sistema externo.
            </blockquote>
          </section>

          <section>
            <h2>4. Ejemplo mental facil</h2>
            <p>
              Como la recepcion de un edificio: recibes una solicitud, decides adonde va, aplicas reglas y controlas
              acceso.
            </p>
            <p>Un gateway hace lo mismo en software para el trafico entre sistemas.</p>
          </section>

          <section>
            <h2>5. Dos usos comunes del termino Gateway</h2>
            <h3>1) Gateway hacia servicios externos</h3>
            <p>Vive dentro de tu codigo y encapsula comunicacion con APIs de terceros.</p>
            <ul>
              <li>`PaymentGateway`</li>
              <li>`EmailGateway`</li>
              <li>`ShippingGateway`</li>
            </ul>

            <h3>2) API Gateway</h3>
            <p>
              Capa frontal para varios microservicios. Recibe rutas como `/users`, `/orders`, `/payments` y las
              enruta al servicio correcto.
            </p>
          </section>

          <section>
            <h2>6. Como se ve en .NET</h2>
            <p>En .NET suele implementarse como clase que usa `HttpClient`.</p>

            <h3>Gateway en .NET</h3>
            <pre>{`using System.Net.Http.Json;

public class PaymentGateway
{
    private readonly HttpClient _httpClient;

    public PaymentGateway(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<PaymentResponseDto?> GetPaymentAsync(int paymentId)
    {
        var response = await _httpClient.GetAsync($"https://api.pagos.com/payments/{paymentId}");

        if (!response.IsSuccessStatusCode)
        {
            return null;
        }

        return await response.Content.ReadFromJsonAsync<PaymentResponseDto>();
    }
}`}</pre>

            <h3>DTO usado por el gateway</h3>
            <pre>{`public class PaymentResponseDto
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
    public string Status { get; set; } = string.Empty;
}`}</pre>

            <h3>Que pasa aqui</h3>
            <ul>
              <li>`PaymentGateway` encapsula la llamada externa</li>
              <li>El resto del sistema no construye requests manuales</li>
              <li>Si cambia la API externa, el ajuste se concentra en el gateway</li>
            </ul>

            <h3>Uso desde un controller</h3>
            <pre>{`[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly PaymentGateway _paymentGateway;

    public PaymentsController(PaymentGateway paymentGateway)
    {
        _paymentGateway = paymentGateway;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPayment(int id)
    {
        var payment = await _paymentGateway.GetPaymentAsync(id);

        if (payment is null)
            return NotFound();

        return Ok(payment);
    }
}`}</pre>
          </section>

          <section>
            <h2>7. Como se ve en Python</h2>
            <p>En Python el patron es similar: una clase que encapsula llamadas HTTP.</p>

            <h3>Gateway en Python</h3>
            <pre>{`import requests

class PaymentGateway:
    def __init__(self, base_url: str):
        self.base_url = base_url

    def get_payment(self, payment_id: int):
        response = requests.get(f"{self.base_url}/payments/{payment_id}")

        if response.status_code != 200:
            return None

        return response.json()`}</pre>

            <h3>Uso del gateway</h3>
            <pre>{`gateway = PaymentGateway("https://api.pagos.com")

payment = gateway.get_payment(10)

if payment:
    print(payment)
else:
    print("Pago no encontrado")`}</pre>

            <h3>Que pasa aqui</h3>
            <ul>
              <li>La integracion externa se concentra en un solo lugar</li>
              <li>El resto del sistema no conoce detalles HTTP</li>
              <li>El mantenimiento se simplifica</li>
            </ul>
          </section>

          <section>
            <h2>8. Que ventajas tiene</h2>
            <ul>
              <li>Separa integracion externa del resto del sistema</li>
              <li>Limpia responsabilidades</li>
              <li>Facilita mantenimiento</li>
              <li>Reduce acoplamiento con terceros</li>
              <li>Permite cambiar proveedor con menor impacto</li>
            </ul>
          </section>

          <section>
            <h2>9. Gateway no es lo mismo que Controller o Service</h2>
            <h3>Controller</h3>
            <p>Recibe request HTTP del cliente y devuelve response.</p>

            <h3>Service</h3>
            <p>Contiene logica de negocio o coordinacion interna.</p>

            <h3>Gateway</h3>
            <p>Se enfoca en comunicarse con otros sistemas o actuar como puerta de entrada/salida.</p>

            <pre>{`Controller -> Service -> Gateway -> API externa`}</pre>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Un gateway centraliza y abstrae comunicacion con sistemas externos, o funciona como puerta de entrada
              hacia varios servicios.
            </blockquote>
            <p>
              Te ayuda a enrutar, traducir y controlar acceso sin acoplar toda la aplicacion a detalles de
              integracion.
            </p>
            <pre>{`/atlas/gateway`}</pre>
          </section>
        </article>
      </section>
    </main>
  );
}
