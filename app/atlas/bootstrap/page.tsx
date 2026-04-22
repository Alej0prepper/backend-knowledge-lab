import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - Bootstrap",
  description: "Que es Bootstrap, que incluye y cuando conviene usarlo para interfaces web responsive.",
};

export default function BootstrapConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>Bootstrap</h2>
          <p>Framework frontend para construir interfaces responsive mas rapido.</p>

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
            <p>Bootstrap es un framework frontend que ayuda a construir interfaces web mas rapido.</p>
            <p>Trae ya resueltos muchos elementos comunes de una web:</p>
            <ul>
              <li>Layout responsive</li>
              <li>Botones</li>
              <li>Formularios</li>
              <li>Navbar</li>
              <li>Cards</li>
              <li>Modales</li>
              <li>Alerts</li>
              <li>Tablas</li>
              <li>Utilidades de espaciado y diseno</li>
            </ul>
            <blockquote>
              Bootstrap te da una base visual y estructural lista para crear interfaces sin empezar todo el CSS desde
              cero.
            </blockquote>
          </section>

          <section>
            <h2>2. Ejemplo simple</h2>
            <p>Sin Bootstrap, una pagina responsive suele requerir CSS propio, media queries y componentes base.</p>
            <p>Con Bootstrap, muchas de esas piezas ya existen y solo aplicas clases.</p>
            <pre>{`<button class="btn btn-primary">Guardar</button>`}</pre>
            <p>No tienes que disenar cada detalle basico manualmente.</p>
          </section>

          <section>
            <h2>3. Que incluye Bootstrap</h2>
            <h3>Sistema de grid</h3>
            <p>Permite organizar contenido en filas y columnas para layouts responsive.</p>

            <h3>Componentes preconstruidos</h3>
            <ul>
              <li>Botones</li>
              <li>Formularios</li>
              <li>Navbars</li>
              <li>Modales</li>
              <li>Dropdowns</li>
              <li>Cards</li>
            </ul>

            <h3>Utilidades CSS</h3>
            <p>Clases rapidas para margenes, padding, display, flex, colores y tamanos.</p>

            <h3>JavaScript para interaccion</h3>
            <p>Incluye comportamiento para modales, dropdowns, collapse y otros componentes interactivos.</p>
          </section>

          <section>
            <h2>4. En que contextos se usa</h2>
            <h3>1) Sitios web corporativos</h3>
            <p>Cuando necesitas una interfaz limpia y rapida de construir.</p>

            <h3>2) Paneles administrativos</h3>
            <p>Dashboards, formularios internos, tablas y navegacion encajan bien con Bootstrap.</p>

            <h3>3) MVPs y prototipos</h3>
            <p>Permite lanzar algo funcional rapido sin disenar todo desde cero.</p>

            <h3>4) Aplicaciones CRUD</h3>
            <p>Es especialmente comodo cuando predominan formularios, tablas, filtros, botones y modales.</p>

            <h3>5) Proyectos con diseno poco personalizado</h3>
            <p>Ayuda mucho cuando priorizas velocidad y consistencia frente a una identidad visual unica.</p>
          </section>

          <section>
            <h2>5. Ejemplo mental facil</h2>
            <p>Piensa en Bootstrap como una caja de piezas prefabricadas.</p>
            <p>
              En vez de fabricar cada ladrillo, ventana y puerta desde cero, ya tienes componentes listos y
              compatibles entre si.
            </p>
            <p>Entonces te concentras mas en estructura, contenido y logica, y menos en CSS base.</p>
          </section>

          <section>
            <h2>6. Como se usa normalmente</h2>
            <p>Bootstrap puede agregarse rapido con CDN o mediante paquetes.</p>
            <pre>{`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
    rel="stylesheet">
  <title>Ejemplo Bootstrap</title>
</head>
<body>

  <div class="container mt-4">
    <h1 class="mb-3">Hola Bootstrap</h1>
    <button class="btn btn-primary">Guardar</button>
  </div>

</body>
</html>`}</pre>
            <p>Aqui ya estas usando clases como `container`, `mt-4`, `mb-3`, `btn` y `btn-primary`.</p>
          </section>

          <section>
            <h2>7. Que problema resuelve</h2>
            <p>
              Bootstrap resuelve un problema muy comun: construir interfaces web consistentes, responsive y
              funcionales sin crear toda la base visual desde cero.
            </p>
            <ul>
              <li>Avanzar rapido</li>
              <li>Mantener consistencia visual</li>
              <li>Evitar CSS repetitivo</li>
              <li>Tener componentes comunes ya resueltos</li>
            </ul>
          </section>

          <section>
            <h2>8. Cuando conviene usarlo</h2>
            <ul>
              <li>Cuando necesitas velocidad de desarrollo</li>
              <li>Cuando el proyecto es administrativo o corporativo</li>
              <li>Cuando no quieres disenar un sistema visual desde cero</li>
              <li>Cuando el equipo necesita una base estable y conocida</li>
              <li>Cuando quieres una web responsive sin mucho esfuerzo inicial</li>
            </ul>
          </section>

          <section>
            <h2>9. Cuando puede no ser la mejor opcion</h2>
            <ul>
              <li>Cuando necesitas una identidad visual muy unica</li>
              <li>Cuando quieres un diseno muy custom desde el principio</li>
              <li>Cuando prefieres construir tu propio design system</li>
              <li>Cuando el proyecto requiere una estetica muy distinta a la de los componentes estandar</li>
            </ul>
            <p>Su ventaja es precisamente que trae muchas decisiones ya resueltas.</p>
          </section>

          <section>
            <h2>10. Bootstrap no siempre significa lo mismo</h2>
            <p>
              En desarrollo web, casi siempre Bootstrap se refiere al framework frontend. Pero el termino bootstrap o
              bootstrapping tambien aparece en otros contextos.
            </p>
            <p>
              Por ejemplo, en estadistica, bootstrapping es una tecnica de remuestreo para estimar distribuciones,
              errores estandar o intervalos de confianza a partir de una muestra.
            </p>
            <blockquote>
              Si estas hablando de frontend, paginas web o UI, normalmente Bootstrap significa el framework de
              interfaz.
            </blockquote>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Bootstrap es un framework frontend que te permite construir interfaces web responsive y consistentes mas
              rapido usando clases, componentes y utilidades ya preparadas.
            </blockquote>
            <p>
              Es especialmente util en webs corporativas, paneles administrativos, prototipos y proyectos donde
              importa mas la velocidad y la consistencia que un diseno totalmente artesanal.
            </p>
            <pre>{`/atlas/bootstrap`}</pre>
          </section>

          <section>
            <h2>Referencias</h2>
            <ul>
              <li>
                <a href="https://getbootstrap.com/" target="_blank" rel="noreferrer">
                  Bootstrap official site
                </a>
              </li>
              <li>
                <a href="https://getbootstrap.com/docs/4.1/getting-started/introduction/" target="_blank" rel="noreferrer">
                  Bootstrap introduction
                </a>
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Bootstrapping_%28statistics%29"
                  target="_blank"
                  rel="noreferrer"
                >
                  Bootstrapping in statistics
                </a>
              </li>
            </ul>
          </section>
        </article>
      </section>
    </main>
  );
}
