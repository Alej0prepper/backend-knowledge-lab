import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - TLS",
  description: "Que es TLS y como se aplica en despliegues reales con HTTPS.",
};

export default function TlsConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>TLS</h2>
          <p>Seguridad de transporte para proteger comunicacion entre cliente y servidor.</p>

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
              TLS (Transport Layer Security) es un protocolo para proteger la comunicacion entre cliente y servidor.
            </p>
            <p>Su objetivo es que los datos viajen cifrados, integros y autenticados.</p>
            <blockquote>TLS protege la informacion mientras viaja por la red.</blockquote>
            <p>Es la base de HTTPS.</p>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>Cuando un usuario inicia sesion en una API o web, TLS protege datos como:</p>
            <ul>
              <li>Contrasenas</li>
              <li>Tokens JWT</li>
              <li>Datos personales</li>
              <li>Informacion sensible</li>
            </ul>
            <p>Cuando ves esto:</p>
            <pre>{`https://`}</pre>
            <p>la conexion esta protegida con TLS.</p>
          </section>

          <section>
            <h2>3. Que problema resuelve</h2>
            <p>Evita que los datos viajen expuestos en la red.</p>
            <p>Sin TLS, un tercero podria intentar:</p>
            <ul>
              <li>Leer informacion sensible</li>
              <li>Robar credenciales</li>
              <li>Capturar tokens</li>
              <li>Manipular datos en transito</li>
            </ul>
          </section>

          <section>
            <h2>4. Que protege TLS</h2>
            <h3>1) Confidencialidad</h3>
            <p>Los datos viajan cifrados.</p>

            <h3>2) Integridad</h3>
            <p>Permite detectar alteraciones durante el trayecto.</p>

            <h3>3) Autenticacion</h3>
            <p>Ayuda a verificar que hablas con el servidor correcto mediante certificados.</p>
          </section>

          <section>
            <h2>5. TLS y HTTPS</h2>
            <p>HTTPS es HTTP sobre TLS.</p>
            <pre>{`http://miapi.com
https://miapi.com`}</pre>
            <p>La segunda opcion es la conexion protegida.</p>
          </section>

          <section>
            <h2>6. Lo importante que suele confundirse</h2>
            <p>TLS no se mete como logica de negocio en un endpoint.</p>
            <p>Normalmente se configura en la capa que publica la app por HTTPS:</p>
            <ul>
              <li>Servidor web</li>
              <li>Reverse proxy</li>
              <li>Infraestructura</li>
              <li>Servidor de aplicacion</li>
            </ul>
            <blockquote>TLS es transporte y despliegue, no regla de negocio.</blockquote>
          </section>

          <section>
            <h2>7. Como se usa realmente en un proyecto</h2>
            <p>Cuando dices poner TLS en un proyecto, en practica significa:</p>
            <pre>{`Servir la aplicacion por HTTPS con certificado TLS`}</pre>
            <p>Eso implica, por ejemplo:</p>
            <ul>
              <li>Dominio</li>
              <li>Certificado TLS</li>
              <li>Puerto 443 abierto</li>
              <li>Redireccion de HTTP a HTTPS</li>
              <li>Publicacion detras de una capa segura</li>
            </ul>
          </section>

          <section>
            <h2>8. Ejemplo mental facil</h2>
            <p>Como enviar una carta sensible en sobre cerrado al destinatario correcto.</p>
            <p>TLS aplica esa idea en red:</p>
            <ul>
              <li>Protege contenido</li>
              <li>Ayuda a validar destino</li>
              <li>Reduce espionaje y manipulacion</li>
            </ul>
          </section>

          <section>
            <h2>9. Patron comun en VPS</h2>
            <pre>{`Cliente
-> HTTPS
-> Nginx con TLS
-> App en localhost`}</pre>
            <pre>{`Internet
-> Nginx
-> http://127.0.0.1:5000  (.NET)
-> http://127.0.0.1:8000  (Python)`}</pre>
            <p>Nginx termina TLS y reenvia la request a tu app.</p>
          </section>

          <section>
            <h2>10. Que necesitas para poner TLS en tu VPS</h2>
            <h3>1) Dominio</h3>
            <pre>{`api.midominio.com`}</pre>
            <p>Debe apuntar a la IP publica del VPS.</p>

            <h3>2) Certificado TLS</h3>
            <p>Permite identificar servidor y cifrar la conexion.</p>

            <h3>3) Proxy o servidor HTTPS</h3>
            <p>Ejemplos: Nginx, Apache, Caddy, IIS o el servidor de aplicacion.</p>

            <h3>4) Puerto 443 abierto</h3>
            <p>Es el puerto estandar de HTTPS.</p>

            <h3>5) Redireccion HTTP a HTTPS</h3>
            <p>Para que todo trafico termine en conexion segura.</p>
          </section>

          <section>
            <h2>11. Como se ve en .NET</h2>
            <p>ASP.NET Core suele correr detras de infraestructura TLS.</p>
            <pre>{`var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();`}</pre>
            <p>`UseHttpsRedirection()` ayuda a redirigir a HTTPS, pero necesitas certificado configurado en entorno.</p>
            <pre>{`Cliente
-> Nginx con TLS
-> Kestrel / app ASP.NET Core`}</pre>
          </section>

          <section>
            <h2>12. Como se ve en Python</h2>
            <p>Con FastAPI ocurre igual: TLS suele estar en proxy o infraestructura.</p>
            <pre>{`from fastapi import FastAPI

app = FastAPI()

@app.get("/saludo")
def saludo():
    return {"message": "Hola"}`}</pre>
            <p>El endpoint no activa TLS por si mismo.</p>
            <pre>{`Cliente
-> Nginx con TLS
-> Uvicorn / FastAPI`}</pre>
          </section>

          <section>
            <h2>13. Ejemplo realista de despliegue</h2>
            <pre>{`Dominio -> VPS -> Nginx -> App`}</pre>
            <pre>{`api.midominio.com
-> puerto 443
-> Nginx con certificado TLS
-> proxy_pass a tu app en localhost`}</pre>
            <pre>{`https://api.midominio.com
-> Nginx
-> http://127.0.0.1:5000`}</pre>
          </section>

          <section>
            <h2>14. TLS no es lo mismo que autenticacion</h2>
            <ul>
              <li>TLS: protege el canal de comunicacion</li>
              <li>JWT: transporta identidad entre requests</li>
              <li>Authorization: define permisos de acceso</li>
            </ul>
            <p>Son capas complementarias, no equivalentes.</p>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              TLS protege comunicacion cliente-servidor con cifrado, integridad y autenticacion.
            </blockquote>
            <p>
              En proyectos reales, poner TLS significa publicar por HTTPS con certificado en servidor, proxy o
              infraestructura.
            </p>
            <pre>{`/atlas/tls`}</pre>
          </section>
        </article>
      </section>
    </main>
  );
}
