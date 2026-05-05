import type { Metadata } from "next";
import Link from "next/link";
import shell from "../../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Conceptos - Windows Host",
  description: "Que significa configurar algo en el host de Windows y como distinguirlo de Docker, WSL o VM.",
};

export default function WindowsHostConceptPage() {
  return (
    <main className={shell.page}>
      <section className={shell.dailySection}>
        <header className={shell.dailyHeader}>
          <h2>Windows Host</h2>
          <p>Como interpretar correctamente cuando te piden configurar algo en el host de Windows.</p>

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
              Cuando alguien te dice &quot;configuralo en el host de Windows&quot;, normalmente se refiere a la maquina
              principal donde corre Windows, no al contenedor, no a la VM y no a un servicio aislado.
            </p>
            <blockquote>El host es el sistema base sobre el que se ejecutan otras cosas.</blockquote>
          </section>

          <section>
            <h2>2. Que significa host</h2>
            <p>
              La palabra host suele usarse para la maquina anfitriona: el entorno principal donde corren procesos,
              servicios o sistemas invitados.
            </p>
            <p>Si tienes Windows instalado en tu PC y encima Docker, WSL o VMs, muchas veces Windows es el host.</p>
          </section>

          <section>
            <h2>3. Ejemplo simple</h2>
            <pre>{`Windows
-> Docker
-> contenedor con tu app`}</pre>
            <ul>
              <li>Windows es el host</li>
              <li>Docker corre sobre Windows</li>
              <li>El contenedor corre dentro de Docker</li>
            </ul>
            <p>
              Si te dicen &quot;no en el contenedor, en el host&quot;, te estan pidiendo hacerlo directamente en
              Windows.
            </p>
          </section>

          <section>
            <h2>4. Que quieren decir realmente</h2>
            <p>Cuando dicen &quot;en el host&quot;, normalmente quieren decir:</p>
            <ul>
              <li>Configurarlo en el sistema operativo principal</li>
              <li>Hacer el cambio fuera del contenedor</li>
              <li>Hacer el cambio fuera de la maquina virtual</li>
              <li>Aplicarlo al entorno base de la maquina</li>
            </ul>
            <h3>Host</h3>
            <p>La maquina principal.</p>
            <h3>Guest o invitado</h3>
            <p>Lo que corre dentro de ella.</p>
          </section>

          <section>
            <h2>5. Ejemplo mental facil</h2>
            <p>Piensa en un edificio.</p>
            <h3>Host</h3>
            <p>El edificio completo.</p>
            <h3>Contenedor, VM o WSL</h3>
            <p>Oficinas o habitaciones dentro del edificio.</p>
            <p>
              Si te dicen &quot;haz el cambio en el host&quot;, te piden hacerlo en el edificio principal, no dentro de
              oficina.
            </p>
          </section>

          <section>
            <h2>6. Contextos donde se usa mucho</h2>
            <h3>Docker</h3>
            <pre>{`host Windows
-> Docker Desktop
-> contenedores Linux o Windows`}</pre>
            <p>Aqui, el host es Windows.</p>

            <h3>Maquinas virtuales</h3>
            <pre>{`host = tu Windows real
guest = la maquina virtual`}</pre>
            <p>Ejemplo: Windows host, Ubuntu guest.</p>

            <h3>WSL</h3>
            <pre>{`Windows = host
Linux dentro de WSL = entorno invitado`}</pre>
            <p>Una ruta o configuracion puede existir en Windows o en WSL, y no son lo mismo.</p>

            <h3>Redes</h3>
            <p>Tambien se usa host para hablar de una maquina en red: host local, remoto o servidor.</p>
            <p>Pero &quot;host de Windows&quot; normalmente apunta al sistema base Windows.</p>
          </section>

          <section>
            <h2>7. Que cosas se configuran en el host</h2>
            <p>Dependiendo del caso, suele referirse a:</p>
            <ul>
              <li>Variables de entorno del sistema</li>
              <li>Puertos</li>
              <li>Firewall</li>
              <li>DNS</li>
              <li>Archivo hosts</li>
              <li>Certificados</li>
              <li>Rutas del sistema</li>
              <li>Servicios del sistema operativo</li>
              <li>Recursos compartidos</li>
              <li>Permisos</li>
              <li>Instalacion de programas o dependencias</li>
            </ul>
            <p>Son configuraciones de Windows como sistema base, no del proceso aislado.</p>
          </section>

          <section>
            <h2>8. Ejemplo con Docker</h2>
            <p>Si alguien te dice &quot;abre el puerto en el host&quot;, no significa tocar codigo dentro de la app.</p>
            <p>Significa revisar cosas de Windows como firewall, puertos publicados y reglas de red.</p>
            <pre>{`Internet
-> Windows host
-> Docker
-> contenedor`}</pre>
            <p>Si la peticion no llega al contenedor, el problema puede estar en el host.</p>
          </section>

          <section>
            <h2>9. Ejemplo con archivo hosts de Windows</h2>
            <p>
              Una confusion comun: cuando dicen &quot;agregalo en el host de Windows&quot;, a veces realmente piden
              editar el
              archivo hosts.
            </p>
            <pre>{`127.0.0.1   miapp.local`}</pre>
            <p>
              Aqui host puede referirse a Windows anfitrion, pero tambien hay mezcla con el archivo llamado hosts. El
              contexto manda.
            </p>
          </section>

          <section>
            <h2>10. Host no es lo mismo que hostname</h2>
            <h3>Host</h3>
            <p>La maquina o sistema anfitrion.</p>
            <h3>Hostname</h3>
            <p>El nombre de esa maquina dentro de una red.</p>
            <p>Ejemplo: host = tu PC Windows, hostname = DESKTOP-ABC123.</p>
          </section>

          <section>
            <h2>11. Host no es lo mismo que servidor</h2>
            <h3>Host</h3>
            <p>La maquina anfitriona o sistema base.</p>
            <h3>Servidor</h3>
            <p>Un rol o servicio que corre en una maquina.</p>
            <p>
              Una misma maquina puede ser host de contenedores y ademas servidor web o de base de datos, pero host
              enfoca el entorno principal.
            </p>
          </section>

          <section>
            <h2>12. Como interpretar la frase correctamente</h2>
            <p>Si te dicen &quot;configuralo en el host de Windows&quot;, en practica suele traducirse a:</p>
            <blockquote>
              No lo hagas dentro de contenedor, VM, WSL o servicio aislado; hazlo directamente en Windows.
            </blockquote>
          </section>

          <section>
            <h2>Idea que te llevas</h2>
            <blockquote>
              Cuando se habla del host de Windows, normalmente se habla de la maquina principal que ejecuta Windows
              como sistema base.
            </blockquote>
            <p>
              Si te piden configurarlo ahi, normalmente quieren el cambio directo en Windows, no dentro de Docker,
              WSL o una maquina virtual.
            </p>
            <pre>{`/atlas/windows-host`}</pre>
          </section>
        </article>
      </section>
    </main>
  );
}
