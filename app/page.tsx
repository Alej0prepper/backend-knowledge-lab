import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Fira_Code } from "next/font/google";
import styles from "./page.module.css";

type LessonCard = {
  day: string;
  title: string;
  href: string;
};

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

function getLessonTitleFromMetadata(rawTitle: string, day: number): string {
  const fromParentheses = rawTitle.match(/\(([^)]+)\)\s*$/)?.[1]?.trim();
  if (fromParentheses) return fromParentheses;

  const withoutPrefix = rawTitle.replace(/^Daily Backend\s*-\s*Dia\s*\d+\s*/i, "").replace(/^[-:]\s*/, "").trim();
  if (withoutPrefix) return withoutPrefix;

  return `Leccion dia ${day}`;
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
        const routePageContent = await fs.readFile(routePagePath, "utf8");
        const metadataTitleMatch = routePageContent.match(/title:\s*["']([^"']+)["']/);
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
    .filter((item): item is LessonCard & { dayNumber: number } => item !== null)
    .sort((a, b) => b.dayNumber - a.dayNumber)
    .map((item) => ({
      day: item.day,
      title: item.title,
      href: item.href,
    }));
}

export default async function Page() {
  const lessons = await getDailyLessons();

  return (
    <main className={`${styles.page} ${firaCode.className}`}>
      <header className={styles.navbar}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandGlyph} />
          <span>Alejandro Alvarez Lamazares</span>
        </Link>

        <nav className={styles.navLinks} aria-label="Primary">
          <a href="#home"><span>#</span>home</a>
          <a href="#atlas"><span>#</span>atlas</a>
          <a href="#daily"><span>#</span>daily</a>
        </nav>
      </header>

      <section id="home" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Backend Learning Lab</p>
          <h1>Alejandro Alvarez Lamazares</h1>
          <p className={styles.subtitle}>
            Soy licenciado en Ciencia de la Computacion y actualmente trabajo como desarrollador backend en lenguaje
            C#.
          </p>
          <div className={styles.tags}>
            <span>Licenciado en Ciencia de la Computacion</span>
            <span>Backend Developer</span>
            <span>C#</span>
            <span>REST Lite</span>
            <span>Daily Lessons</span>
            <span>Knowledge Sharing</span>
          </div>
          <p className={styles.subtitle}>
            Esta es una pagina donde puedo plasmar conocimiento para compartir con la comunidad.
          </p>
          <div className={styles.actions}>
            <Link href="/atlas" className={styles.buttonPrimary} id="atlas">
              Atlas
            </Link>
            <Link href="/daily" className={styles.button}>
              Ver Archivo Daily
            </Link>
          </div>
        </div>

        <aside className={styles.heroPreview} aria-label="Imagen principal del perfil">
          <div className={styles.decorSquare} aria-hidden />
          <div className={styles.decorDots} aria-hidden />
          <div className={styles.imageFrame}>
            <Image src="/images/hero.png" alt="Foto de perfil" fill priority className={styles.heroPhoto} />
          </div>
          <p className={styles.statusLine}>
            <span className={styles.statusDot} /> Backend Developer en C#
          </p>
        </aside>
      </section>

      <section className={styles.quoteSection}>
        <blockquote>
          <strong>&ldquo;Experience&rdquo;</strong> es parte del proceso para mejorar como developer backend.
        </blockquote>
      </section>

      <section id="daily" className={styles.dailySection}>
        <div className={styles.dailyHeader}>
          <h2>
            <span>#</span>Daily Lessons
          </h2>
          <p>Lecciones cortas diarias. Haz click en una card para abrirla.</p>
        </div>

        <div className={styles.dailyGrid}>
          {lessons.map((lesson) => (
            <Link key={lesson.href} href={lesson.href} className={styles.lessonCard}>
              <span className={styles.day}>{lesson.day}</span>
              <h3>{lesson.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
