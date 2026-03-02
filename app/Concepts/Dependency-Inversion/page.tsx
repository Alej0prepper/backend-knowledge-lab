import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - Inversión de Dependencias",
  description:
    "La Inversión de Dependencia como respuesta a sistemas frágiles: narrativa, diagnóstico, solución y beneficios.",
};

export default function DependencyInversionConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>Conceptos: Inversión de Dependencias</h2>
          <p>Informe narrativo aplicado a arquitectura backend.</p>

          <div className={shell.actions}>
            <Link href="/" className={shell.buttonPrimary}>
              Volver al Home
            </Link>
            <Link href="/daily/14" className={shell.button}>
              Ver Día 14
            </Link>
          </div>
        </header>

        <article className={styles.article}>
          <section>
            <h2>1. Situación inicial: el cambio que rompió todo</h2>
            <p>
              Una empresa opera su sistema de pedidos sin problemas durante años. Un día decide migrar la base de
              datos por costo y rendimiento.
            </p>
            <p>La decisión parece técnica y acotada. Cambiar dónde se guardan datos.</p>
            <p>Pero al ejecutar la migración aparece una reacción en cadena:</p>
            <ul>
              <li>Se modifican servicios de negocio.</li>
              <li>Se ajustan validaciones que no deberían tocarse.</li>
              <li>Se reescriben pruebas completas.</li>
              <li>Se rompen clases sin relación directa con persistencia.</li>
            </ul>
            <blockquote>
              ¿Por qué cambiar un detalle técnico está afectando el núcleo del sistema?
            </blockquote>
            <p>La raíz no era la base de datos. La raíz era la dirección de las dependencias.</p>
          </section>

          <section>
            <h2>2. Diagnóstico: dependencia mal dirigida</h2>
            <p>La estructura original era esta:</p>
            <pre>{`OrderService -----> MySqlOrderRepository`}</pre>
            <p>
              La lógica de negocio dependía de una implementación concreta. Eso hace que el módulo más estable dependa
              del menos estable.
            </p>
            <ul>
              <li>El dominio conoce detalles técnicos.</li>
              <li>La tecnología condiciona reglas de negocio.</li>
              <li>Cualquier cambio de infraestructura sacude el núcleo.</li>
            </ul>
          </section>

          <section>
            <h2>3. La solución: invertir la dependencia</h2>
            <p>
              El principio propone invertir la dirección del acoplamiento: el negocio define contratos, los detalles
              los implementan.
            </p>
            <pre>{`MySqlOrderRepository ----+
                         |
OrderService -----------+---> IOrderRepository
                         |
PostgresOrderRepository -+`}</pre>
            <ul>
              <li>El dominio expresa qué necesita, no cómo se implementa.</li>
              <li>La infraestructura se adapta al contrato.</li>
              <li>Las dependencias apuntan al núcleo estable.</li>
            </ul>
          </section>

          <section>
            <h2>4. Ejemplo simplificado</h2>
            <h3>Abstracción definida por el dominio</h3>
            <pre>{`public interface IOrderRepository
{
    void Save(Order order);
}`}</pre>

            <h3>Servicio de negocio</h3>
            <pre>{`public class OrderService
{
    private readonly IOrderRepository _repository;

    public OrderService(IOrderRepository repository)
    {
        _repository = repository;
    }

    public void PlaceOrder(Order order)
    {
        _repository.Save(order);
    }
}`}</pre>

            <h3>Implementación concreta</h3>
            <pre>{`public class MySqlOrderRepository : IOrderRepository
{
    public void Save(Order order)
    {
        // Código de inserción en MySQL
    }
}`}</pre>

            <h3>Enlace final</h3>
            <pre>{`IOrderRepository repo = new MySqlOrderRepository();
var service = new OrderService(repo);`}</pre>
            <p>El dominio nunca conoce la base de datos concreta.</p>
          </section>

          <section>
            <h2>5. Qué se invierte realmente</h2>
            <p>No se invierte el flujo de ejecución ni la necesidad de guardar datos.</p>
            <p>Se invierte la dirección de la dependencia en tiempo de compilación.</p>
            <div className={shell.dailyGrid}>
              <div className={shell.lessonCard}>
                <h3>Antes</h3>
                <pre>{`Negocio -> Detalle`}</pre>
              </div>
              <div className={shell.lessonCard}>
                <h3>Después</h3>
                <pre>{`Detalle -> Abstracción <- Negocio`}</pre>
              </div>
            </div>
          </section>

          <section>
            <h2>6. Beneficios estructurales</h2>
            <h3>Estabilidad</h3>
            <p>Las reglas de negocio no cambian cuando cambia la tecnología.</p>
            <h3>Sustituibilidad</h3>
            <p>La infraestructura se reemplaza sin modificar el dominio.</p>
            <h3>Testabilidad</h3>
            <p>Se prueban casos de negocio con implementaciones falsas, sin base real.</p>
            <h3>Independencia tecnológica</h3>
            <p>Framework, proveedor o motor de datos dejan de definir la arquitectura central.</p>
          </section>

          <section>
            <h2>7. Conclusión</h2>
            <p>
              El problema inicial no era migrar de base de datos. Era tener el sistema con dependencias en la
              dirección equivocada.
            </p>
            <p>
              La Inversión de Dependencia no es decoración. Es una regla estructural para proteger el núcleo frente a
              la volatilidad tecnológica.
            </p>
            <blockquote>Cuando cambian los detalles, el negocio no debería romperse.</blockquote>
          </section>
        </article>
      </section>
    </main>
  );
}
