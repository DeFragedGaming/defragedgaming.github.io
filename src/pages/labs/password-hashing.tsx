import React, { FormEvent, useState } from "react";
import Layout from "@theme/Layout";
import styles from "./password-hashing.module.css";

const PBKDF2_ITERATIONS = 210_000;
const QUIZ_QUESTIONS = [
  {
    id: "fast-hash",
    prompt: "Which approach is designed for storing user passwords?",
    options: [
      { value: "sha", label: "A fast general-purpose hash such as SHA-256" },
      { value: "password-hash", label: "A password-hashing scheme such as Argon2id, scrypt, bcrypt, or PBKDF2" },
      { value: "encrypt", label: "Encrypt passwords with one shared application key" },
    ],
    answer: "password-hash",
    explanation: "Password-hashing schemes make each guess more expensive; a plain fast hash does not.",
  },
  {
    id: "salt",
    prompt: "Why should each stored password hash have a unique random salt?",
    options: [
      { value: "hide", label: "It makes the password invisible to the application" },
      { value: "unique", label: "It prevents identical passwords from having identical stored results and defeats reusable precomputed tables" },
      { value: "encrypt", label: "It encrypts the password so it can be recovered later" },
    ],
    answer: "unique",
    explanation: "A unique salt makes each record's derived hash distinct, even when users choose the same password.",
  },
  {
    id: "pepper",
    prompt: "What is the best description of a pepper?",
    options: [
      { value: "public", label: "A public value stored beside each password hash" },
      { value: "secret", label: "An optional secret kept separately from the password database" },
      { value: "salt", label: "Another name for the per-record random salt" },
    ],
    answer: "secret",
    explanation: "A pepper is an optional secret stored separately (for example, in a secrets manager); it supplements, not replaces, a unique salt.",
  },
] as const;

type QuizAnswers = Record<string, string>;
type DerivedRecord = {
  salt: Uint8Array;
  saltHex: string;
  pbkdf2HashHex: string;
  sha256HashHex: string;
  iterations: number;
};

function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function derivePbkdf2(password: string, salt: Uint8Array, iterations: number) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    keyMaterial,
    256,
  );
  return new Uint8Array(derived);
}

function PasswordHashingLab() {
  const [password, setPassword] = useState("");
  const [record, setRecord] = useState<DerivedRecord | null>(null);
  const [busy, setBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [verifyInput, setVerifyInput] = useState("");
  const [verification, setVerification] = useState<"match" | "mismatch" | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  async function generateRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password) {
      setStatusMessage("Enter a demo password before generating hashes.");
      return;
    }
    if (!globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues) {
      setStatusMessage("Web Crypto is unavailable. Open this lab over HTTPS or localhost to use the hashing exercise.");
      return;
    }

    setBusy(true);
    setStatusMessage("");
    setVerification(null);
    setVerifyInput("");
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const shaDigest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
      const pbkdf2Digest = await derivePbkdf2(password, salt, PBKDF2_ITERATIONS);
      setRecord({
        salt,
        saltHex: toHex(salt),
        sha256HashHex: toHex(new Uint8Array(shaDigest)),
        pbkdf2HashHex: toHex(pbkdf2Digest),
        iterations: PBKDF2_ITERATIONS,
      });
      setStatusMessage("Demo hashes generated locally. Generate again to see a fresh salt and a different PBKDF2 result.");
    } catch (error) {
      console.error("Password hashing exercise failed.", error);
      setStatusMessage("Could not generate the demo hashes. Check browser Web Crypto support and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!record || !verifyInput) return;
    setBusy(true);
    setVerification(null);
    try {
      const candidate = await derivePbkdf2(verifyInput, record.salt, record.iterations);
      setVerification(toHex(candidate) === record.pbkdf2HashHex ? "match" : "mismatch");
    } catch (error) {
      console.error("Password verification exercise failed.", error);
      setStatusMessage("Could not verify the demo password. Check browser Web Crypto support and try again.");
    } finally {
      setBusy(false);
    }
  }

  function submitQuiz(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setQuizSubmitted(true);
  }

  function resetLab() {
    setPassword("");
    setRecord(null);
    setStatusMessage("");
    setVerifyInput("");
    setVerification(null);
    setAnswers({});
    setQuizSubmitted(false);
  }

  const quizScore = QUIZ_QUESTIONS.reduce(
    (score, question) => score + (answers[question.id] === question.answer ? 1 : 0),
    0,
  );

  return (
    <Layout
      title="Password Hashing Lab"
      description="Explore password hashing, unique salts, PBKDF2 verification, and secure password storage through an interactive local exercise."
    >
      <main className={styles.lab}>
        <div className={styles.shell}>
          <header className={styles.hero}>
            <div>
              <span className={styles.eyebrow}>CYBERTRACE LABS / IDENTITY SECURITY</span>
              <h1>Password Storage Lab</h1>
              <p>
                See why a fast hash is not enough for password storage. Generate a
                salted PBKDF2 record, verify a candidate password, then check your
                understanding of secure storage design.
              </p>
            </div>
            <span className={styles.localBadge}><span /> LOCAL EXERCISE</span>
          </header>

          <section className={styles.notice}>
            <span className={styles.noticeIcon} aria-hidden="true">i</span>
            <p>
              Use only the built-in demo or a disposable sample phrase. Hashing happens
              in your browser; the input is not uploaded or saved. This demonstrates
              concepts and is not a production password-storage implementation.
            </p>
          </section>

          <section className={styles.panel} aria-labelledby="experiment-title">
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.eyebrow}>01 / EXPERIMENT</span>
                <h2 id="experiment-title">Compare fast hashing with password hashing</h2>
              </div>
              <span className={styles.badge}>SHA-256 vs PBKDF2</span>
            </div>

            <div className={styles.conceptGrid}>
              <div>
                <strong>SHA-256</strong>
                <p>A fast general-purpose hash. Fast verification also makes large-scale guessing faster.</p>
              </div>
              <div>
                <strong>PBKDF2 + unique salt</strong>
                <p>A configurable password-based derivation function. Each record gets its own random salt and work factor.</p>
              </div>
            </div>

            <form className={styles.inputForm} onSubmit={generateRecord}>
              <label htmlFor="demo-password">Demo passphrase</label>
              <div className={styles.inputRow}>
                <input
                  id="demo-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="off"
                  placeholder="Try a disposable sample phrase"
                />
                <button type="submit" disabled={busy || !password}>
                  {busy ? "Working…" : "Generate hashes"}
                </button>
              </div>
              <span className={styles.inputHint}>Never enter a password you use for a real account.</span>
            </form>

            {statusMessage && <p className={styles.statusMessage} role="status">{statusMessage}</p>}

            {record && (
              <div className={styles.outputGrid}>
                <article className={styles.outputCard}>
                  <div className={styles.outputHeading}>
                    <strong>Fast hash</strong>
                    <span className={styles.dangerBadge}>NOT FOR PASSWORD STORAGE</span>
                  </div>
                  <code>{record.sha256HashHex}</code>
                  <p>Same input always produces the same digest; no salt or work factor.</p>
                </article>
                <article className={`${styles.outputCard} ${styles.recommendedCard}`}>
                  <div className={styles.outputHeading}>
                    <strong>PBKDF2 record</strong>
                    <span className={styles.goodBadge}>DEMO CONFIGURATION</span>
                  </div>
                  <dl className={styles.recordFields}>
                    <div><dt>Algorithm</dt><dd>PBKDF2-HMAC-SHA-256</dd></div>
                    <div><dt>Iterations</dt><dd>{record.iterations.toLocaleString()}</dd></div>
                    <div><dt>Salt (hex)</dt><dd><code>{record.saltHex}</code></dd></div>
                    <div><dt>Derived hash</dt><dd><code>{record.pbkdf2HashHex}</code></dd></div>
                  </dl>
                  <p>Store the algorithm, parameters, salt, and derived hash together. A new random salt produces a different record for the same input.</p>
                </article>
              </div>
            )}
          </section>

          <section className={styles.panel} aria-labelledby="verify-title">
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.eyebrow}>02 / VERIFY</span>
                <h2 id="verify-title">Test a password during sign-in</h2>
              </div>
              <span className={styles.badge}>RE-DERIVE & COMPARE</span>
            </div>
            <p className={styles.sectionIntro}>
              A verifier uses the stored salt and parameters to derive a candidate hash,
              then compares it with the stored result. It never needs to decrypt a password.
            </p>
            <form className={styles.inputForm} onSubmit={verifyPassword}>
              <label htmlFor="verify-password">Candidate password</label>
              <div className={styles.inputRow}>
                <input
                  id="verify-password"
                  type="password"
                  value={verifyInput}
                  onChange={(event) => {
                    setVerifyInput(event.target.value);
                    setVerification(null);
                  }}
                  autoComplete="off"
                  placeholder={record ? "Enter the same phrase or a different one" : "Generate a demo record first"}
                  disabled={!record || busy}
                />
                <button type="submit" disabled={!record || !verifyInput || busy}>Verify</button>
              </div>
            </form>
            {verification && (
              <div className={`${styles.verifyResult} ${verification === "match" ? styles.verifyMatch : styles.verifyMismatch}`} role="status" aria-live="polite">
                <strong>{verification === "match" ? "Match" : "No match"}</strong>
                <span>{verification === "match" ? "The candidate derives the same hash using this record’s salt and parameters." : "This candidate does not match the demo record."}</span>
              </div>
            )}
          </section>

          <section className={styles.panel} aria-labelledby="review-title">
            <div className={styles.panelHeader}>
              <div>
                <span className={styles.eyebrow}>03 / STORAGE DESIGN REVIEW</span>
                <h2 id="review-title">Check your understanding</h2>
              </div>
              <span className={styles.badge}>3 QUESTIONS</span>
            </div>
            <form onSubmit={submitQuiz}>
              <div className={styles.quizList}>
                {QUIZ_QUESTIONS.map((question, index) => {
                  const isCorrect = answers[question.id] === question.answer;
                  const answered = Boolean(answers[question.id]);
                  return (
                    <fieldset className={styles.question} key={question.id}>
                      <legend><span>{String(index + 1).padStart(2, "0")}</span>{question.prompt}</legend>
                      <div className={styles.options}>
                        {question.options.map((option) => (
                          <label className={styles.option} key={option.value}>
                            <input
                              type="radio"
                              name={question.id}
                              value={option.value}
                              checked={answers[question.id] === option.value}
                              onChange={() => {
                                setAnswers((current) => ({ ...current, [question.id]: option.value }));
                                setQuizSubmitted(false);
                              }}
                            />
                            <span>{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {quizSubmitted && answered && (
                        <p className={isCorrect ? styles.correctFeedback : styles.incorrectFeedback}>
                          {isCorrect ? "Correct. " : "Not quite. "}{question.explanation}
                        </p>
                      )}
                    </fieldset>
                  );
                })}
              </div>
              <div className={styles.quizActions}>
                <button type="submit" disabled={Object.keys(answers).length !== QUIZ_QUESTIONS.length}>Check answers</button>
                {quizSubmitted && (
                  <span className={styles.quizScore} role="status">
                    {quizScore} / {QUIZ_QUESTIONS.length} correct
                  </span>
                )}
              </div>
            </form>
          </section>

          <section className={styles.takeaways} aria-labelledby="takeaways-title">
            <span className={styles.eyebrow}>PRACTICAL TAKEAWAYS</span>
            <h2 id="takeaways-title">Production password storage</h2>
            <ul>
              <li>Prefer a modern, dedicated password-hashing function such as Argon2id; scrypt, bcrypt, or PBKDF2 may be appropriate where required.</li>
              <li>Use a unique cryptographically random salt for each password and store it with the algorithm and parameters.</li>
              <li>Choose and periodically review work parameters for your server capacity; this browser demo is not a deployment recommendation.</li>
              <li>Never store plaintext passwords or use reversible encryption as a substitute for password hashing.</li>
              <li>Use established libraries and follow current organizational and platform guidance rather than implementing storage yourself.</li>
            </ul>
          </section>

          <footer className={styles.footer}>
            <span>LOCAL TRAINING EXERCISE</span>
            <button type="button" onClick={resetLab}>Reset lab</button>
            <span>No upload · No persistence · No real passwords</span>
          </footer>
        </div>
      </main>
    </Layout>
  );
}

export default PasswordHashingLab;
