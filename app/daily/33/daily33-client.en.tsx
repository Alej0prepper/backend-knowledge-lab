"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "../daily-lesson.module.css";

const idempotencyFlowSnippet = `1) Receive request + Idempotency-Key
2) Find key in storage
3) If it exists -> return stored result
4) If it does not exist -> execute and store result`;

const miniProjectSnippet = `processedKeys = {}

if key in processedKeys:
  return processedKeys[key]

result = create_order()
processedKeys[key] = result
return result`;

const checklistSnippet = `[ ] Repeat request with the same key
[ ] Simulate user double click
[ ] Verify there are no duplicates
[ ] Validate the second response is the same`;

export default function Daily33Client() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.key.toLowerCase() === "p") window.location.href = "/daily/32";
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
            <Link className={styles.btn} href="/daily/32">
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
                <div className={styles.createdAt}>26/03/2026</div>
                <div className={styles.badge}>Daily #33 • Backend Foundations</div>
                <h2 className={styles.title}>Idempotency Keys: how to avoid duplicates in critical operations</h2>

                <div className={styles.meta} aria-label="Metadata">
                  <span className={`${styles.chip} ${styles.chipOk}`}>4-8 min</span>
                  <span className={styles.chip}>Level: Intermediate</span>
                  <span className={`${styles.chip} ${styles.chipPro}`}>Tag: Reliability</span>
                  <span className={styles.chip}>Tag: Payments</span>
                  <span className={styles.chip}>Tag: .NET</span>
                </div>

                <p className={styles.lead}>
                  Idempotency keys turn risky retries into safe, repeatable operations without
                  duplicates.
                </p>
              </div>

              <section className={styles.section} id="idea">
                <div className={styles.shd}>
                  <div>
                    <h3>1. The key idea</h3>
                    <p className={styles.sub}>A unique key identifies the operation so it is not executed twice.</p>
                  </div>
                  <span className={styles.chip}>Concept</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.callout}>
                    Idempotency key = same key, same result, no duplicated effects.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="ejemplo">
                <div className={styles.shd}>
                  <div>
                    <h3>2. Simple example</h3>
                    <p className={styles.sub}>Payment with network failure and automatic retry.</p>
                  </div>
                  <span className={styles.chip}>Scenario</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Without control: risk of double charge.</li>
                    <li>With `Idempotency-Key: abc123`, the backend processes once.</li>
                    <li>If another identical request arrives with the same key, it returns the previous result.</li>
                  </ul>

                  <pre>{`POST /payments
Idempotency-Key: abc123`}</pre>
                </div>
              </section>

              <section className={styles.section} id="mentalidad">
                <div className={styles.shd}>
                  <div>
                    <h3>3. How a backend developer thinks</h3>
                    <p className={styles.sub}>Design defensively for network errors, retries, and double click.</p>
                  </div>
                  <span className={styles.chip}>Mindset</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Can this operation be repeated?</li>
                    <li>Is it critical (payments, orders, reservations)?</li>
                    <li>How do I identify it is the same operation?</li>
                  </ul>
                </div>
              </section>

              <section className={styles.section} id="dotnet">
                <div className={styles.shd}>
                  <div>
                    <h3>4. How it looks in .NET (conceptual)</h3>
                    <p className={styles.sub}>Store result by key and reuse it in retries.</p>
                  </div>
                  <span className={styles.chip}>Implementation</span>
                </div>
                <div className={styles.sbd}>
                  <pre>{idempotencyFlowSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="testing">
                <div className={styles.shd}>
                  <div>
                    <h3>5. How you detect it as a tester</h3>
                    <p className={styles.sub}>Repeat the same action with the same key and validate no duplication.</p>
                  </div>
                  <span className={styles.chip}>Testing</span>
                </div>
                <div className={styles.sbd}>
                  <ul className={styles.bullets}>
                    <li>Retry request with the same key.</li>
                    <li>Simulate user double click.</li>
                    <li>Verify that duplicate charges or orders are not created.</li>
                  </ul>

                  <pre>{checklistSnippet}</pre>
                </div>
              </section>

              <section className={styles.section} id="takeaway">
                <div className={styles.shd}>
                  <div>
                    <h3>Today&apos;s takeaway</h3>
                    <p className={styles.sub}>Idempotency key turns a risky operation into a safe operation.</p>
                  </div>
                  <span className={`${styles.chip} ${styles.chipOk}`}>Closing</span>
                </div>
                <div className={styles.sbd}>
                  <div className={styles.quote}>
                    It does not prevent retries from arriving; it prevents those retries from breaking your system.
                  </div>
                </div>
              </section>

              <section className={styles.section} id="mini-project">
                <div className={styles.shd}>
                  <div>
                    <h3>Mini-project (5-10 min)</h3>
                    <p className={styles.sub}>Simulate idempotency in a simple way to internalize the pattern.</p>
                  </div>
                  <span className={styles.chip}>Practice</span>
                </div>
                <div className={styles.sbd}>
                  <p>Goal: understand the mechanics without complex infrastructure.</p>
                  <p>Exercise:</p>
                  <ul className={styles.bullets}>
                    <li>Define in-memory storage `processedKeys = {}`.</li>
                    <li>If the key exists, return the stored result.</li>
                    <li>If it does not exist, execute and store result.</li>
                  </ul>

                  <pre>{miniProjectSnippet}</pre>

                  <p>Level 2:</p>
                  <ul className={styles.bullets}>
                    <li>Where would you store keys in production: DB or Redis.</li>
                    <li>Define a key expiration strategy.</li>
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
                  <p>Day 33 at a glance.</p>
                </div>
              </div>
              <div className={styles.bd}>
                <div className={styles.li}>
                  <strong>Key idea:</strong> same key, same operation, same result.
                </div>
                <div className={styles.li}>
                  <strong>Practice:</strong> mini project to simulate `processedKeys` in 5-10 min.
                </div>
                <div className={styles.li}>
                  <strong>Risk avoided:</strong> duplicate charges and orders due to retries.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
