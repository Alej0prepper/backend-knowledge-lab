"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const invalidDataSnippet = `email = "lo que sea"
price = -100
phone = "123"`;

const emailWithoutVoSnippet = `string email`;

const emailWithVoSnippet = `Email.Create("test@gmail.com")`;

const moneyWithoutVoSnippet = `decimal price`;

const moneyWithVoSnippet = `Money.Create(100, "USD")`;

const phoneVoSnippet = `PhoneNumber.Create("+34 600 123 456")`;

const dateRangeVoSnippet = `DateRange.Create(start, end)`;

const percentageVoSnippet = `Percentage.Create(0.15)`;

const basicEmailSnippet = `public class Email
{
    public string Value { get; }

    public Email(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new Exception("Email vacio");

        if (!value.Contains("@"))
            throw new Exception("Email invalido");

        Value = value;
    }
}`;

const factoryEmailSnippet = `public class Email
{
    public string Value { get; }

    private Email(string value)
    {
        Value = value;
    }

    public static Email Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new Exception("Email invalido");

        if (!value.Contains("@"))
            throw new Exception("Email invalido");

        return new Email(value);
    }
}`;

const recordEmailSnippet = `public record Email
{
    public string Value { get; }

    private Email(string value)
    {
        Value = value;
    }

    public static Email Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Email invalido");

        return new Email(value);
    }
}`;

const oldUserSnippet = `public class User
{
    public string Email { get; set; }
}`;

const newUserSnippet = `public class User
{
    public Email Email { get; private set; }
}`;

const moneyRecordSnippet = `public record Money
{
    public decimal Amount { get; }
    public string Currency { get; }

    private Money(decimal amount, string currency)
    {
        Amount = amount;
        Currency = currency;
    }

    public static Money Create(decimal amount, string currency)
    {
        if (amount < 0)
            throw new Exception("No puede ser negativo");

        if (string.IsNullOrWhiteSpace(currency))
            throw new Exception("Moneda invalida");

        return new Money(amount, currency);
    }
}`;

const keyQuestionSnippet = `Esto tiene reglas?
Puede ser invalido?
Se valida en muchos sitios?`;

const checklistSnippet = `[ ] Buscar datos invalidos en DB
[ ] Detectar validaciones repetidas por endpoint
[ ] Revisar bugs por formato o normalizacion
[ ] Confirmar que hay VOs para conceptos con reglas`;

const miniProjectListSnippet = `email
price
phone`;

const beforeSnippet = `string email`;

const afterSnippet = `Email VO`;

export default function Daily44Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/43";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
            <Link className={styles.pill} href="/">
              Sobre mi
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/43">
              <span className={styles.kbd}>←</span> Clase anterior
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>14/04/2026</div>
                <div className={styles.badge}>Daily #44 • Backend Foundations</div>
                <h2 className={styles.title}>Value Objects: modelar conceptos con reglas</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>7-12 min</span>
                  <span className={styles.chip}>Nivel: Intermedio</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Dominio</span>
                  <span className={styles.chip}>Tag: Value Objects</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Un Value Object representa un concepto del dominio con reglas, sin identidad, y garantiza validez
                  dentro del sistema.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>No es estilo: es proteccion de dominio.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Value Object = concepto con reglas + sin identidad + igualdad por valor.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="problema">
                <div className={styles.shd}>
                  <div>
                    <h3>2. El problema que resuelven</h3>
                    <p className={styles.sub}>Datos primitivos permiten estados invalidos.</p>
                  </div>
                  <span className={styles.chip}>Problema</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{invalidDataSnippet}</pre>
                  <ul className={styles.bullets}>
                    <li>Validas en muchos lugares.</li>
                    <li>Olvidas validar en otros.</li>
                    <li>Aparecen bugs inconsistentes.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="que-hacen">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Que hacen realmente</h3>
                    <p className={styles.sub}>Hacen imposible crear datos invalidos.</p>
                  </div>
                  <span className={styles.chip}>Impacto</span>
                </div>
                <div className={styles.sbd}>
                  <p>Encapsulan reglas y garantizan validez siempre.</p>
                </div>
              </section>

              <section className={styles.section} id="examples">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Ejemplos claros</h3>
                    <p className={styles.sub}>Email, Money, PhoneNumber, DateRange, Percentage.</p>
                  </div>
                  <span className={styles.chip}>Ejemplos</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Email</h4>
                  <pre>{emailWithoutVoSnippet}</pre>
                  <pre>{emailWithVoSnippet}</pre>

                  <h4>Money</h4>
                  <pre>{moneyWithoutVoSnippet}</pre>
                  <pre>{moneyWithVoSnippet}</pre>

                  <h4>Otros</h4>
                  <pre>{phoneVoSnippet}</pre>
                  <pre>{dateRangeVoSnippet}</pre>
                  <pre>{percentageVoSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como se modela en .NET</h3>
                    <p className={styles.sub}>Evolucion: constructor publico a fabrica a record.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Forma basica (concepto)</h4>
                  <pre>{basicEmailSnippet}</pre>

                  <h4>Forma correcta (controlando creacion)</h4>
                  <pre>{factoryEmailSnippet}</pre>

                  <h4>Forma profesional (record)</h4>
                  <pre>{recordEmailSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="caracteristicas">
                <div className={styles.shd}>
                  <div>
                    <h3>6. Caracteristicas clave</h3>
                    <p className={styles.sub}>Inmutable, igualdad por valor, sin identidad, siempre valido.</p>
                  </div>
                  <span className={styles.chip}>Claves</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Inmutable: no cambia despues de crearse.</li>
                    <li>Igualdad por valor: dos VOs iguales valen lo mismo.</li>
                    <li>Sin identidad: no tienen `Id`.</li>
                    <li>Siempre validos dentro del dominio.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="entidades">
                <div className={styles.shd}>
                  <div>
                    <h3>7. Como se usa en entidades</h3>
                    <p className={styles.sub}>Cambiar primitivos por conceptos de dominio.</p>
                  </div>
                  <span className={styles.chip}>Uso</span>
                </div>
                <div className={styles.sbd}>
                  <h4>Antes</h4>
                  <pre>{oldUserSnippet}</pre>

                  <h4>Despues</h4>
                  <pre>{newUserSnippet}</pre>

                  <p>Ahora no puedes meter strings invalidos directamente.</p>
                </div>
              </section>

              <section className={styles.section} id="money">
                <div className={styles.shd}>
                  <div>
                    <h3>8. Ejemplo potente: Money</h3>
                    <p className={styles.sub}>Controla monto, moneda y validaciones centrales.</p>
                  </div>
                  <span className={styles.chip}>Caso real</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{moneyRecordSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mindset">
                <div className={styles.shd}>
                  <div>
                    <h3>9. Como piensa un backend developer</h3>
                    <p className={styles.sub}>Busca conceptos con reglas para modelarlos como VO.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{keyQuestionSnippet}</pre>
                  <p>Si la respuesta es si, probablemente es Value Object.</p>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>10. Como lo detectas como tester</h3>
                    <p className={styles.sub}>Buscas sintomas de falta de modelado de dominio.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Datos invalidos en DB.</li>
                    <li>Validaciones repetidas por endpoint.</li>
                    <li>Bugs de formato o normalizacion.</li>
                    <li>Inconsistencias entre rutas.</li>
                  </ul>
                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>Value Objects hacen imposible que ciertos datos sean invalidos.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Backend junior usa tipos primitivos. Backend senior modela conceptos con reglas.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-proyecto (5-10 min)</h3>
                    <p className={styles.sub}>Identificar Value Objects reales de tu sistema.</p>
                  </div>
                  <span className={styles.chip}>Practica</span>
                </div>
                <div className={styles.sbd}>
                  <p>Paso 1: lista conceptos posibles.</p>
                  <pre>{miniProjectListSnippet}</pre>

                  <p>Paso 2: pregunta si tienen reglas de validez.</p>
                  <ul className={styles.bullets}>
                    <li>email: formato.</li>
                    <li>price: no negativo.</li>
                    <li>phone: formato.</li>
                  </ul>

                  <p>Paso 3: transformacion mental.</p>
                  <pre>{beforeSnippet}</pre>
                  <pre>{afterSnippet}</pre>

                  <p>Paso 4: impacto.</p>
                  <ul className={styles.bullets}>
                    <li>Antes: datos invalidos posibles.</li>
                    <li>Despues: datos siempre validos.</li>
                  </ul>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
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
                  <p>Dia 44 en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> VO = concepto con reglas y sin identidad.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> fabrica estatica + inmutabilidad + record.</div>
                <div className={styles.li}>
                  <strong>Practica:</strong> reemplazar primitivos por conceptos del dominio.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
