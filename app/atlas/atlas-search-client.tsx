"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "../page.module.css";

type AtlasCard = {
  name: string;
  title: string;
  href: string;
};

type AtlasSearchClientProps = {
  concepts: AtlasCard[];
};

export default function AtlasSearchClient({ concepts }: AtlasSearchClientProps) {
  const [query, setQuery] = useState("");

  const filteredConcepts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return concepts;

    return concepts.filter((concept) => {
      const title = concept.title.toLowerCase();
      const name = concept.name.toLowerCase();
      return title.includes(normalizedQuery) || name.includes(normalizedQuery);
    });
  }, [concepts, query]);

  return (
    <>
      <div className={styles.atlasSearchBar}>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={styles.atlasSearchInput}
          placeholder="Buscar en Atlas..."
          aria-label="Buscar en Atlas"
        />
        <p className={styles.atlasSearchMeta}>
          {filteredConcepts.length} resultado{filteredConcepts.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className={styles.dailyGrid}>
        {filteredConcepts.map((concept) => (
          <Link key={concept.href} href={concept.href} className={styles.lessonCard}>
            <h3>{concept.title}</h3>
          </Link>
        ))}
      </div>
    </>
  );
}
