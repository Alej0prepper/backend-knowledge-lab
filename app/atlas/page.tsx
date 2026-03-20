import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import AtlasSearchClient from "./atlas-search-client";
import styles from "../page.module.css";

type ConceptCard = {
  name: string;
  title: string;
  href: string;
};

function getConceptTitleFromMetadata(rawTitle: string, fallbackName: string): string {
  const withoutPrefix = rawTitle.replace(/^Conceptos\s*-\s*/i, "").trim();
  if (withoutPrefix) return withoutPrefix;
  return fallbackName.replace(/-/g, " ");
}

async function getConcepts(): Promise<ConceptCard[]> {
  const conceptsDir = path.join(process.cwd(), "app", "atlas");
  const entries = await fs.readdir(conceptsDir, { withFileTypes: true });
  const conceptFolders = entries.filter((entry) => entry.isDirectory());

  const validated = await Promise.all(
    conceptFolders.map(async (entry) => {
      const routePagePath = path.join(conceptsDir, entry.name, "page.tsx");
      try {
        await fs.access(routePagePath);
        const routePageContent = await fs.readFile(routePagePath, "utf8");
        const metadataTitleMatch = routePageContent.match(/title:\s*["']([^"']+)["']/);
        const title = metadataTitleMatch
          ? getConceptTitleFromMetadata(metadataTitleMatch[1], entry.name)
          : entry.name.replace(/-/g, " ");

        return {
          name: entry.name,
          title,
          href: `/atlas/${entry.name}`,
        };
      } catch {
        return null;
      }
    })
  );

  return validated
    .filter((item): item is ConceptCard => item !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export default async function ConceptsIndexPage() {
  const concepts = await getConcepts();

  return (
    <main className={styles.page}>
      <section className={styles.dailySection}>
        <div className={styles.dailyHeader}>
          <h2>Atlas</h2>
          <div className={styles.actions}>
            <Link href="/" className={styles.buttonPrimary}>
              Volver al Home
            </Link>
            <Link href="/daily" className={styles.button}>
              Ver Daily
            </Link>
          </div>
        </div>

        <AtlasSearchClient concepts={concepts} />
      </section>
    </main>
  );
}
