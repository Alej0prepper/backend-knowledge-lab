"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const queueFlowSnippet = `API -> publish message -> queue -> worker processes`;

const miniProjectSnippet = `queue = []

create_order()
queue.append("send email")
return OK`;

const workerSnippet = `while queue:
  message = queue.pop(0)
  process(message)`;

const checklistSnippet = `[ ] Shut down external service and verify the main API responds
[ ] Confirm pending messages are processed later
[ ] Validate automatic worker retries
[ ] Check that messages are not lost`;

export default function Daily35Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/34";
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
            <Link className={styles.btn} href="/daily/34">
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
                <div className={styles.createdAt}>30/03/2026</div>
                <div className={styles.badge}>Daily #35 • Backend Foundations</div>
                <h2 className={styles.title}>Queues: decouple systems</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>4-8 min</span>
                  <span className={styles.chip}>Level: Intermediate</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Integration</span>
                  <span className={styles.chip}>Tag: Resilience</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Queues allow decoupling components so an external failure does not bring down the main flow.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. The key idea</h3>
                    <p className={styles.sub}>Instead of executing directly, you leave a message to process later.</p>
                  </div>
                  <span className={styles.chip}>Concept</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    With queues, the backend does not depend on all systems being available in real time.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Simple example</h3>
                    <p className={styles.sub}>Send email when creating an order.</p>
                  </div>
                  <span className={styles.chip}>Scenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Without queue: API calls email directly; if it fails, everything may fail.</li>
                    <li>With queue: API publishes message and responds; worker sends email later.</li>
                    <li>The main endpoint stays fast and resilient to external outages.</li>
                  </ul>

                  <pre>{queueFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. How a backend developer thinks</h3>
                    <p className={styles.sub}>Prefer decoupling when immediate response is not needed.</p>
                  </div>
                  <span className={styles.chip}>Mindset</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Should I depend on the other system in real time?</li>
                    <li>What happens if the external service is down?</li>
                    <li>Can I turn a direct call into an asynchronous message?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. How it looks in .NET</h3>
                    <p className={styles.sub}>Typical integrations with brokers or message buses.</p>
                  </div>
                  <span className={styles.chip}>Implementation</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>RabbitMQ for classic work queues.</li>
                    <li>Azure Service Bus in cloud environments.</li>
                    <li>Kafka for larger-scale streams/events.</li>
                  </ul>

                  <pre>{queueFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. How you detect it as a tester</h3>
                    <p className={styles.sub}>You validate that the main system stays stable even if an external system fails.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Actions that are not completed instantly.</li>
                    <li>Processes that continue even when a service fails.</li>
                    <li>Automatic retries by the worker on pending messages.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Today&apos;s takeaway</h3>
                    <p className={styles.sub}>A professional backend decouples to withstand failures.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Closing</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    A mature backend does not connect everything directly: it uses queues to tolerate outages and keep operating.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-project (5-10 min)</h3>
                    <p className={styles.sub}>Simulate decoupling with an in-memory queue.</p>
                  </div>
                  <span className={styles.chip}>Practice</span>
                </div>
                <div className={styles.sbd}>
                  <p>Goal: see the mindset shift between direct call and queue message.</p>
                  <p>Exercise for `POST /order`:</p>
                  <ul className={styles.bullets}>
                    <li>Without queue: create order + send email directly.</li>
                    <li>With queue: create order + publish message + respond OK.</li>
                  </ul>

                  <pre>{miniProjectSnippet}</pre>
                  <pre>{workerSnippet}</pre>

                  <p>Level 2:</p>
                  <ul className={styles.bullets}>
                    <li>If worker goes down, how do you resume without losing messages?</li>
                    <li>Where do you persist queue: memory, broker, or database?</li>
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
                  <p>Day 35 at a glance.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Key idea:</strong> queue decouples to avoid real-time dependency.
                </div>
                <div className={styles.li}>
                  <strong>Practice:</strong> simulate `queue` and `worker` to internalize the pattern.
                </div>
                <div className={styles.li}>
                  <strong>Risk avoided:</strong> external service outage breaking the main operation.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
