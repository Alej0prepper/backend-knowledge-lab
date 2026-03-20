import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - DTO",
  description: "Que es un DTO y como se aplica en .NET y Python para controlar datos de entrada y salida.",
};

export default function DtoConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>DTO</h2>
          <p>Data Transfer Object en backend con ejemplos practicos en .NET y Python.</p>

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
              Un DTO (Data Transfer Object) es un objeto que se usa para transportar datos entre capas o entre
              sistemas.
            </p>
            <p>Su objetivo no es contener logica de negocio. Su trabajo es llevar datos de un lugar a otro.</p>
            <blockquote>Un DTO normalmente solo tiene propiedades o campos.</blockquote>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>Imagina una entidad `User` interna con:</p>
            <ul>
              <li>Id</li>
              <li>Name</li>
              <li>Email</li>
              <li>PasswordHash</li>
              <li>CreatedAt</li>
            </ul>
            <p>Cuando respondes al frontend, no deberias exponer `PasswordHash`.</p>
            <p>En lugar de devolver la entidad completa, creas un DTO con solo:</p>
            <ul>
              <li>Id</li>
              <li>Name</li>
              <li>Email</li>
            </ul>
          </section>

          <section>
            <h2>3. Por que se usa</h2>
            <p>Un DTO ayuda a controlar que datos entran y salen del sistema.</p>
            <ul>
              <li>Evita exponer informacion sensible</li>
              <li>Reduce datos innecesarios</li>
              <li>Separa logica interna del contrato API</li>
              <li>Hace mas claras requests y responses</li>
            </ul>
            <blockquote>La entidad representa modelo interno; el DTO representa datos a transferir.</blockquote>
          </section>

          <section>
            <h2>4. Ejemplo mental facil</h2>
            <p>
              En un formulario de registro, el backend necesita nombre, email y contrasena. No necesita una entidad de
              base de datos completa.
            </p>
            <p>Ahí tiene sentido un objeto de entrada como:</p>
            <pre>{`RegisterUserDto`}</pre>
          </section>

          <section>
            <h2>5. Como se ve en .NET</h2>
            <p>En ASP.NET Core es comun separar entidades internas de DTOs de request/response.</p>

            <h3>Ejemplo de entidad</h3>
            <pre>{`public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}`}</pre>

            <h3>DTO de respuesta</h3>
            <pre>{`public class UserResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}`}</pre>

            <h3>Uso en un endpoint</h3>
            <pre>{`[HttpGet("{id}")]
public ActionResult<UserResponseDto> GetUser(int id)
{
    var user = new User
    {
        Id = id,
        Name = "Alejandro",
        Email = "alejandro@email.com",
        PasswordHash = "HASH_SECRETO",
        CreatedAt = DateTime.UtcNow
    };

    var dto = new UserResponseDto
    {
        Id = user.Id,
        Name = user.Name,
        Email = user.Email
    };

    return Ok(dto);
}`}</pre>

            <h3>Que pasa aqui</h3>
            <ul>
              <li>La entidad `User` contiene informacion interna</li>
              <li>El endpoint no devuelve la entidad completa</li>
              <li>Devuelve `UserResponseDto`</li>
              <li>Evita exponer `PasswordHash`</li>
            </ul>
          </section>

          <section>
            <h2>6. Como se ve en Python</h2>
            <p>En Python la idea es la misma. En FastAPI suele implementarse con Pydantic.</p>

            <h3>Ejemplo de modelo interno</h3>
            <pre>{`class User:
    def __init__(self, id: int, name: str, email: str, password_hash: str):
        self.id = id
        self.name = name
        self.email = email
        self.password_hash = password_hash`}</pre>

            <h3>DTO de respuesta con Pydantic</h3>
            <pre>{`from pydantic import BaseModel

class UserResponseDto(BaseModel):
    id: int
    name: str
    email: str`}</pre>

            <h3>Uso en FastAPI</h3>
            <pre>{`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User:
    def __init__(self, id: int, name: str, email: str, password_hash: str):
        self.id = id
        self.name = name
        self.email = email
        self.password_hash = password_hash

class UserResponseDto(BaseModel):
    id: int
    name: str
    email: str

@app.get("/users/{user_id}", response_model=UserResponseDto)
def get_user(user_id: int):
    user = User(
        id=user_id,
        name="Alejandro",
        email="alejandro@email.com",
        password_hash="HASH_SECRETO"
    )

    return UserResponseDto(
        id=user.id,
        name=user.name,
        email=user.email
    )`}</pre>

            <h3>Que pasa aqui</h3>
            <ul>
              <li>`User` representa el modelo interno</li>
              <li>`UserResponseDto` define que sale en la respuesta</li>
              <li>`password_hash` existe en backend</li>
              <li>No se expone al cliente</li>
            </ul>
          </section>

          <section>
            <h2>7. DTO de entrada y DTO de salida</h2>
            <p>Normalmente no usas un solo DTO, sino varios segun la operacion.</p>

            <h3>DTO de entrada</h3>
            <pre>{`public class CreateUserDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}`}</pre>

            <h3>DTO de salida</h3>
            <pre>{`public class UserResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}`}</pre>

            <p>Esto es util porque lo que entra al sistema no siempre es igual a lo que sale.</p>
          </section>

          <section>
            <h2>8. Que tienen en comun todos los DTOs</h2>
            <ul>
              <li>Llevan datos</li>
              <li>No contienen logica de negocio</li>
              <li>No representan directamente tablas de base de datos</li>
              <li>Definen claramente que informacion se transfiere</li>
            </ul>
            <p>Su valor esta en hacer el contrato de datos mas claro y mas seguro.</p>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Un DTO es un objeto disenado para transportar datos entre capas o sistemas, sin exponer directamente las
              entidades internas del backend.
            </blockquote>
            <p>Sirve para controlar mejor la informacion que entra y sale de tu aplicacion.</p>
            <pre>{`/atlas/dto`}</pre>
          </section>
        </article>
      </section>
    </main>
  );
}
