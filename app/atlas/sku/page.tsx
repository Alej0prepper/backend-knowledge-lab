import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - SKU",
  description: "Que es un SKU y por que es clave para inventario, variantes y operaciones.",
};

export default function SkuConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>SKU</h2>
          <p>Identificador interno para distinguir y controlar productos en inventario.</p>

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
              Un SKU (Stock Keeping Unit) es un codigo para identificar de forma unica un producto dentro de un
              inventario.
            </p>
            <p>Sirve para distinguir productos aunque sean muy parecidos entre si.</p>
            <blockquote>Un SKU es una forma interna de identificar y controlar productos.</blockquote>
            <p>No tiene que ser universal: normalmente lo define la propia empresa o el propio sistema.</p>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>Supongamos estas variantes:</p>
            <ul>
              <li>Camiseta Nike negra talla M</li>
              <li>Camiseta Nike negra talla L</li>
            </ul>
            <p>En inventario no son iguales, por eso necesitan SKU distinto:</p>
            <pre>{`CAM-NIKE-NEG-M
CAM-NIKE-NEG-L`}</pre>
          </section>

          <section>
            <h2>3. Para que se usa</h2>
            <ul>
              <li>Identificar productos de forma unica</li>
              <li>Diferenciar variantes</li>
              <li>Controlar stock</li>
              <li>Registrar entradas y salidas</li>
              <li>Facilitar busquedas internas</li>
              <li>Conectar inventario con ventas y almacen</li>
            </ul>
            <blockquote>El SKU te dice exactamente que producto estas gestionando.</blockquote>
          </section>

          <section>
            <h2>4. Ejemplo mental facil</h2>
            <p>
              Es como una biblioteca con libros parecidos: necesitas un identificador claro para saber cual edicion
              exacta tienes en la mano.
            </p>
            <p>El SKU cumple ese papel para productos y variantes.</p>
          </section>

          <section>
            <h2>5. SKU no es lo mismo que nombre del producto</h2>
            <p>El nombre suele ser comercial y no siempre distingue variante exacta.</p>
            <pre>{`Nombre: Camiseta Nike Negra
SKU: CAM-NIKE-NEG-M`}</pre>
            <p>El SKU si esta pensado para identificar una unidad concreta en inventario.</p>
          </section>

          <section>
            <h2>6. SKU no es lo mismo que codigo de barras</h2>
            <ul>
              <li>SKU: interno y definido por la empresa</li>
              <li>UPC/EAN/codigo de barras: estandar para escaneo y comercio amplio</li>
            </ul>
            <p>Un producto puede tener ambos al mismo tiempo.</p>
          </section>

          <section>
            <h2>7. Como se ve en un sistema</h2>
            <p>Normalmente aparece como campo del producto o de la variante.</p>

            <h3>Ejemplo en .NET</h3>
            <pre>{`public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
}`}</pre>

            <h3>Ejemplo en Python</h3>
            <pre>{`class Product:
    def __init__(self, id: int, name: str, sku: str, price: float, stock: int):
        self.id = id
        self.name = name
        self.sku = sku
        self.price = price
        self.stock = stock`}</pre>
          </section>

          <section>
            <h2>8. Ejemplo con variantes</h2>
            <p>Producto: Zapato deportivo.</p>
            <p>Variantes:</p>
            <pre>{`- Talla 40, color blanco
- Talla 41, color blanco
- Talla 40, color negro
- Talla 41, color negro`}</pre>
            <p>Cada variante debe tener SKU propio:</p>
            <pre>{`ZAP-BLA-40
ZAP-BLA-41
ZAP-NEG-40
ZAP-NEG-41`}</pre>
            <p>Para inventario no son intercambiables.</p>
          </section>

          <section>
            <h2>9. Caracteristicas de un buen SKU</h2>
            <p>Un buen SKU busca ser:</p>
            <ul>
              <li>Unico</li>
              <li>Claro</li>
              <li>Consistente</li>
              <li>Legible internamente</li>
              <li>Util para operaciones</li>
            </ul>
            <p>Muchas empresas combinan categoria, marca, color, talla o presentacion.</p>
            <pre>{`LAP-DELL-15-I7-16GB`}</pre>
          </section>

          <section>
            <h2>10. Que problema resuelve</h2>
            <p>Evita confusion entre productos y variantes en inventario.</p>
            <p>Sin SKU se vuelve mas dificil controlar:</p>
            <ul>
              <li>Stock real</li>
              <li>Reposicion</li>
              <li>Ventas</li>
              <li>Devoluciones</li>
              <li>Logistica y almacen</li>
            </ul>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Un SKU es un identificador interno para distinguir y controlar productos o variantes dentro de un
              inventario.
            </blockquote>
            <p>No es solo un nombre comercial: es una pieza operativa clave del sistema.</p>
            <pre>{`/atlas/sku`}</pre>
          </section>
        </article>
      </section>
    </main>
  );
}
