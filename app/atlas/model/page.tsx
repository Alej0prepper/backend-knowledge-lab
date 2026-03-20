import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - Model",
  description: "Que es un Model y como se representa en .NET y Python.",
};

export default function ModelConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>Conceptos: Model</h2>
          <p>Representacion estructurada de entidades y datos del sistema.</p>

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
              Un Model es una representacion de los datos con los que trabaja una aplicacion. Define que informacion
              existe, como se estructura y, en muchos casos, como se relaciona con otros datos.
            </p>
            <blockquote>Un model representa una entidad o estructura de datos dentro del sistema.</blockquote>
            <p>Segun el contexto, puede representar:</p>
            <ul>
              <li>Una tabla de base de datos</li>
              <li>Un objeto de dominio</li>
              <li>Una estructura de datos usada por la aplicacion</li>
            </ul>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>En una aplicacion de usuarios, un model podria tener:</p>
            <ul>
              <li>Id</li>
              <li>Name</li>
              <li>Email</li>
            </ul>
            <p>Ese model define la forma de un usuario en el sistema.</p>
            <pre>{`User
- Id
- Name
- Email`}</pre>
          </section>

          <section>
            <h2>3. Para que se usa</h2>
            <p>Un model define la estructura de los datos que maneja el sistema.</p>
            <ul>
              <li>Representar entidades del negocio</li>
              <li>Organizar informacion</li>
              <li>Mapear datos desde o hacia base de datos</li>
              <li>Trabajar con objetos de forma clara en el codigo</li>
            </ul>
            <blockquote>El model define como se ve un dato dentro de la aplicacion.</blockquote>
          </section>

          <section>
            <h2>4. Ejemplo mental facil</h2>
            <p>
              Si en un sistema existe la entidad Producto, necesitas una plantilla que diga que campos tiene: nombre,
              precio y stock.
            </p>
            <p>El model es justamente esa plantilla de estructura.</p>
          </section>

          <section>
            <h2>5. Como se ve en .NET</h2>
            <p>En .NET, un model suele definirse como una clase.</p>

            <h3>Ejemplo de model en .NET</h3>
            <pre>{`public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}`}</pre>

            <h3>Que representa esto</h3>
            <ul>
              <li>Existe una entidad llamada `User`</li>
              <li>Tiene propiedades</li>
              <li>Cada instancia representa un usuario</li>
            </ul>
            <p>Con Entity Framework, este model tambien puede mapearse a base de datos.</p>

            <h3>Ejemplo con mas campos</h3>
            <pre>{`public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
}`}</pre>
          </section>

          <section>
            <h2>6. Como se ve en Python</h2>
            <p>En Python la idea es la misma: una clase que define estructura de datos.</p>

            <h3>Ejemplo simple en Python</h3>
            <pre>{`class User:
    def __init__(self, id: int, name: str, email: str):
        self.id = id
        self.name = name
        self.email = email`}</pre>

            <p>Cada objeto de esa clase representa un usuario.</p>

            <h3>Ejemplo con dataclass</h3>
            <pre>{`from dataclasses import dataclass

@dataclass
class Product:
    id: int
    name: str
    price: float
    stock: int`}</pre>
          </section>

          <section>
            <h2>7. Model no es lo mismo que DTO</h2>
            <p>
              Aunque se parezcan, no son lo mismo. El model representa estructura interna; el DTO transporta datos
              entre capas o hacia afuera del sistema.
            </p>
            <p>Ejemplo:</p>
            <ul>
              <li>Model `User`: Id, Name, Email, PasswordHash, CreatedAt</li>
              <li>DTO de respuesta: Id, Name, Email</li>
            </ul>
          </section>

          <section>
            <h2>8. Que tienen en comun los models</h2>
            <ul>
              <li>Representan datos del sistema</li>
              <li>Definen propiedades o campos</li>
              <li>Organizan entidades</li>
              <li>Pueden mapear informacion de base de datos</li>
              <li>Sirven como base para trabajar con objetos</li>
            </ul>
            <p>Es una de las estructuras mas importantes del backend.</p>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Un model es una representacion estructurada de los datos de una entidad dentro del sistema.
            </blockquote>
            <p>Sirve para definir como luce esa informacion y como se maneja dentro de la aplicacion.</p>
            <pre>{`/atlas/model`}</pre>
            <pre>{`/atlas/middleware
/atlas/dto
/atlas/controller
/atlas/model`}</pre>
            <pre>{`Controller -> DTO -> Service -> Model`}</pre>
          </section>
        </article>
      </section>
    </main>
  );
}
