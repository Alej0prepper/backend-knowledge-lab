import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import styles from "./page.module.css";

type LessonCard = {
  day: string;
  title: string;
  href: string;
  status: string;
};

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
        return {
          day: `Day ${day}`,
          title: `Leccion dia ${day}`,
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
      href: item.href,
      status: item.status,
    }));
}

export default async function Page() {
  const lessons = await getDailyLessons();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div>
            <p className={styles.kicker}>Backend Learning Lab</p>
            <h1>Hero page simple para maquetar el proyecto</h1>
            <p className={styles.subtitle}>
              Esta version replica la direccion visual del proyecto para iterar layout, navegacion y contenido.
            </p>
            <div className={styles.tags}>
              <span>REST Lite</span>
              <span>Daily Lessons</span>
              <span>Learning + Craft</span>
            </div>
            <div className={styles.actions}>
              <Link href="/rest-lite" className={styles.buttonPrimary}>
                Ver REST Lite
              </Link>
              <Link href="/rest" className={styles.button}>
                Ver REST Atlas
              </Link>
              <Link href="/daily" className={styles.button}>
                Ver Archivo Daily
              </Link>
            </div>
          </div>

          <aside className={styles.heroPreview} aria-label="Placeholder de imagen principal">
            <p className={styles.previewLabel}>Imagen principal</p>
            <div className={styles.imagePlaceholder}>
              <span>Placeholder</span>
              <small>Aqui ira arte/imagen del proyecto</small>
            </div>
            <p className={styles.previewHint}>Sugerido: 1200x800, enfoque backend + learning.</p>
          </aside>
        </div>
      </section>

      <section className={styles.dailySection}>
        <div className={styles.dailyHeader}>
          <h2>Daily Lessons</h2>
          <p>Lecciones cortas diarias. Haz click en una card para abrirla.</p>
        </div>

        <div className={styles.dailyGrid}>
          {lessons.map((lesson) => (
            <Link key={lesson.href} href={lesson.href} className={styles.lessonCard}>
              <span className={styles.day}>{lesson.day}</span>
              <h3>{lesson.title}</h3>
              <span className={styles.status}>{lesson.status}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
