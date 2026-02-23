import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

type LessonCard = {
  day: string;
  title: string;
  classType: string;
  href: string;
  status: string;
};

async function getLessonMeta(routePagePath: string): Promise<{ title: string; classType: string }> {
  try {
    const source = await fs.readFile(routePagePath, "utf8");
    const metadataTitleMatch = source.match(/title:\s*["'`](.+?)["'`]/);

    if (!metadataTitleMatch) {
      return { title: "Leccion diaria", classType: "Backend" };
    }

    const rawTitle = metadataTitleMatch[1].trim();
    const normalized = rawTitle
      .replace(/^Daily\s+Backend\s*-\s*/i, "")
      .replace(/^D[ií]a\s*\d+\s*/i, "")
      .replace(/^\((.*)\)$/, "$1")
      .replace(/^[-:–—]\s*/, "")
      .trim();

    const title = normalized.length > 0 ? normalized : "Leccion diaria";
    const lowercaseSource = source.toLowerCase();
    const lowercaseTitle = title.toLowerCase();
    const isDotNet = /(\.net|c#|asp\.net)/.test(lowercaseSource) || /(\.net|c#|asp\.net)/.test(lowercaseTitle);
    const isPython = /(python|fastapi|flask|django)/.test(lowercaseSource) || /(python|fastapi|flask|django)/.test(lowercaseTitle);
    const isApi = /(api|rest|http)/.test(lowercaseSource) || /(api|rest|http)/.test(lowercaseTitle);

    const classType = isDotNet ? ".NET" : isPython ? "Python" : isApi ? "APIs" : "Backend";

    return { title, classType };
  } catch {
    return { title: "Leccion diaria", classType: "Backend" };
  }
}

async function getDailyLessons(): Promise<LessonCard[]> {
  const dailyDir = path.join(process.cwd(), "app", "daily");
  const entries = await fs.readdir(dailyDir, { withFileTypes: true });

  const dailyFolders = entries.filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name));

  const validated = await Promise.all(
    dailyFolders.map(async (entry) => {
      const routePagePath = path.join(dailyDir, entry.name, "page.tsx");
      try {
        await fs.access(routePagePath);
        const day = Number(entry.name);
        const lessonMeta = await getLessonMeta(routePagePath);
        return {
          day: `Dia ${day}`,
          title: lessonMeta.title,
          classType: lessonMeta.classType,
          href: `/daily/${day}`,
          status: "Publicado",
          dayNumber: day,
        };
      } catch {
        return null;
      }
    })
  );

  return validated
    .filter((item): item is (LessonCard & { dayNumber: number }) => item !== null)
    .sort((a, b) => b.dayNumber - a.dayNumber)
    .map((item) => ({
      day: item.day,
      title: item.title,
      classType: item.classType,
      href: item.href,
      status: item.status,
    }));
}

export default async function Page() {
  const lessons = await getDailyLessons();
  const latestDaily = lessons.slice(0, 3);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div>
            <p className={styles.kicker}>Backend Blog</p>
            <h1>Backend Knowledge Lab</h1>
            <p className={styles.subtitle}>
              Blog practico para compartir conocimiento backend. Publicaciones en .NET y Python sobre APIs,
              arquitectura, testing y buenas practicas de produccion.
            </p>
            <div className={styles.tags}>
              <span>.NET</span>
              <span>Python</span>
              <span>REST APIs</span>
              <span>Architecture</span>
              <span>Testing</span>
              <span>Daily Lessons</span>
            </div>
            <div className={styles.actions}>
              <Link href="/rest-lite" className={styles.buttonPrimary}>
                Ver REST Lite
              </Link>
              <Link href="/rest" className={styles.button}>
                Ver REST Atlas
              </Link>
              <Link href="/daily" className={styles.button}>
                Ver todas las Daily Lessons
              </Link>
            </div>
          </div>

          <aside className={styles.heroPreview} aria-label="Imagen de portada del autor">
            <p className={styles.previewLabel}>Autor</p>
            <div className={styles.imagePlaceholder}>
              <Image src="/images/hero.png" alt="Foto de perfil" fill priority className={styles.heroPhoto} />
            </div>
            <p className={styles.previewHint}>Backend Engineer · C# · .NET · Python</p>
          </aside>
        </div>
      </section>

      <section className={styles.topicsSection}>
        <article className={styles.topicCard}>
          <p className={styles.topicLabel}>Track 01</p>
          <h2>.NET en produccion</h2>
          <p>Minimal APIs, Web APIs, clean architecture, patrones y observabilidad para servicios reales.</p>
        </article>
        <article className={styles.topicCard}>
          <p className={styles.topicLabel}>Track 02</p>
          <h2>Python backend</h2>
          <p>FastAPI, automatizacion, workers y estructura de proyectos mantenibles para equipos pequenos.</p>
        </article>
        <article className={styles.topicCard}>
          <p className={styles.topicLabel}>Track 03</p>
          <h2>Fundamentos compartidos</h2>
          <p>Diseno de APIs, seguridad, testing, versionado y decisiones de arquitectura para escalar.</p>
        </article>
      </section>

      <section className={styles.controlSection}>
        <div className={styles.controlHeader}>
          <div>
            <p className={styles.topicLabel}>Daily Lessons</p>
            <h2>Ultimas 3 publicaciones diarias</h2>
            <p>Acceso rapido a las lecciones mas recientes. Para ver el archivo completo usa el boton.</p>
          </div>
          <Link href="/daily" className={styles.button}>
            Listar todas
          </Link>
        </div>

        <div className={styles.dailyGrid}>
          {latestDaily.map((lesson) => (
            <Link key={lesson.href} href={lesson.href} className={styles.lessonCard}>
              <div className={styles.lessonMeta}>
                <span className={styles.day}>{lesson.day}</span>
                <small className={styles.classType}>Clase: {lesson.classType}</small>
              </div>
              <h3>{lesson.title}</h3>
            </Link>
          ))}

          {latestDaily.length === 0 ? (
            <article className={styles.emptyCard}>
              <h3>No hay Daily Lessons aun</h3>
              <p>Cuando publiques lecciones diarias apareceran aqui automaticamente.</p>
            </article>
          ) : null}
        </div>
      </section>

      <section className={styles.dailySection}>
        <div className={styles.dailyHeader}>
          <h2>Como usar este blog</h2>
          <p>
            Empieza por Daily Lessons para aprender de forma incremental y usa REST Lite o REST Atlas para navegar
            contenido agrupado.
          </p>
        </div>
      </section>
    </main>
  );
}
