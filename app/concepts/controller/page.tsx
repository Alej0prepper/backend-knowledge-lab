import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - Controller",
  description: "Que es un controller y como se aplica en .NET y Python.",
};

export default function ControllerConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>Conceptos: Controller</h2>
          <p>Punto de entrada HTTP que recibe, delega y responde.</p>

          <div className={shell.actions}>
            <Link href="/" className={shell.buttonPrimary}>
              Volver al Home
            </Link>
            <Link href="/daily" className={shell.button}>
              Ver Daily
            </Link>
          </div>
        </header>

        <article className={styles.article}>
          <section>
            <h2>1. La idea clave</h2>
            <p>
              Un controller es el componente del backend que recibe una peticion HTTP y decide como responderla.
            </p>
            <p>Actua como punto de entrada para las requests.</p>
            <ul>
              <li>Recibir datos de la peticion</li>
              <li>Llamar a la logica necesaria</li>
              <li>Devolver una respuesta</li>
            </ul>
            <blockquote>Un controller conecta la peticion del cliente con la logica de la aplicacion.</blockquote>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>Imagina que el frontend hace:</p>
            <pre>{`GET /users/5`}</pre>
            <p>El controller se encarga de:</p>
            <ul>
              <li>Leer el `id`</li>
              <li>Pedir datos del usuario</li>
              <li>Devolver la respuesta al cliente</li>
            </ul>
            <pre>{`Cliente -> Controller -> Servicio/Logica -> Response`}</pre>
            <p>El controller coordina el proceso, no necesariamente toda la logica de negocio.</p>
          </section>

          <section>
            <h2>3. Que hace un controller</h2>
            <h3>1) Recibir la request</h3>
            <ul>
              <li>Parametros de ruta</li>
              <li>Query params</li>
              <li>Headers</li>
              <li>Body</li>
            </ul>

            <h3>2) Llamar a la logica correspondiente</h3>
            <ul>
              <li>Servicios</li>
              <li>Casos de uso</li>
              <li>Repositorios</li>
              <li>Otras capas del sistema</li>
            </ul>

            <h3>3) Devolver una response</h3>
            <ul>
              <li>`200 OK`</li>
              <li>`201 Created`</li>
              <li>`400 Bad Request`</li>
              <li>`404 Not Found`</li>
            </ul>
          </section>

          <section>
            <h2>4. Ejemplo mental facil</h2>
            <p>
              Piensa en la recepcion de una oficina: recibe la solicitud, la dirige al area correcta y devuelve una
              indicacion.
            </p>
            <p>El controller hace algo parecido: recibe la peticion y la encamina correctamente.</p>
          </section>

          <section>
            <h2>5. Como se ve en .NET</h2>
            <p>En ASP.NET Core, un controller agrupa endpoints relacionados.</p>

            <h3>Ejemplo de controller en .NET</h3>
            <pre>{`using Microsoft.AspNetCore.Mvc;

namespace MiApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = new
            {
                Id = id,
                Name = "Alejandro",
                Email = "alejandro@email.com"
            };

            return Ok(user);
        }
    }
}`}</pre>

            <h3>Que pasa aqui</h3>
            <ul>
              <li>`UsersController` recibe requests de usuarios</li>
              <li>`[HttpGet(&quot;&#123;id&#125;&quot;)]` responde a `GET /api/users/&#123;id&#125;`</li>
              <li>El metodo recibe `id`</li>
              <li>Devuelve respuesta con `Ok(...)`</li>
            </ul>
          </section>

          <section>
            <h2>6. Como se ve en Python</h2>
            <p>
              En Python el concepto es el mismo, aunque el nombre puede variar segun framework. En FastAPI o Flask, la
              responsabilidad suele estar en rutas/handlers.
            </p>

            <h3>Ejemplo en FastAPI</h3>
            <pre>{`from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {
        "id": user_id,
        "name": "Alejandro",
        "email": "alejandro@email.com"
    }`}</pre>

            <h3>Que pasa aqui</h3>
            <ul>
              <li>La ruta recibe `GET /users/&#123;user_id&#125;`</li>
              <li>La funcion recibe el parametro</li>
              <li>Devuelve la respuesta al cliente</li>
            </ul>
            <blockquote>Puede no llamarse formalmente controller, pero cumple la misma idea.</blockquote>
          </section>

          <section>
            <h2>7. Que no deberia hacer un controller</h2>
            <p>Normalmente no deberia concentrar demasiada logica de negocio.</p>
            <ul>
              <li>Validaciones complejas de negocio</li>
              <li>Reglas de calculo</li>
              <li>Acceso directo y repetido a base de datos</li>
              <li>Procesos grandes y dificiles de mantener</li>
            </ul>
            <p>Lo comun es que sea una capa ligera: recibe, delega y responde.</p>
          </section>

          <section>
            <h2>8. Que tienen en comun los controllers</h2>
            <ul>
              <li>Exponen endpoints</li>
              <li>Reciben requests HTTP</li>
              <li>Transforman datos de entrada</li>
              <li>Llaman a otras capas</li>
              <li>Devuelven responses HTTP</li>
            </ul>
            <p>Representan la puerta de entrada al backend.</p>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Un controller recibe peticiones HTTP, coordina la logica necesaria y devuelve una respuesta al cliente.
            </blockquote>
            <p>
              Su funcion principal no es contener toda la logica del sistema, sino actuar como punto de entrada y
              coordinacion.
            </p>
            <pre>{`/concepts/controller`}</pre>
          </section>
        </article>
      </section>
    </main>
  );
}
