"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const comparisonSnippet = `Rate limit -> 429 Too Many Requests
Throttling -> slower response / queue / controlled concurrency`;

const checklistSnippet = `[ ] Send many requests in sequence
[ ] Verify if there is direct blocking (429)
[ ] Verify if there is progressive slowdown
[ ] Validate impact on user experience`;

export default function Daily31Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/30";
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
            <Link className={styles.btn} href="/daily/30">
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
                <div className={styles.createdAt}>24/03/2026</div>
                <div className={styles.badge}>Daily #31 • Backend Foundations</div>
                <h2 className={styles.title}>Throttling vs Rate Limiting: not the same thing</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>3-6 min</span>
                  <span className={styles.chip}>Level: Beginner</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Resilience</span>
                  <span className={styles.chip}>Tag: Performance</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Similar in objective, but different in strategy: one cuts off excess and the other regulates the pace.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. The key idea</h3>
                    <p className={styles.sub}>Rate limiting blocks; throttling slows down or regulates.</p>
                  </div>
                  <span className={styles.chip}>Concept</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>One cuts immediately. The other smooths traffic.</div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Simple example</h3>
                    <p className={styles.sub}>Same overload problem, two different responses.</p>
                  </div>
                  <span className={styles.chip}>Scenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Rate limiting: limit of 100/min. On the 101st, response `429`.</li>
                    <li>Throttling: the system starts queueing, delaying, or reducing speed.</li>
                    <li>It does not always block immediately; it regulates progressively.</li>
                  </ul>

                  <div className={styles.quote}>Choosing between blocking and regulating depends on the endpoint context.</div>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. How a backend developer thinks</h3>
                    <p className={styles.sub}>Not all excess is abuse: sometimes there are legitimate spikes.</p>
                  </div>
                  <span className={styles.chip}>Mindset</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Do I want to block or control pace?</li>
                    <li>Is it clear abuse or normal intensive use?</li>
                    <li>How does it impact user experience?</li>
                  </ul>
                  <ul className={styles.bullets}>
                    <li>Login: usually rate limit for security.</li>
                    <li>Public API: throttling may be better for UX.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. How it looks in .NET</h3>
                    <p className={styles.sub}>Two different approaches in the same stack.</p>
                  </div>
                  <span className={styles.chip}>Implementation</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Rate limiting: middleware with clear limits and 429 response.</li>
                    <li>Throttling: queues, delays, and concurrency control.</li>
                    <li>They can be combined based on endpoint and load.</li>
                  </ul>

                  <pre>{comparisonSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. How you detect it as a tester</h3>
                    <p className={styles.sub}>Burst testing shows whether it blocks or regulates.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Send many requests in sequence.</li>
                    <li>Observe whether it blocks with 429 or slows the response.</li>
                    <li>Validate that expected behavior matches the design.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Today&apos;s takeaway</h3>
                    <p className={styles.sub}>
                      Not all excess should be blocked: sometimes regulating traffic gives a better result.
                    </p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Closing</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Choosing between rate limiting and throttling is a technical and user experience design decision.
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
                  <p>Day 31 at a glance.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Key idea:</strong> rate limit blocks, throttling regulates pace.
                </div>
                <div className={styles.li}>
                  <strong>.NET:</strong> middleware 429 vs queues/delays/concurrency.
                </div>
                <div className={styles.li}>
                  <strong>Risk:</strong> applying the wrong strategy for the traffic type.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
