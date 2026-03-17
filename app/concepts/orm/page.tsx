import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - ORM",
  description: "Que es un ORM y como se usa en .NET y Python.",
};

export default function OrmConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>Conceptos: ORM</h2>
          <p>Object-Relational Mapper para trabajar con base de datos usando objetos.</p>

          <div className={shell.actions}>
            <Link href="/" className={shell.buttonPrimary}>
              Volver al Home
            </Link>
            <Link href="/concepts" className={shell.button}>
              Ver Concepts
            </Link>
          </div>
        </header>

        <article className={styles.article}>
          <section>
            <h2>1. La idea clave</h2>
            <p>
              Un ORM (Object-Relational Mapper) permite trabajar con una base de datos relacional usando objetos del
              lenguaje de programacion, sin escribir todo en SQL manualmente.
            </p>
            <p>En lugar de pensar solo en tablas, filas y columnas, trabajas con:</p>
            <ul>
              <li>Clases</li>
              <li>Objetos</li>
              <li>Relaciones entre entidades</li>
            </ul>
            <blockquote>Un ORM traduce entre el mundo de objetos y el mundo relacional de la base de datos.</blockquote>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>Imagina una tabla `Users`:</p>
            <pre>{`Id | Name      | Email
1  | Alejandro | alejandro@email.com
2  | Laura     | laura@email.com`}</pre>
            <p>Sin ORM, harías SQL como:</p>
            <pre>{`SELECT Id, Name, Email FROM Users`}</pre>
            <p>Con ORM, trabajas con una clase `User` y pides usuarios desde codigo.</p>
            <pre>{`User
- Id
- Name
- Email`}</pre>
          </section>

          <section>
            <h2>3. Para que se usa</h2>
            <p>Un ORM simplifica el acceso a datos y conecta objetos con tablas.</p>
            <ul>
              <li>Mapear tablas a clases</li>
              <li>Mapear filas a objetos</li>
              <li>Reducir SQL repetitivo</li>
              <li>Manejar relaciones entre entidades</li>
              <li>Guardar y actualizar datos con APIs del lenguaje</li>
            </ul>
            <blockquote>El ORM conecta tus objetos con las tablas de la base de datos.</blockquote>
          </section>

          <section>
            <h2>4. Ejemplo mental facil</h2>
            <p>
              Tu aplicacion habla en `User`, `Product`, `Order`. La base de datos habla en tablas, columnas, joins y
              SQL. El ORM hace de traductor entre ambos mundos.
            </p>
            <p>La aplicacion pide &quot;usuarios activos&quot; y el ORM lo convierte en una consulta SQL valida.</p>
          </section>

          <section>
            <h2>5. Como se ve en .NET</h2>
            <p>En .NET, el ORM mas usado es Entity Framework Core.</p>

            <h3>Modelo</h3>
            <pre>{`public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}`}</pre>

            <h3>DbContext</h3>
            <pre>{`using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}`}</pre>

            <h3>Consultar y guardar</h3>
            <pre>{`var users = await _context.Users.ToListAsync();

var user = new User
{
    Name = "Alejandro",
    Email = "alejandro@email.com"
};

_context.Users.Add(user);
await _context.SaveChangesAsync();`}</pre>

            <p>`User` representa la entidad, `DbSet&lt;User&gt;` representa la tabla y el ORM genera el SQL necesario.</p>
          </section>

          <section>
            <h2>6. Como se ve en Python</h2>
            <p>En Python, uno de los ORMs mas conocidos es SQLAlchemy.</p>

            <h3>Modelo</h3>
            <pre>{`from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    email: Mapped[str]`}</pre>

            <h3>Consultar y guardar</h3>
            <pre>{`users = session.query(User).all()

user = User(name="Alejandro", email="alejandro@email.com")
session.add(user)
session.commit()`}</pre>

            <p>Cada objeto `User` representa una fila y el ORM traduce esas operaciones a SQL real.</p>
          </section>

          <section>
            <h2>7. Que ventajas tiene</h2>
            <ul>
              <li>Codigo mas legible</li>
              <li>Menos SQL repetitivo</li>
              <li>Mejor productividad en CRUD</li>
              <li>Mejor integracion con el framework</li>
              <li>Relaciones entre entidades mas manejables</li>
            </ul>
          </section>

          <section>
            <h2>8. Que limitaciones tiene</h2>
            <p>Un ORM ayuda mucho, pero no reemplaza el criterio tecnico.</p>
            <ul>
              <li>Puede generar queries ineficientes si se usa mal</li>
              <li>Puede ocultar lo que realmente pasa en SQL</li>
              <li>Consultas muy especificas pueden requerir SQL manual</li>
              <li>El rendimiento depende de como disenes las consultas</li>
            </ul>
            <blockquote>Usar ORM bien tambien requiere entender SQL y la base de datos.</blockquote>
          </section>

          <section>
            <h2>9. ORM no es lo mismo que base de datos</h2>
            <ul>
              <li>La base de datos almacena la informacion</li>
              <li>El ORM es la capa de acceso desde el codigo</li>
            </ul>
            <p>El ORM no reemplaza la base de datos; la abstrae para trabajar de forma mas natural.</p>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Un ORM traduce entre objetos del codigo y tablas de una base de datos relacional para consultar y guardar
              datos de forma mas natural.
            </blockquote>
            <p>
              Te permite trabajar con entidades y relaciones sin escribir siempre SQL manual, manteniendo control sobre
              el rendimiento.
            </p>
            <pre>{`/concepts/orm`}</pre>
          </section>
        </article>
      </section>
    </main>
  );
}
