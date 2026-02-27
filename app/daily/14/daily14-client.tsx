"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "ejemplo", label: "2) Ejemplo" },
  { id: "mentalidad", label: "3) Mentalidad" },
  { id: "dotnet", label: "4) .NET" },
  { id: "testing", label: "5) Testing" },
  { id: "takeaway", label: "Takeaway" },
] as const;

const badSnippet = `public class UserService
{
  public async Task<UserDto?> GetByIdAsync(Guid id)
  {
    var repo = new SqlUserRepository(); // Acoplado a SQL
    return await repo.GetByIdAsync(id);
  }
}`;

const diSnippet = `// Program.cs
builder.Services.AddScoped<IUserRepository, SqlUserRepository>();

public class UserService
{
  private readonly IUserRepository _repo;

  public UserService(IUserRepository repo)
  {
    _repo = repo;
  }

  public Task<UserDto?> GetByIdAsync(Guid id)
  {
    return _repo.GetByIdAsync(id);
  }
}`;

const checklistSnippet = `[ ] Verifica si servicios crean dependencias con new en lugar de inyeccion
[ ] Evalua si se puede reemplazar infraestructura sin romper logica
[ ] Revisa si tests pueden usar mocks/fakes facilmente
[ ] Detecta si cambios de DB impactan capas de negocio`;

export default function Daily14Client() {
  const [activeSection, setActiveSection] = useState<string>("idea");

  useEffect(() => {
    const sections = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/13";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(
    () => (id: string) => `${styles.tocLink} ${activeSection === id ? styles.active : ""}`,
    [activeSection]
  );

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true" />
            <div>
              <h1>Daily Backend</h1>
              <div className={styles.brandSub}>1 leccion al dia • aprendizaje visible • criterio real</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navegacion">
            <Link className={styles.pill} href="/daily">
              Archivo
            </Link>
            <Link className={styles.pill} href="/rest-lite">
              REST Lite
            </Link>
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/13">
              <span className={styles.kbd}>←</span> Dia 13
            </Link>
            <Link className={`${styles.btn} ${styles.primary}`} href="#idea">
              Empezar
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.badge}>Daily #14 • Backend Foundations</div>
                <h2 className={styles.title}>Dependencia != Instanciacion (Inversion de Dependencias)</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Arquitectura</span>
                  <span className={styles.chip}>Tag: DI</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Backend profesional depende de contratos e interfaces, no de implementaciones concretas creadas a
                  mano dentro de cada clase.
                </p>
              </div>

              <nav className={styles.toc} aria-label="Indice">
                {tocItems.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className={tocLinkClass(item.id)}>
                    {item.label}
                  </a>
                ))}
              </nav>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>Depender de algo no significa crearlo dentro de la clase.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Cuando dependes de contratos, puedes cambiar piezas sin romper todo el sistema.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo mental</h3>
                    <p className={styles.sub}>Instanciar concreto acopla; depender de interfaz desacopla.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    `new SqlUserRepository()` te ata a SQL. `IUserRepository` te deja cambiar implementacion.
                  </div>
                  <pre>{badSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Busca flexibilidad para infraestructura, testing y evolucion futura.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Podria cambiar la base de datos?</li>
                    <li>Podria mockear esto en un test?</li>
                    <li>Estoy atado a una implementacion concreta?</li>
                  </ul>

                  <div className={styles.callout}>
                    Si una clase hace `new` de todo lo que usa, suele estar fuertemente acoplada.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>Dependency Injection de ASP.NET Core resuelve implementaciones.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Registrar contrato e implementacion en `Program.cs`.</li>
                    <li>Recibir interfaz por constructor.</li>
                    <li>No crear repositorios concretos dentro del servicio.</li>
                  </ul>

                  <pre>{diSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Rigidez en tests e infraestructura suele revelar mala inversion.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Es dificil simular comportamientos.</li>
                    <li>Los tests de integracion son pesados.</li>
                    <li>Cambiar infraestructura rompe logica.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Backend profesional depende de contratos, no de implementaciones.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Entender inversion de dependencias es empezar a pensar en arquitectura real y no solo en codigo.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/13">
                      ← Dia 13
                    </Link>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={`${styles.btn} ${styles.primary}`} href="/rest-lite#aprendizaje-diario">
                      REST Lite
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Resumen rapido</h2>
                  <p>Dia 14 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> dependencia no significa instanciacion directa.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> `AddScoped` + constructor con interfaz.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> hacer `new` dentro de servicios genera rigidez.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
