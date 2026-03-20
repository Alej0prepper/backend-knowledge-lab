import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - Swagger",
  description: "Que es Swagger y como documentar y probar APIs en .NET y Python.",
};

export default function SwaggerConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>Swagger</h2>
          <p>Documentacion interactiva para entender y probar APIs.</p>

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
            <p>Swagger permite documentar, visualizar y probar APIs de forma clara e interactiva.</p>
            <p>Ayuda a entender:</p>
            <ul>
              <li>Que endpoints existen</li>
              <li>Que metodo HTTP usa cada uno</li>
              <li>Que datos reciben</li>
              <li>Que respuestas devuelven</li>
            </ul>
            <blockquote>Swagger convierte tu API en documentacion interactiva.</blockquote>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>Imagina este endpoint:</p>
            <pre>{`GET /users/{id}`}</pre>
            <p>Sin Swagger alguien tiene que leer codigo o docs manuales para entenderlo.</p>
            <p>Con Swagger puedes ver:</p>
            <ul>
              <li>Ruta del endpoint</li>
              <li>Parametros requeridos</li>
              <li>Tipo de respuesta</li>
              <li>Ejemplos de uso</li>
              <li>Boton para probarlo</li>
            </ul>
          </section>

          <section>
            <h2>3. Para que se usa</h2>
            <p>Swagger simplifica comunicacion y pruebas de integracion.</p>
            <ul>
              <li>Documentar APIs</li>
              <li>Facilitar pruebas manuales</li>
              <li>Ayudar al frontend a consumir endpoints</li>
              <li>Aclarar el contrato de la API</li>
              <li>Reducir errores de integracion</li>
            </ul>
            <blockquote>Swagger hace que la API sea mas facil de entender y usar.</blockquote>
          </section>

          <section>
            <h2>4. Ejemplo mental facil</h2>
            <p>
              Es como el menu de un restaurante: sin menu tienes que preguntar todo; con menu ves que existe y como se
              pide.
            </p>
            <p>Swagger hace eso para una API y, ademas, permite probar endpoints desde la misma interfaz.</p>
          </section>

          <section>
            <h2>5. Que muestra normalmente Swagger</h2>
            <ul>
              <li>Rutas disponibles</li>
              <li>Metodos HTTP (`GET`, `POST`, `PUT`, `DELETE`)</li>
              <li>Parametros</li>
              <li>Body de entrada</li>
              <li>Codigos de respuesta</li>
              <li>Esquemas de request/response</li>
              <li>Autenticacion disponible</li>
            </ul>
          </section>

          <section>
            <h2>6. Como se ve en .NET</h2>
            <p>En ASP.NET Core suele usarse Swashbuckle.</p>

            <h3>Configuracion basica</h3>
            <pre>{`using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();`}</pre>

            <h3>Que pasa aqui</h3>
            <ul>
              <li>`AddSwaggerGen()` genera la documentacion OpenAPI</li>
              <li>`UseSwagger()` expone el documento</li>
              <li>`UseSwaggerUI()` habilita interfaz visual e interactiva</li>
            </ul>
            <p>Usualmente puedes verlo en:</p>
            <pre>{`/swagger`}</pre>

            <h3>Endpoint documentado automaticamente</h3>
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

            <p>Swagger detecta y muestra automaticamente este endpoint en la UI.</p>
            <ul>
              <li>Ruta: `GET /api/users/&#123;id&#125;`</li>
              <li>Parametro: `id`</li>
              <li>Tipo de respuesta esperado</li>
            </ul>
          </section>

          <section>
            <h2>7. Como se ve en Python</h2>
            <p>FastAPI integra Swagger automaticamente.</p>

            <h3>Ejemplo basico en FastAPI</h3>
            <pre>{`from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {
        "id": user_id,
        "name": "Alejandro",
        "email": "alejandro@email.com"
    }`}</pre>

            <p>Normalmente puedes ver la documentacion en:</p>
            <pre>{`/docs`}</pre>
            <p>Y la especificacion OpenAPI en:</p>
            <pre>{`/openapi.json`}</pre>

            <h3>Con modelo de respuesta</h3>
            <pre>{`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class UserResponseDto(BaseModel):
    id: int
    name: str
    email: str

@app.get("/users/{user_id}", response_model=UserResponseDto)
def get_user(user_id: int):
    return UserResponseDto(
        id=user_id,
        name="Alejandro",
        email="alejandro@email.com"
    )`}</pre>

            <p>Esto mejora la precision de la documentacion sobre estructura y tipos de respuesta.</p>
          </section>

          <section>
            <h2>8. Swagger y OpenAPI no son lo mismo</h2>
            <ul>
              <li>OpenAPI es la especificacion</li>
              <li>Swagger es el conjunto de herramientas</li>
            </ul>
            <p>En la practica, mucha gente usa Swagger para referirse a toda la experiencia de docs interactivas.</p>
          </section>

          <section>
            <h2>9. Que ventajas tiene</h2>
            <ul>
              <li>Documentacion automatica</li>
              <li>Menos documentacion manual</li>
              <li>Pruebas rapidas desde navegador</li>
              <li>Mejor comunicacion entre backend y frontend</li>
              <li>Mayor claridad de requests y responses</li>
            </ul>
          </section>

          <section>
            <h2>10. Que limitacion tiene</h2>
            <p>Swagger no reemplaza una buena explicacion funcional del negocio.</p>
            <p>
              Documenta muy bien rutas, parametros y modelos, pero no siempre explica reglas de negocio o flujos
              complejos.
            </p>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>Swagger permite documentar, visualizar y probar una API de forma interactiva.</blockquote>
            <p>Hace mucho mas facil entender y consumir endpoints para desarrollo y testing.</p>
            <pre>{`/atlas/swagger`}</pre>
          </section>
        </article>
      </section>
    </main>
  );
}
