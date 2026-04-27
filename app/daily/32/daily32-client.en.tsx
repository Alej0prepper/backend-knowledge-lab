"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const optimisticSnippet = `// EF Core - optimistic concurrency with RowVersion
public class Product
{
  public int Id { get; set; }
  public int Stock { get; set; }

  [Timestamp]
  public byte[] RowVersion { get; set; } = Array.Empty<byte>();
}`;

const strategiesSnippet = `Locking -> one operation at a time
Optimistic concurrency -> everyone tries, but you detect conflicts
Idempotency -> repeating does not break the outcome`;

const checklistSnippet = `[ ] Send multiple simultaneous requests to the same resource
[ ] Repeat purchases, payments, or reservations in parallel
[ ] Verify negative stock, duplicates, or inconsistent states
[ ] Confirm conflict handling and retries`;

export default function Daily32Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/31";
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true" />
            <div>
              <h1>Daily Backend</h1>
              <div className={styles.brandSub}>1 lesson per day • visible learning • real engineering judgment</div>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Navigation">
            <Link className={styles.pill} href="/daily">
              Archive
            </Link>
            <Link className={styles.pill} href="/">
              About me
            </Link>
          </nav>

          <div className={styles.actions}>
            <Link className={styles.btn} href="/daily/31">
              <span className={styles.kbd}>←</span> Previous lesson
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.grid}>
          <article className={styles.card}>
            <div className={styles.bd}>
              <div className={styles.dailyHero}>
                <div className={styles.createdAt}>25/03/2026</div>
                <div className={styles.badge}>Daily #32 • Backend Foundations</div>
                <h2 className={styles.title}>Concurrency: multiple users, same resource</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>4-7 min</span>
                  <span className={styles.chip}>Level: Intermediate</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Consistency</span>
                  <span className={styles.chip}>Tag: Race Conditions</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Concurrency is not a rare exception: it appears as soon as several users touch the same data at
                  the same time.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. The key idea</h3>
                    <p className={styles.sub}>Multiple simultaneous operations on the same resource can break consistency.</p>
                  </div>
                  <span className={styles.chip}>Concept</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Your backend serves many users at once. If they share data, you must design for concurrency.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Simple example</h3>
                    <p className={styles.sub}>Stock = 1, two users buy at the same time.</p>
                  </div>
                  <span className={styles.chip}>Scenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>User A buys and sees available stock.</li>
                    <li>User B buys at the same time and also sees available stock.</li>
                    <li>Result: you sold 2 units when there was only 1.</li>
                  </ul>

                  <div className={styles.quote}>That collision between simultaneous operations is a race condition.</div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. The real problem</h3>
                    <p className={styles.sub}>Both read the same state and act as if they were the only ones.</p>
                  </div>
                  <span className={styles.chip}>Problem</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Both read `stock = 1`.</li>
                    <li>Both make decisions without knowing about the other.</li>
                    <li>Both save changes and end up breaking consistency.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. How concurrency is handled</h3>
                    <p className={styles.sub}>There is no single recipe: strategies are combined depending on the case.</p>
                  </div>
                  <span className={styles.chip}>Implementation</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Locking: one operation at a time. Safe, but less scalable.</li>
                    <li>Optimistic concurrency: everyone tries, but conflicts are detected on save.</li>
                    <li>Idempotency: repeating the operation does not break the final result.</li>
                  </ul>

                  <pre>{strategiesSnippet}</pre>
                  <pre>{optimisticSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. How a backend developer thinks and how you detect it as a tester</h3>
                    <p className={styles.sub}>Design is based on criticality, scale, and repetition possibility.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>If critical: lock or strong transaction.</li>
                    <li>If it scales heavily: optimistic concurrency.</li>
                    <li>If it can repeat: idempotency.</li>
                  </ul>
                  <ul className={styles.bullets}>
                    <li>Test stock, payments, reservations, and critical operations in parallel.</li>
                    <li>Look for duplicates, negative stock, and inconsistent states.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Today&apos;s takeaway</h3>
                    <p className={styles.sub}>Concurrency is not eliminated; it is managed with strategy.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Closing</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Junior backend avoids concurrency. Senior backend designs for it.
                  </div>

                  <div className={styles.footerNav}>
                    <Link className={styles.btn} href="/daily">
                      View archive
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
                  <h2>Quick summary</h2>
                  <p>Day 32 at a glance.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Key idea:</strong> multiple users on the same data generate real conflicts.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> transactions, `RowVersion`, and idempotency help protect consistency.
                </div>
                <div className={styles.li}>
                  <strong>Risk:</strong> duplicates, overselling, and inconsistent states.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
