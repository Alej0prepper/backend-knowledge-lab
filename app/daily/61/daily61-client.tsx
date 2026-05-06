"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "../daily-lesson.module.css";

const tocItems = [
  { id: "idea", label: "1) Idea" },
  { id: "definition", label: "2) Definicion" },
  { id: "importance", label: "3) Por que importa" },
  { id: "mistake", label: "4) Error comun" },
  { id: "mindset", label: "5) Mentalidad backend" },
  { id: "what-to-validate", label: "6) Que validar" },
  { id: "dotnet", label: "7) .NET" },
  { id: "attacks", label: "8) Ataques que reduce" },
  { id: "testing", label: "9) Testing" },
  { id: "mini-project", label: "Practica" },
] as const;

const expectedInputSnippet = `{
  "age": 25
}`;

const invalidRangeSnippet = `{
  "age": -999999999
}`;

const invalidTypeSnippet = `{
  "age": "hola"
}`;

const typeRuleSnippet = `edad debe ser numero`;
const rangeRuleSnippet = `edad entre 0 y 120`;
const lengthRuleSnippet = `nombre maximo 100 chars`;
const formatRuleSnippet = `email valido`;
const allowedValuesSnippet = `status in [Pending, Paid]`;

const dataAnnotationsSnippet = `public class CreateUserRequest
{
    [Required]
    [EmailAddress]
    [MaxLength(100)]
    public string Email { get; set; }
}`;

const manualValidationSnippet = `if (age < 0 || age > 120)
{
    throw new Exception("Edad invalida");
}`;

const fluentValidationSnippet = `RuleFor(x => x.Email)
    .NotEmpty()
    .EmailAddress();`;

const hugePayloadSnippet = `{
  "name": "A" * 10 millones de caracteres
}`;

const wrongTypeTestSnippet = `{
  "age": "texto"
}`;

const extremeValueTestSnippet = `{
  "age": -99999
}`;

const endpointSnippet = `POST /users`;

const normalInputSnippet = `{
  "email": "test@test.com",
  "age": 25
}`;

const hostileInputSnippet = `{
  "email": "",
  "age": -999
}`;

const extremeInputSnippet = `{
  "email": "A...A (muy largo)"
}`;

export default function Daily61Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/60";
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
            <Link className={styles.btn} href="/daily/60">
              <span className={styles.kbd}>←</span> Dia 60
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
                <div className={styles.createdAt}>06/05/2026</div>
                <div className={styles.badge}>Daily #61 • Backend Foundations</div>
                <h2 className={styles.title}>Validacion de input: la primera linea de defensa</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>5-10 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Seguridad</span>
                  <span className={styles.chip}>Tag: Validation</span>
                  <span className={styles.chip}>Tag: API</span>
                  <span className={styles.chip}>Tag: Input</span>
                </div>

                <p className={styles.lead}>
                  Todo input externo es potencialmente hostil: validar temprano reduce errores y superficie de ataque.
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
                    <p className={styles.sub}>El backend recibe datos externos todo el tiempo y no debe confiar en ellos.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>Nunca confies en el input.</div>
                </div>
              </section>

              <section className={styles.section} id="definition">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Definicion clara</h3>
                    <p className={styles.sub}>Validar es comprobar formato, tamano y contenido antes de procesar.</p>
                  </div>
                  <span className={styles.chip}>Definicion</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Input validation: proceso de verificar que los datos recibidos tienen el formato, tamano y
                    contenido esperado antes de procesarlos.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="importance">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Por que es tan importante</h3>
                    <p className={styles.sub}>Sin validacion, el sistema queda expuesto a errores y abuso.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Riesgo</span>
                </div>
                <div className={styles.sbd}>
                  <p>El usuario puede enviar:</p>
                  <ul className={styles.bullets}>
                    <li>datos invalidos</li>
                    <li>datos enormes</li>
                    <li>formatos inesperados</li>
                    <li>valores maliciosos</li>
                  </ul>

                  <h4>Ejemplo esperado</h4>
                  <pre>{expectedInputSnippet}</pre>

                  <h4>Input hostil (rango)</h4>
                  <pre>{invalidRangeSnippet}</pre>

                  <h4>Input hostil (tipo)</h4>
                  <pre>{invalidTypeSnippet}</pre>

                  <p>Si no validas, aparecen errores, crashes y comportamiento inesperado.</p>
                </div>
              </section>

              <section className={styles.section} id="mistake">
                <div className={styles.shd}>
                  <div>
                    <h3>4. El error mas comun</h3>
                    <p className={styles.sub}>Asumir que con validar en frontend ya alcanza.</p>
                  </div>
                  <span className={styles.chip}>Antipatron</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>&quot;El frontend ya valida&quot; es un error grave.</div>
                  <p>Cualquiera puede llamar tu API directamente con:</p>
                  <ul className={styles.bullets}>
                    <li>Postman</li>
                    <li>curl</li>
                    <li>scripts</li>
                    <li>bots</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como piensa un backend developer</h3>
                    <p className={styles.sub}>No pregunta solo por el caso feliz: disena para casos absurdos o maliciosos.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>No: &quot;que deberia enviar el usuario&quot;.</li>
                    <li>Si: &quot;que cosas absurdas o maliciosas podrian enviarme&quot;.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="what-to-validate">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Que deberias validar</h3>
                    <p className={styles.sub}>Aplicar checks concretos por tipo, rango, tamano, formato y dominio.</p>
                  </div>
                  <span className={styles.chip}>Checklist</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Tipo</h4>
                  <pre>{typeRuleSnippet}</pre>

                  <h4>Rango</h4>
                  <pre>{rangeRuleSnippet}</pre>

                  <h4>Longitud</h4>
                  <pre>{lengthRuleSnippet}</pre>

                  <h4>Formato</h4>
                  <pre>{formatRuleSnippet}</pre>

                  <h4>Valores permitidos</h4>
                  <pre>{allowedValuesSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como se ve en .NET</h3>
                    <p className={styles.sub}>Tienes varias capas para validar segun el contexto del endpoint.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Data Annotations</h4>
                  <pre>{dataAnnotationsSnippet}</pre>

                  <h4>Validacion manual</h4>
                  <pre>{manualValidationSnippet}</pre>

                  <h4>FluentValidation</h4>
                  <pre>{fluentValidationSnippet}</pre>

                  <p>Validar no es solo evitar errores: tambien reduce superficie de ataque.</p>
                </div>
              </section>

              <section className={styles.section} id="attacks">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Que ataques ayuda a prevenir</h3>
                    <p className={styles.sub}>Buena validacion limita impactos de payloads peligrosos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Proteccion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>SQL Injection</li>
                    <li>payloads enormes</li>
                    <li>crashes</li>
                    <li>abuso de memoria</li>
                    <li>comportamiento inesperado</li>
                  </ul>

                  <h4>Ejemplo real</h4>
                  <pre>{hugePayloadSnippet}</pre>
                  <p>Ese input puede consumir RAM, ralentizar el sistema y generar DoS.</p>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Prueba tipos invalidos, extremos, payloads grandes y campos inesperados.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Tipo incorrecto</h4>
                  <pre>{wrongTypeTestSnippet}</pre>

                  <h4>Valor extremo</h4>
                  <pre>{extremeValueTestSnippet}</pre>

                  <h4>Payload enorme</h4>
                  <p>Observa si responde controlado o se degrada.</p>

                  <h4>Campos inesperados</h4>
                  <p>Verifica si ignora, rechaza o crashea.</p>

                  <div className={styles.callout}>
                    El backend mas vulnerable es el que asume que el cliente se comportara bien.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Practica guiada (5-10 min)</h3>
                    <p className={styles.sub}>Rompe mentalmente una API con input hostil y observa su defensa.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Ejercicio</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Objetivo</h4>
                  <p>Evaluar si un endpoint controla input invalido o explota.</p>

                  <h4>Endpoint</h4>
                  <pre>{endpointSnippet}</pre>

                  <h4>Paso 1 - Input normal</h4>
                  <pre>{normalInputSnippet}</pre>

                  <h4>Paso 2 - Inputs hostiles</h4>
                  <pre>{hostileInputSnippet}</pre>

                  <h4>Paso 3 - Input extremo</h4>
                  <pre>{extremeInputSnippet}</pre>

                  <h4>Paso 4 - Pregunta clave</h4>
                  <p>El backend controla esto o simplemente explota?</p>

                  <h4>Que debes notar</h4>
                  <ul className={styles.bullets}>
                    <li>Validar es defender.</li>
                    <li>El cliente no es confiable.</li>
                    <li>Pequenos checks evitan grandes problemas.</li>
                  </ul>

                  <h4>Nivel 2</h4>
                  <ul className={styles.bullets}>
                    <li>Que endpoint de tu sistema acepta input peligroso?</li>
                    <li>Que pasa si mandas payloads gigantes?</li>
                  </ul>

                  <div className={styles.quote}>Backend junior recibe datos. Backend senior desconfia de ellos.</div>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
