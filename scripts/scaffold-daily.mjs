#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

function printUsage() {
  console.log("Usage: npm run daily:new -- <day-number> \"<lesson-title>\"");
  console.log("Example: npm run daily:new -- 16 \"Idempotencia: evita efectos duplicados\"");
}

function toTitleCase(input) {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\w\S*/g, (word) => word[0].toUpperCase() + word.slice(1));
}

async function ensureDoesNotExist(targetPath) {
  try {
    await fs.access(targetPath);
    throw new Error(`Target already exists: ${targetPath}`);
  } catch (error) {
    if (error && error.code === "ENOENT") return;
    throw error;
  }
}

function buildPageTsx(day) {
  return `import type { Metadata } from "next";
import Daily${day}Client from "./daily${day}-client";

export const metadata: Metadata = {
  title: "Daily Backend - Dia ${day} (TODO: Titulo de la leccion)",
  description: "TODO: Resumen corto de la leccion.",
};

export default function Daily${day}Page() {
  return <Daily${day}Client />;
}
`;
}

function buildClientTsx(day, lessonTitle, previousDay) {
  return `"use client";

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

const mainSnippet = \`// TODO: Agrega snippet principal de la leccion\`;

const secondarySnippet = \`// TODO: Agrega snippet secundario si aplica\`;

const checklistSnippet = \`[ ] Caso 1
[ ] Caso 2
[ ] Caso 3
[ ] Caso 4\`;

export default function Daily${day}Client() {
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
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/${previousDay}";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const tocLinkClass = useMemo(
    () => (id: string) => \`\${styles.tocLink} \${activeSection === id ? styles.active : ""}\`,
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
            <Link className={styles.btn} href="/daily/${previousDay}">
              <span className={styles.kbd}>←</span> Dia ${previousDay}
            </Link>
            <Link className={\`\${styles.btn} \${styles.primary}\`} href="#idea">
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
                <div className={styles.badge}>Daily #${day} • Backend Foundations</div>
                <h2 className={styles.title}>${lessonTitle}</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={\`\${styles.chip} \${styles.chipOk}\`}>3-6 min</span>
                  <span className={styles.chip}>Nivel: Principiante</span>
                  <span className={\`\${styles.chip} \${styles.chipPro}\`}>Tag: TODO</span>
                  <span className={styles.chip}>Tag: TODO</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>TODO: Mensaje principal de la leccion.</p>
              </div>

              <nav className={styles.toc} aria-label="Indice">
                {tocItems.map((item) => (
                  <a key={item.id} href={\`#\${item.id}\`} className={tocLinkClass(item.id)}>
                    {item.label}
                  </a>
                ))}
              </nav>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. La idea clave</h3>
                    <p className={styles.sub}>TODO: Concepto central.</p>
                  </div>
                  <span className={styles.chip}>Concepto</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>TODO: Frase de impacto para esta seccion.</div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Ejemplo</h3>
                    <p className={styles.sub}>TODO: Escenario practico.</p>
                  </div>
                  <span className={styles.chip}>Escenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>TODO: Punto 1.</li>
                    <li>TODO: Punto 2.</li>
                  </ul>
                  <pre>{mainSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. Como piensa un backend developer</h3>
                    <p className={styles.sub}>TODO: Criterio para decisiones tecnicas.</p>
                  </div>
                  <span className={styles.chip}>Mentalidad</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>TODO: Pregunta 1?</li>
                    <li>TODO: Pregunta 2?</li>
                    <li>TODO: Pregunta 3?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. Como se ve en .NET</h3>
                    <p className={styles.sub}>TODO: Implementacion practica.</p>
                  </div>
                  <span className={styles.chip}>Implementacion</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>TODO: Regla 1.</li>
                    <li>TODO: Regla 2.</li>
                    <li>TODO: Regla 3.</li>
                  </ul>
                  <pre>{secondarySnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. Como lo detectas como tester</h3>
                    <p className={styles.sub}>TODO: Riesgos y pruebas clave.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>TODO: Riesgo 1.</li>
                    <li>TODO: Riesgo 2.</li>
                    <li>TODO: Riesgo 3.</li>
                  </ul>
                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Idea que te llevas hoy</h3>
                    <p className={styles.sub}>TODO: Cierre en una frase clara.</p>
                  </div>
                  <span className={\`\${styles.chip} \${styles.chipOk}\`}>Cierre</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>TODO: Frase final memorable.</div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily/${previousDay}">
                      ← Dia ${previousDay}
                    </Link>
                    <Link className={styles.btn} href="/daily">
                      Ver archivo
                    </Link>
                    <Link className={\`\${styles.btn} \${styles.primary}\`} href="/rest-lite#aprendizaje-diario">
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
                  <p>Dia ${day} en una vista.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Idea clave:</strong> TODO.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> TODO.
                </div>
                <div className={styles.li}>
                  <strong>Riesgo:</strong> TODO.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
`;
}

async function main() {
  const [, , rawDay, ...rawTitleParts] = process.argv;

  if (!rawDay || rawDay === "--help" || rawDay === "-h") {
    printUsage();
    process.exit(0);
  }

  const day = Number(rawDay);
  if (!Number.isInteger(day) || day < 1) {
    console.error("Error: <day-number> must be a positive integer.");
    process.exit(1);
  }

  const previousDay = Math.max(1, day - 1);
  const lessonTitle = toTitleCase(rawTitleParts.join(" ") || `TODO: Titulo Dia ${day}`);
  const root = process.cwd();
  const dayDir = path.join(root, "app", "daily", String(day));
  const pagePath = path.join(dayDir, "page.tsx");
  const clientPath = path.join(dayDir, `daily${day}-client.tsx`);

  await ensureDoesNotExist(dayDir);
  await fs.mkdir(dayDir, { recursive: true });
  await fs.writeFile(pagePath, buildPageTsx(day), "utf8");
  await fs.writeFile(clientPath, buildClientTsx(day, lessonTitle, previousDay), "utf8");

  console.log(`Daily ${day} scaffold created:`);
  console.log(`- ${path.relative(root, pagePath)}`);
  console.log(`- ${path.relative(root, clientPath)}`);
  console.log("Next step: complete TODO fields and snippets.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
