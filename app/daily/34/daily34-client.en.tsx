"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const flowSnippet = `Request -> save data -> enqueue task -> respond OK`;

const miniProjectSnippet = `jobsQueue = []

register_user()
jobsQueue.append("send email to user")
jobsQueue.append("log analytics event")
return OK`;

const workerSnippet = `while jobsQueue:
  job = jobsQueue.pop(0)
  execute(job)`;

const checklistSnippet = `[ ] Validate fast response from the main endpoint
[ ] Verify deferred execution of secondary jobs
[ ] Simulate job failure and verify retries
[ ] Confirm job failure does not break the main operation`;

export default function Daily34Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/33";
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
            <Link className={styles.btn} href="/daily/33">
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
                <div className={styles.createdAt}>27/03/2026</div>
                <div className={styles.badge}>Daily #34 • Backend Foundations</div>
                <h2 className={styles.title}>Background Jobs: not everything should happen in the request</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>4-8 min</span>
                  <span className={styles.chip}>Level: Intermediate</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Scalability</span>
                  <span className={styles.chip}>Tag: Asynchrony</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Separating critical tasks from secondary tasks makes the backend faster for the user and more robust
                  for the system.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. The key idea</h3>
                    <p className={styles.sub}>Not everything should run during the main request.</p>
                  </div>
                  <span className={styles.chip}>Concept</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Background job = a task in the background outside the endpoint&apos;s synchronous flow.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Simple example</h3>
                    <p className={styles.sub}>User registration with secondary tasks.</p>
                  </div>
                  <span className={styles.chip}>Scenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Without background jobs: create user + email + report + analytics in the same request.</li>
                    <li>With background jobs: create user and respond quickly; email and analytics go to a queue.</li>
                    <li>The user does not wait for tasks that are not critical to confirm the action.</li>
                  </ul>

                  <pre>{flowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. How a backend developer thinks</h3>
                    <p className={styles.sub}>Decide what must be synchronous and what should be delegated.</p>
                  </div>
                  <span className={styles.chip}>Mindset</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Is this critical to respond to the user?</li>
                    <li>Does the user need to wait for this task?</li>
                    <li>If this part fails, does it break the main operation?</li>
                  </ul>
                  <ul className={styles.bullets}>
                    <li>Critical: synchronous.</li>
                    <li>Secondary: asynchronous by job.</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. How it looks in .NET</h3>
                    <p className={styles.sub}>Background tasks with workers, queues, and scheduling tools.</p>
                  </div>
                  <span className={styles.chip}>Implementation</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>`IHostedService` for internal workers.</li>
                    <li>Queues like RabbitMQ or Azure Queue to decouple work.</li>
                    <li>Tools like Hangfire for scheduled jobs and retries.</li>
                  </ul>

                  <pre>{flowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. How you detect it as a tester</h3>
                    <p className={styles.sub}>Look for deferred results and validate recovery from failures.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Actions that finish after the endpoint response.</li>
                    <li>Emails that arrive with a few seconds delay.</li>
                    <li>Data that appears with delay due to background processing.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Today&apos;s takeaway</h3>
                    <p className={styles.sub}>A professional backend separates urgent from important.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Closing</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    Not everything should be immediate for the user; some tasks should be delegated to the system.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-project (5-10 min)</h3>
                    <p className={styles.sub}>Simulate a jobs queue to understand backend asynchrony.</p>
                  </div>
                  <span className={styles.chip}>Practice</span>
                </div>
                <div className={styles.sbd}>
                  <p>Goal: identify what should be synchronous and what should be asynchronous.</p>
                  <p>Exercise for `POST /register`:</p>
                  <ul className={styles.bullets}>
                    <li>Synchronous: create user.</li>
                    <li>Asynchronous: send email and register analytics.</li>
                  </ul>

                  <pre>{miniProjectSnippet}</pre>
                  <pre>{workerSnippet}</pre>

                  <p>Level 2:</p>
                  <ul className={styles.bullets}>
                    <li>If email fails, define a retry policy.</li>
                    <li>Choose maximum attempts and backoff strategy.</li>
                  </ul>

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
                  <p>Day 34 at a glance.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Key idea:</strong> only critical work goes in the request; the rest is delegated.
                </div>
                <div className={styles.li}>
                  <strong>Practice:</strong> simulate `jobsQueue` and a worker in 5-10 min.
                </div>
                <div className={styles.li}>
                  <strong>Risk avoided:</strong> slow and fragile endpoints due to doing everything synchronously.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
