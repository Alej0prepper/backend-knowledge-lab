Sí. Tu home ya tiene una base buena: tiene identidad visual, jerarquía clara y una idea útil de “blog + portfolio”. El punto es que ahora mismo se siente más como una landing bonita con cards que como una home estratégica de portfolio.

Lo que yo mejoraría se divide en 4 frentes:

## 1. Problemas actuales de la home

### Posicionamiento

Ahora mismo dices quién eres, pero no dejas claro en 3 segundos:

* qué haces exactamente
* qué tecnologías dominas
* qué puede encontrar alguien en tu sitio
* por qué debería seguir explorando

La frase:

> “Soy licenciado en Ciencia de la Computacion y actualmente trabajo como desarrollador backend en lenguaje C#”

está bien, pero es descriptiva, no diferencial.

### Mezcla blog + portfolio

Tienes las “Daily Lessons”, pero falta la parte de portfolio visible arriba.
Si la web sirve como blog y portfolio, el visitante debería ver ambos mundos en la home:

* quién eres
* qué construyes
* qué escribes
* qué destacas

Ahora mismo “Daily Lessons” domina demasiado la página.

### CTA débiles

Los botones actuales:

* Atlas
* Ver Archivo Daily

funcionan, pero faltan CTAs más orientados al usuario:

* Ver proyectos
* Leer artículos
* Sobre mí
* Contactar

### Falta de secciones clave

Para que una home de portfolio/blog funcione mejor, te faltan secciones como:

* proyectos destacados
* stack / especialidades
* artículos recientes
* breve propuesta de valor
* contacto o llamada final

---

## 2. Qué estructura te recomiendo

Yo reorganizaría la home así:

### Hero

Con mensaje mucho más fuerte:

* nombre
* rol
* enfoque
* propuesta de valor
* CTAs claros

Ejemplo de enfoque:

**Backend Developer especializado en C# y arquitectura de APIs.
Comparto lecciones diarias, proyectos personales y soluciones reales de ingeniería.**

### Mini bloque de especialidades

Un grid pequeño con 3 o 4 pilares:

* APIs y backend con C#
* arquitectura y buenas prácticas
* aprendizaje continuo
* documentación técnica

### Proyectos destacados

Aunque sean 2 o 3, esta sección es importante para el portfolio.

### Últimas Daily Lessons

En vez de tirar todas las lessons en la home, mejor mostrar solo las más recientes, por ejemplo 6.

### CTA final

Algo tipo:

* Ver todo el archivo
* Explorar proyectos
* Contactarme

---

## 3. Mejoras visuales concretas

Tu CSS no está mal. De hecho está bastante ordenado. Pero haría estos ajustes:

### Menos ruido decorativo

Los gradients y nubes animadas están bien, pero ahora mismo compiten un poco con el contenido.
Para portfolio/blog conviene que el contenido sea protagonista y el fondo acompañe.

### Más contraste jerárquico

Ahora hero y dailySection tienen prácticamente el mismo peso visual.
El hero debería sentirse claramente como la sección principal.

### Cards con más información

Las lesson cards solo tienen:

* Day
* title

Podrían tener además:

* categoría
* breve descripción
* indicador visual de lectura

### Mejor uso del espacio

En desktop tienes margen para mostrar una home más editorial, con bloques mejor distribuidos.

---

## 4. Cambios de copy que te recomiendo

En vez de esto:

> Esta es una pagina donde puedo plasmar conocimiento para compartir con la comunidad.

pon algo más profesional:

> En este espacio comparto proyectos, aprendizajes diarios y notas técnicas sobre desarrollo backend, arquitectura de APIs y buenas prácticas de ingeniería.

Y en vez de solo “Backend Learning Lab”, pondría algo que conecte portfolio + contenido:

* Backend Engineer • Portfolio & Notes
* C# Backend Portfolio
* Engineering Notes & Projects

---

## 5. Mejora técnica en tu código actual

Tu función `getDailyLessons()` está bien, pero haría 3 mejoras:

### A. Limitar cuántas lessons se muestran en la home

La home no debería renderizar todas.
Muestra solo las más recientes y deja el archivo completo en `/daily`.

### B. Extraer datos estáticos de portfolio

Ahora todo está centrado en lessons.
Puedes definir arrays estáticos de:

* proyectos destacados
* especialidades

para que la home tenga más intención.

### C. Accesibilidad y semántica

Agregaría:

* `aria-label` más descriptivos
* headings mejor distribuidos
* texto alternativo más específico de la imagen

---

## 6. Propuesta de versión mejorada

Te dejo una versión completa, manteniendo tu estilo visual, pero mejor organizada para que funcione mejor como **blog + portfolio**.

---

# `page.tsx`

```tsx
import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

type LessonCard = {
  day: string;
  title: string;
  href: string;
};

type FeaturedProject = {
  title: string;
  description: string;
  href: string;
  tag: string;
};

type Specialty = {
  title: string;
  description: string;
};

function getLessonTitleFromMetadata(rawTitle: string, day: number): string {
  const fromParentheses = rawTitle.match(/\(([^)]+)\)\s*$/)?.[1]?.trim();
  if (fromParentheses) return fromParentheses;

  const withoutPrefix = rawTitle
    .replace(/^Daily Backend\s*-\s*Dia\s*\d+\s*/i, "")
    .replace(/^[-:]\s*/, "")
    .trim();

  if (withoutPrefix) return withoutPrefix;

  return `Leccion dia ${day}`;
}

async function getDailyLessons(): Promise<LessonCard[]> {
  const dailyDir = path.join(process.cwd(), "app", "daily");
  const entries = await fs.readdir(dailyDir, { withFileTypes: true });

  const dailyFolders = entries.filter(
    (entry) => entry.isDirectory() && /^\d+$/.test(entry.name)
  );

  const validated = await Promise.all(
    dailyFolders.map(async (entry) => {
      const routePagePath = path.join(dailyDir, entry.name, "page.tsx");

      try {
        await fs.access(routePagePath);
        const day = Number(entry.name);
        const routePageContent = await fs.readFile(routePagePath, "utf8");
        const metadataTitleMatch = routePageContent.match(
          /title:\s*["']([^"']+)["']/
        );

        const title = metadataTitleMatch
          ? getLessonTitleFromMetadata(metadataTitleMatch[1], day)
          : `Leccion dia ${day}`;

        return {
          day: `Day ${day}`,
          title,
          href: `/daily/${day}`,
          dayNumber: day,
        };
      } catch {
        return null;
      }
    })
  );

  return validated
    .filter(
      (item): item is LessonCard & { dayNumber: number } => item !== null
    )
    .sort((a, b) => b.dayNumber - a.dayNumber)
    .slice(0, 6)
    .map((item) => ({
      day: item.day,
      title: item.title,
      href: item.href,
    }));
}

const featuredProjects: FeaturedProject[] = [
  {
    title: "Atlas",
    description:
      "Espacio principal del sitio para explorar conocimiento, estructura técnica y contenido organizado.",
    href: "/atlas",
    tag: "Proyecto destacado",
  },
  {
    title: "Daily Archive",
    description:
      "Archivo de lecciones diarias enfocadas en backend, buenas prácticas y aprendizaje continuo.",
    href: "/daily",
    tag: "Contenido",
  },
  {
    title: "REST Lite",
    description:
      "Exploración de ideas, patrones y decisiones de diseño relacionadas con APIs y arquitectura backend.",
    href: "/rest-lite",
    tag: "Arquitectura",
  },
];

const specialties: Specialty[] = [
  {
    title: "Backend con C#",
    description:
      "Desarrollo de servicios, APIs y lógica de negocio con enfoque en claridad y mantenibilidad.",
  },
  {
    title: "Arquitectura de APIs",
    description:
      "Diseño de endpoints, organización del dominio y buenas prácticas para aplicaciones escalables.",
  },
  {
    title: "Aprendizaje continuo",
    description:
      "Documentación de hallazgos, lecciones cortas y conocimiento técnico compartido de forma práctica.",
  },
];

export default async function Page() {
  const lessons = await getDailyLessons();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <p className={styles.kicker}>Backend Engineer • Portfolio & Notes</p>

            <h1>Alejandro Alvarez Lamazares</h1>

            <p className={styles.lead}>
              Desarrollador backend especializado en C#, APIs y organización de
              soluciones mantenibles.
            </p>

            <p className={styles.subtitle}>
              En este espacio comparto proyectos, aprendizajes diarios y notas
              técnicas sobre desarrollo backend, arquitectura de software y
              buenas prácticas de ingeniería.
            </p>

            <div className={styles.tags}>
              <span>Licenciado en Ciencia de la Computación</span>
              <span>Backend Developer</span>
              <span>C#</span>
              <span>.NET</span>
              <span>APIs</span>
              <span>Knowledge Sharing</span>
            </div>

            <div className={styles.actions}>
              <Link href="/atlas" className={styles.buttonPrimary}>
                Ver proyecto Atlas
              </Link>
              <Link href="/daily" className={styles.button}>
                Leer Daily Lessons
              </Link>
              <Link href="/about" className={styles.button}>
                Sobre mí
              </Link>
            </div>
          </div>

          <aside
            className={styles.heroPreview}
            aria-label="Vista previa del perfil profesional"
          >
            <p className={styles.previewLabel}>Perfil</p>
            <div className={styles.imagePlaceholder}>
              <Image
                src="/images/hero.png"
                alt="Retrato de Alejandro Alvarez Lamazares"
                fill
                priority
                className={styles.heroPhoto}
              />
            </div>
            <p className={styles.previewHint}>
              Backend, arquitectura y aprendizaje continuo.
            </p>
          </aside>
        </div>
      </section>

      <section className={styles.specialtiesSection}>
        <div className={styles.sectionHeader}>
          <h2>En qué me enfoco</h2>
          <p>
            Una combinación de desarrollo backend, documentación técnica y
            construcción de proyectos con intención práctica.
          </p>
        </div>

        <div className={styles.specialtiesGrid}>
          {specialties.map((item) => (
            <article key={item.title} className={styles.infoCard}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.sectionHeader}>
          <h2>Proyectos y espacios destacados</h2>
          <p>
            Una selección rápida para entender qué construyo y cómo organizo mi
            trabajo.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {featuredProjects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className={styles.projectCard}
            >
              <span className={styles.cardTag}>{project.tag}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.dailySection}>
        <div className={styles.dailyHeader}>
          <div>
            <h2>Últimas Daily Lessons</h2>
            <p>
              Lecciones cortas sobre backend, diseño de software y aprendizaje
              técnico continuo.
            </p>
          </div>

          <Link href="/daily" className={styles.inlineLink}>
            Ver archivo completo
          </Link>
        </div>

        <div className={styles.dailyGrid}>
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className={styles.lessonCard}
            >
              <span className={styles.day}>{lesson.day}</span>
              <h3>{lesson.title}</h3>
              <span className={styles.status}>Abrir lección</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          <div>
            <p className={styles.kicker}>Explora más</p>
            <h2>Contenido técnico, proyectos y evolución profesional</h2>
            <p className={styles.subtitle}>
              Este sitio funciona como bitácora de aprendizaje y como portfolio
              técnico. La idea es mostrar no solo lo que hago, sino también cómo
              pienso y cómo construyo.
            </p>
          </div>

          <div className={styles.actions}>
            <Link href="/atlas" className={styles.buttonPrimary}>
              Explorar Atlas
            </Link>
            <Link href="/daily" className={styles.button}>
              Ver publicaciones
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

# `page.module.css`

```css
.page {
  --stroke: rgba(255, 255, 255, 0.12);
  --text: rgba(255, 255, 255, 0.94);
  --muted: rgba(255, 255, 255, 0.72);
  --panel: linear-gradient(180deg, rgba(15, 22, 35, 0.94), rgba(12, 18, 32, 0.94));
  --panel-soft: rgba(255, 255, 255, 0.07);
  --accent: rgba(251, 208, 0, 0.95);

  min-height: 100vh;
  padding: 28px 16px 56px;
  background:
    radial-gradient(1000px 600px at 10% -8%, rgba(229, 37, 33, 0.18), transparent 54%),
    radial-gradient(900px 580px at 100% 2%, rgba(4, 156, 216, 0.16), transparent 54%),
    radial-gradient(700px 520px at 50% 100%, rgba(67, 176, 71, 0.12), transparent 54%),
    #0d347a;
  position: relative;
  overflow: hidden;
}

.page::before,
.page::after {
  content: "";
  position: absolute;
  width: 220px;
  height: 90px;
  border-radius: 80px;
  background: rgba(255, 255, 255, 0.18);
  filter: blur(1px);
  z-index: 0;
  animation: cloudDrift 18s linear infinite;
}

.page::before {
  top: 40px;
  left: -70px;
}

.page::after {
  top: 105px;
  right: -100px;
  animation-duration: 22s;
}

.hero,
.specialtiesSection,
.projectsSection,
.dailySection,
.ctaSection {
  width: min(1120px, 100%);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero,
.specialtiesSection,
.projectsSection,
.dailySection {
  border: 1px solid var(--stroke);
  border-radius: 20px;
  background: var(--panel);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
}

.hero {
  padding: 28px;
  animation: riseIn 520ms ease-out;
}

.specialtiesSection,
.projectsSection,
.dailySection {
  margin-top: 16px;
  padding: 22px;
  animation: riseIn 650ms ease-out;
}

.heroContent {
  display: grid;
  grid-template-columns: 1.3fr 0.85fr;
  gap: 18px;
  align-items: center;
}

.heroText {
  display: grid;
  gap: 14px;
}

.kicker {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.hero h1 {
  margin: 0;
  color: var(--text);
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.05;
}

.lead {
  margin: 0;
  color: rgba(255, 255, 255, 0.96);
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.45;
  max-width: 760px;
}

.subtitle {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
  max-width: 760px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags span {
  border: 1px solid var(--stroke);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.84);
  background: rgba(255, 255, 255, 0.08);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.button,
.buttonPrimary,
.inlineLink,
.lessonCard,
.projectCard,
.infoCard {
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease,
    background 180ms ease;
}

.button,
.buttonPrimary,
.inlineLink {
  text-decoration: none;
  border-radius: 12px;
  padding: 11px 14px;
  font-size: 14px;
  font-weight: 620;
}

.button {
  border: 1px solid var(--stroke);
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
}

.buttonPrimary {
  border: 1px solid rgba(229, 37, 33, 0.82);
  background: linear-gradient(180deg, rgba(229, 37, 33, 0.55), rgba(229, 37, 33, 0.28));
  color: #f8fcff;
}

.button:hover,
.buttonPrimary:hover,
.inlineLink:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(9, 26, 57, 0.34);
}

.heroPreview {
  border: 1px solid var(--stroke);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  padding: 14px;
}

.previewLabel {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}

.imagePlaceholder {
  margin-top: 10px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 14px;
  min-height: 300px;
  background:
    radial-gradient(320px 180px at 15% 20%, rgba(251, 208, 0, 0.18), transparent 58%),
    radial-gradient(260px 170px at 90% 80%, rgba(4, 156, 216, 0.18), transparent 58%),
    rgba(255, 255, 255, 0.02);
  position: relative;
  overflow: hidden;
}

.heroPhoto {
  object-fit: cover;
}

.previewHint {
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.62);
  font-size: 13px;
  line-height: 1.5;
}

.sectionHeader {
  display: grid;
  gap: 8px;
  margin-bottom: 14px;
}

.sectionHeader h2,
.dailyHeader h2,
.ctaBox h2 {
  margin: 0;
  color: var(--text);
  font-size: 26px;
  line-height: 1.2;
}

.sectionHeader p,
.dailyHeader p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

.specialtiesGrid,
.projectsGrid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.infoCard,
.projectCard,
.lessonCard {
  border: 1px solid var(--stroke);
  border-radius: 16px;
  background: var(--panel-soft);
  padding: 16px;
}

.infoCard:hover,
.projectCard:hover,
.lessonCard:hover {
  transform: translateY(-3px);
  border-color: rgba(251, 208, 0, 0.52);
  box-shadow: 0 10px 24px rgba(14, 32, 73, 0.24);
}

.infoCard h3,
.projectCard h3,
.lessonCard h3 {
  margin: 0;
  color: var(--text);
  font-size: 18px;
  line-height: 1.35;
}

.infoCard p,
.projectCard p {
  margin: 8px 0 0;
  color: var(--muted);
  line-height: 1.6;
}

.projectCard,
.lessonCard {
  text-decoration: none;
}

.cardTag,
.day {
  display: inline-block;
  width: fit-content;
  margin-bottom: 10px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.dailyHeader {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
}

.inlineLink {
  color: var(--text);
  border: 1px solid var(--stroke);
  background: rgba(255, 255, 255, 0.05);
  white-space: nowrap;
}

.dailyGrid {
  margin-top: 14px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.status {
  width: fit-content;
  margin-top: 10px;
  border: 1px solid var(--stroke);
  border-radius: 999px;
  padding: 4px 9px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.78);
  background: rgba(255, 255, 255, 0.04);
}

.ctaSection {
  margin-top: 16px;
  animation: riseIn 760ms ease-out;
}

.ctaBox {
  border: 1px solid rgba(251, 208, 0, 0.2);
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(18, 28, 46, 0.96), rgba(12, 18, 32, 0.96)),
    linear-gradient(90deg, rgba(251, 208, 0, 0.08), rgba(4, 156, 216, 0.06));
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
  padding: 24px;
  display: grid;
  gap: 18px;
}

@media (max-width: 900px) {
  .heroContent,
  .specialtiesGrid,
  .projectsGrid,
  .dailyGrid {
    grid-template-columns: 1fr;
  }

  .dailyHeader {
    align-items: start;
    flex-direction: column;
  }

  .imagePlaceholder {
    min-height: 240px;
  }

  .hero,
  .specialtiesSection,
  .projectsSection,
  .dailySection,
  .ctaBox {
    padding: 18px;
  }
}

@keyframes riseIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cloudDrift {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(80px);
  }
}
```

---

## 7. Lo más importante que cambia en esta versión

Esta propuesta mejora tu home porque:

* deja más claro tu perfil profesional
* no depende solo de las daily lessons
* introduce portfolio real en la portada
* mejora los CTAs
* hace que la home tenga narrativa
* mantiene tu estética, pero más madura y útil

---

## 8. Qué haría después de esto

Después de esta mejora, el siguiente paso lógico sería crear estas rutas si no las tienes aún:

* `/about`
* `/projects`
* `/contact`

Y si quieres que la página se vea todavía más sólida, el siguiente upgrade sería añadir:

* una sección de “stack”
* métricas rápidas tipo “X lecciones / X proyectos”
* una lista de “posts recientes” con extracto
* un navbar superior más profesional

Puedo prepararte una **segunda versión aún mejor**, ya con enfoque más premium tipo portfolio técnico moderno, manteniendo tu identidad visual y entregándote el código completo.
