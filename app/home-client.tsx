"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

type Language = "en" | "es";

type LessonCard = {
  dayNumber: number;
  title: string;
  href: string;
};

const dictionary = {
  en: {
    intro:
      "I have a bachelor's degree in Computer Science and currently work as a backend developer using C#.",
    summary: "This is a page where I can document knowledge and share it with the community.",
    tags: [
      "BSc in Computer Science",
      "Backend Developer",
      "C#",
      "REST Lite",
      "Daily Lessons",
      "Knowledge Sharing",
    ],
    dailyArchive: "View Daily Archive",
    mainPhoto: "Main photo",
    profilePhotoAlt: "Profile photo",
    dailyDescription: "Short daily lessons. Click any card to open it.",
    dayLabel: "Day",
    languageLabel: "Language",
  },
  es: {
    intro:
      "Soy licenciado en Ciencia de la Computacion y actualmente trabajo como desarrollador backend en lenguaje C#.",
    summary: "Esta es una pagina donde puedo plasmar conocimiento para compartir con la comunidad.",
    tags: [
      "Licenciado en Ciencia de la Computacion",
      "Backend Developer",
      "C#",
      "REST Lite",
      "Lecciones Diarias",
      "Compartir Conocimiento",
    ],
    dailyArchive: "Ver Archivo Daily",
    mainPhoto: "Foto principal",
    profilePhotoAlt: "Foto de perfil",
    dailyDescription: "Lecciones cortas diarias. Haz click en una card para abrirla.",
    dayLabel: "Dia",
    languageLabel: "Idioma",
  },
} as const;

type HomeClientProps = {
  lessons: LessonCard[];
};

export default function HomeClient({ lessons }: HomeClientProps) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("site-language");
    if (savedLanguage === "en" || savedLanguage === "es") {
      setLanguage(savedLanguage);
    }
    const onLanguageChange = () => {
      const nextSavedLanguage = window.localStorage.getItem("site-language");
      if (nextSavedLanguage === "en" || nextSavedLanguage === "es") {
        setLanguage(nextSavedLanguage);
      }
    };
    window.addEventListener("site-language-change", onLanguageChange as EventListener);
    return () => {
      window.removeEventListener("site-language-change", onLanguageChange as EventListener);
    };
  }, []);

  const copy = dictionary[language];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        

        <div className={styles.heroContent}>
          <div>
            <h1>Alejandro Alvarez Lamazares</h1>
            <p className={styles.subtitle}>{copy.intro}</p>
            <div className={styles.tags}>
              {copy.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className={styles.subtitle}>{copy.summary}</p>
            <div className={styles.actions}>
              <Link href="/atlas" className={styles.buttonPrimary}>
                Atlas
              </Link>
              <Link href="/daily" className={styles.button}>
                {copy.dailyArchive}
              </Link>
            </div>
          </div>

          <aside className={styles.heroPreview} aria-label={copy.mainPhoto}>
            <p className={styles.previewLabel}>{copy.mainPhoto}</p>
            <div className={styles.imagePlaceholder}>
              <Image
                src="/images/hero.png"
                alt={copy.profilePhotoAlt}
                fill
                priority
                className={styles.heroPhoto}
              />
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.dailySection}>
        <div className={styles.dailyHeader}>
          <h2>Daily Lessons</h2>
          <p>{copy.dailyDescription}</p>
        </div>

        <div className={styles.dailyGrid}>
          {lessons.map((lesson) => (
            <Link key={lesson.href} href={lesson.href} className={styles.lessonCard}>
              <span className={styles.day}>
                {copy.dayLabel} {lesson.dayNumber}
              </span>
              <h3>{lesson.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
