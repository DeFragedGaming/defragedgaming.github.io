import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="CyberTrace"
      description="Security Engineering • Pentesting • All Things Cyber"
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">CyberTrace</h1>
          <p className="hero__subtitle">
            Security Engineering • Pentesting • All Things Cyber
          </p>

          <p style={{ marginTop: '1rem', fontSize: '1.1rem', opacity: 0.9 }}>
            By <strong>Matthew Hammel</strong> — Security Engineer & Pentester
          </p>

          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
            >
              Explore the Docs
            </Link>

            <Link
              className="button button--secondary button--lg"
              to="/blog"
              style={{ marginLeft: '1rem' }}
            >
              Read the Blog
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">

              <div className={clsx('col col--4')}>
                <div className={styles.featureCard}>
                  <h3>Security Engineering</h3>
                  <p>
                    Research, analysis, and hands‑on exploration of modern
                    security systems, vulnerabilities, and defensive strategies.
                  </p>
                </div>
              </div>

              <div className={clsx('col col--4')}>
                <div className={styles.featureCard}>
                  <h3>Pentesting & Offensive Work</h3>
                  <p>
                    Practical offensive testing, exploit research, and
                    real‑world attack simulations performed ethically and
                    responsibly.
                  </p>
                </div>
              </div>

              <div className={clsx('col col--4')}>
                <div className={styles.featureCard}>
                  <h3>Tools & Cyber Projects</h3>
                  <p>
                    Custom tools, automation, writeups, and experiments built to
                    understand and navigate the cyber landscape.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
