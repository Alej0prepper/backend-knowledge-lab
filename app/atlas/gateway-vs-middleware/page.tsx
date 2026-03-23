import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - Gateway vs Middleware",
  description: "Diferencias entre Gateway y Middleware con ejemplos de uso.",
};

export default function GatewayVsMiddlewarePage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>Gateway vs Middleware</h2>
          <p>Dos conceptos intermedios, pero con responsabilidades distintas.</p>

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
            <h2>1. La diferencia principal</h2>
            <p>La diferencia clave es donde actuan y para que existen.</p>
            <p>Middleware trabaja sobre el flujo HTTP interno de tu aplicacion.</p>
            <p>Gateway trabaja en la comunicacion con sistemas externos o en acceso hacia servicios.</p>
            <blockquote>
              Middleware opera en requests/responses internas. Gateway opera en integraciones externas o enrutamiento
              de servicios.
            </blockquote>
          </section>

          <section>
            <h2>2. Que es un Middleware</h2>
            <p>Un middleware vive en el pipeline HTTP y se ejecuta antes o despues del endpoint.</p>
            <p>Suele usarse para:</p>
            <ul>
              <li>Autenticacion</li>
              <li>Autorizacion</li>
              <li>Logging</li>
              <li>Manejo de errores</li>
              <li>CORS</li>
              <li>Headers</li>
              <li>Medicion de tiempo</li>
            </ul>
            <pre>{`Request -> Middleware -> Controller/Endpoint -> Middleware -> Response`}</pre>
          </section>

          <section>
            <h2>3. Que es un Gateway</h2>
            <p>Un gateway actua como puerta de acceso hacia otros sistemas o servicios.</p>
            <p>Se usa para:</p>
            <ul>
              <li>Llamar APIs externas</li>
              <li>Centralizar integraciones</li>
              <li>Traducir datos</li>
              <li>Ocultar detalles tecnicos</li>
              <li>Enrutar hacia otros servicios</li>
            </ul>
            <pre>{`Controller -> Service -> Gateway -> API externa`}</pre>
            <p>En el caso de API Gateway:</p>
            <pre>{`Cliente -> API Gateway -> Microservicio correcto`}</pre>
          </section>

          <section>
            <h2>4. Ejemplo simple</h2>
            <p>Imagina una request para consultar un pago.</p>

            <h3>Middleware</h3>
            <ul>
              <li>Valida token</li>
              <li>Registra logs</li>
              <li>Captura errores</li>
              <li>Agrega headers</li>
            </ul>
            <p>No representa la integracion con el proveedor de pagos.</p>

            <h3>Gateway</h3>
            <ul>
              <li>Llama API externa de pagos</li>
              <li>Envia credenciales al proveedor</li>
              <li>Transforma la respuesta</li>
              <li>Devuelve objeto usable al sistema</li>
            </ul>
          </section>

          <section>
            <h2>5. Forma simple de verlo</h2>
            <h3>Middleware</h3>
            <blockquote>Voy a intervenir en esta request o en esta response.</blockquote>

            <h3>Gateway</h3>
            <blockquote>Voy a comunicarme con otro sistema.</blockquote>
          </section>

          <section>
            <h2>6. Comparacion directa</h2>
            <h3>Middleware</h3>
            <ul>
              <li>Vive en el pipeline HTTP</li>
              <li>Actua antes o despues del endpoint</li>
              <li>Se aplica a muchas rutas</li>
              <li>Resuelve preocupaciones transversales</li>
            </ul>

            <h3>Gateway</h3>
            <ul>
              <li>Vive como componente de integracion</li>
              <li>Se usa para hablar con algo externo</li>
              <li>Encapsula llamadas a otros servicios</li>
              <li>Oculta detalles de integracion</li>
            </ul>
          </section>

          <section>
            <h2>7. Ejemplo con ambos</h2>
            <pre>{`Cliente
-> Middleware de autenticacion
-> Controller
-> Service
-> PaymentGateway
-> API externa de pagos
-> Response`}</pre>
            <p>El middleware valida la request interna; el gateway integra con el sistema externo.</p>
          </section>

          <section>
            <h2>8. Regla mental util</h2>
            <p>Si te preguntas:</p>
            <blockquote>Esto afecta el recorrido de la request dentro de mi app?</blockquote>
            <p>Probablemente es middleware.</p>
            <blockquote>Esto encapsula como mi app habla con otro sistema?</blockquote>
            <p>Probablemente es gateway.</p>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Middleware = capa del pipeline HTTP que intercepta requests y responses. Gateway = componente que
              centraliza integraciones o acceso a sistemas externos.
            </blockquote>
            <p>Ambos intermedian, pero resuelven problemas distintos.</p>
            <pre>{`/atlas/gateway-vs-middleware`}</pre>
          </section>
        </article>
      </section>
    </main>
  );
}
