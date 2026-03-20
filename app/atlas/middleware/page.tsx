import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - Middleware",
  description:
    "Que es un middleware y como funciona en .NET y Python dentro del pipeline HTTP.",
};

export default function MiddlewareConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>Conceptos: Middleware</h2>
          <p>Capa intermedia del pipeline HTTP para logica transversal en backend.</p>

          <div className={shell.actions}>
            <Link href="/" className={shell.buttonPrimary}>
              Volver al Home
            </Link>
            <Link href="/atlas" className={shell.button}>
              Volver al Atlas
            </Link>
          </div>
        </header>

        <article className={styles.article}>
          <section>
            <h2>1. La idea clave</h2>
            <p>
              Un middleware es una pieza de codigo que se coloca en medio del flujo de una peticion HTTP.
            </p>
            <p>
              Recibe la solicitud antes de que llegue al endpoint, puede hacer algo con ella y luego decide si la deja
              continuar o no.
            </p>
            <blockquote>
              Es como un filtro o una estacion de control dentro del pipeline del backend.
            </blockquote>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>Un usuario hace una peticion a una API:</p>
            <pre>{`Cliente -> Backend -> Respuesta`}</pre>
            <p>Pero en realidad muchas veces el backend no la procesa directamente. Antes puede pasar por capas como:</p>
            <ul>
              <li>Autenticacion</li>
              <li>Autorizacion</li>
              <li>Manejo de errores</li>
              <li>Logging</li>
              <li>Validacion</li>
              <li>CORS</li>
            </ul>
            <p>Entonces el flujo real se parece mas a esto:</p>
            <pre>{`Cliente -> Middleware 1 -> Middleware 2 -> Middleware 3 -> Endpoint -> Respuesta`}</pre>
          </section>

          <section>
            <h2>3. Que puede hacer un middleware</h2>
            <h3>1) Ejecutar logica antes</h3>
            <ul>
              <li>Revisar si el usuario esta autenticado</li>
              <li>Registrar la peticion en logs</li>
              <li>Validar headers</li>
              <li>Medir tiempo de ejecucion</li>
            </ul>

            <h3>2) Dejar pasar la peticion</h3>
            <p>Si todo esta bien, pasa el control al siguiente componente del pipeline.</p>
            <blockquote>Yo ya hice mi trabajo, ahora sigue el siguiente.</blockquote>

            <h3>3) Interceptar o modificar la respuesta</h3>
            <ul>
              <li>Capturar errores</li>
              <li>Transformar respuesta</li>
              <li>Agregar headers</li>
              <li>Registrar resultado final</li>
            </ul>
          </section>

          <section>
            <h2>4. Ejemplo mental facil</h2>
            <p>
              Imagina un aeropuerto. Antes de subir al avion pasas por varios controles: revision de identidad,
              seguridad y control de equipaje.
            </p>
            <p>
              En backend pasa algo parecido: el endpoint es el destino final y los middlewares son controles previos y
              posteriores.
            </p>
          </section>

          <section>
            <h2>5. Como se ve en .NET</h2>
            <p>En ASP.NET Core, los middlewares forman parte del pipeline de aplicacion.</p>
            <ul>
              <li>`UseAuthentication()`</li>
              <li>`UseAuthorization()`</li>
              <li>`UseExceptionHandler()`</li>
              <li>`UseCors()`</li>
            </ul>
            <h3>Ejemplo de middleware personalizado en .NET</h3>
            <p>Este middleware mide cuanto tarda una peticion y lo escribe en consola.</p>
            <pre>{`using System.Diagnostics;

namespace MiApi.Middlewares
{
    public class RequestTimingMiddleware
    {
        private readonly RequestDelegate _next;

        public RequestTimingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();

            Console.WriteLine($"[ANTES] {context.Request.Method} {context.Request.Path}");

            await _next(context);

            stopwatch.Stop();

            Console.WriteLine($"[DESPUES] {context.Request.Method} {context.Request.Path} - {stopwatch.ElapsedMilliseconds} ms");
        }
    }
}`}</pre>

            <h3>Como registrarlo en Program.cs</h3>
            <pre>{`using MiApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseMiddleware<RequestTimingMiddleware>();

app.MapControllers();

app.Run();`}</pre>

            <h3>Que pasa aqui</h3>
            <ul>
              <li>El middleware recibe la request</li>
              <li>Ejecuta logica antes</li>
              <li>Deja pasar con `await _next(context)`</li>
              <li>Cuando el endpoint termina, ejecuta logica despues</li>
            </ul>
          </section>

          <section>
            <h2>6. Como se ve en Python</h2>
            <p>En Python este concepto existe en frameworks como FastAPI, Starlette y Django.</p>
            <h3>Ejemplo en FastAPI</h3>
            <p>Este middleware mide el tiempo de peticion y agrega un header a la respuesta.</p>
            <pre>{`from fastapi import FastAPI, Request
import time

app = FastAPI()

@app.middleware("http")
async def request_timing_middleware(request: Request, call_next):
    start_time = time.time()

    print(f"[ANTES] {request.method} {request.url.path}")

    response = await call_next(request)

    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)

    print(f"[DESPUES] {request.method} {request.url.path} - {process_time:.4f} s")

    return response

@app.get("/saludo")
async def saludo():
    return {"message": "Hola desde FastAPI"}`}</pre>

            <h3>Que pasa aqui</h3>
            <ul>
              <li>Intercepta la request</li>
              <li>Ejecuta logica antes</li>
              <li>Deja continuar con `call_next(request)`</li>
              <li>Recibe la respuesta</li>
              <li>La modifica agregando un header</li>
              <li>Devuelve la respuesta final</li>
            </ul>
          </section>

          <section>
            <h2>7. Que tienen en comun ambos ejemplos</h2>
            <p>Aunque cambie la sintaxis entre .NET y Python, la idea es la misma:</p>
            <pre>{`Request -> Middleware -> Endpoint -> Middleware -> Response`}</pre>
            <p>Un middleware puede actuar:</p>
            <ul>
              <li>Antes del endpoint</li>
              <li>Despues del endpoint</li>
              <li>O detener la peticion si algo no cumple reglas</li>
            </ul>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Middleware es una capa intermedia que puede inspeccionar, modificar o detener una peticion, y actuar
              sobre la respuesta al volver.
            </blockquote>
            <p>No pertenece a una accion puntual: pertenece al flujo general de la aplicacion.</p>
          </section>
        </article>
      </section>
    </main>
  );
}
