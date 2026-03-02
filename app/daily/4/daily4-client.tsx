"use client";

import Link from "next/link";
import styles from "../daily-lesson.module.css";

export default function Daily4Client() {
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
            <Link className={styles.btn} href="/daily">
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
                <div className={styles.badge}>Daily #4 • Backend Foundations</div>
                <h2 className={styles.title}>Leccion pendiente de publicacion</h2>
                <p className={styles.lead}>
                  Esta pagina ya usa el mismo estilo visual que el resto de los dias. Solo falta cargar el contenido
                  de la leccion.
                </p>
                <div className={styles.jump}>
                  <Link className={`${styles.btn} ${styles.primary}`} href="/daily/5">
                    Ir a Dia 5
                  </Link>
                  <Link className={styles.btn} href="/daily">
                    Ver archivo
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.hd}>
                <div>
                  <h2>Estado</h2>
                  <p>Publicacion en progreso.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>✅ Estilo unificado aplicado.</div>
                <div className={styles.li}>📝 Contenido pendiente.</div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
