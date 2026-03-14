import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import styles from "../page.module.css";

type LessonCard = {
  day: string;
  title: string;
  href: string;
};

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
    .filter((item): item is (LessonCard & { dayNumber: number }) => item !== null)
    .sort((a, b) => b.dayNumber - a.dayNumber)
    .map((item) => ({
      day: item.day,
      title: item.title,
      href: item.href,
    }));
}

export default async function DailyIndexPage() {
  const lessons = await getDailyLessons();

  return (
    <main className={styles.page}>
      <section className={styles.dailySection}>
        <div className={styles.dailyHeader}>
          <h2>Daily Lessons</h2>
          <div className={styles.actions}>
            <Link href="/" className={styles.buttonPrimary}>
              Volver al Home
            </Link>
          
          </div>
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
