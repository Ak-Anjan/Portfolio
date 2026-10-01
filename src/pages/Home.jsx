import { useState } from 'react'
import NetworkCore from '../components/NetworkCore'
import Terminal from '../components/Terminal'
import HackerBackground from '../components/HackerBackground'

function Home() {
  const [authenticated, setAuthenticated] = useState(false)

  return (
    <main className="portfolio">

      <HackerBackground />

      {/* HEADER */}

      <nav className="navbar">

        <div className="logo">
          <span>&lt;</span>
          AK
          <span>/&gt;</span>
        </div>

        <div className="navbar-actions">

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-social"
            aria-label="LinkedIn"
          >
            in
          </a>

          <a
            href="/contact"
            className="nav-social"
            aria-label="Contact"
          >
            👤
          </a>

        </div>

      </nav>


      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          {/* SYSTEM STATUS */}

          <div className="status">
            <span className="status-dot"></span>
            SYSTEM ONLINE
          </div>


          {/* INITIALIZING MESSAGE */}

          <p className="terminal-line">
            &gt; initializing_secure_connection...
          </p>


          {/* NAME */}

          <h1>
            ANJAN
            <span>
              KUMAR S
            </span>
          </h1>


          {/* ROLE */}

          <h2>
            JR{' '}
            <strong>
              SECURITYENGINEER
            </strong>
          </h2>


          {/* DESCRIPTION */}

          <p className="description">
            Network Security • Linux • Firewalls • Cloud Security
          </p>


          {/* TERMINAL */}

          {authenticated && (

            <div className="terminal-wrapper">

              <div className="terminal-access-granted">

                <div className="access-message">
                  <span>[✓]</span>
                  ACCESS GRANTED
                </div>

                <div className="access-subtitle">
                  SECURE TERMINAL INITIALIZED
                </div>

              </div>

              <Terminal />

              <div className="terminal-hint">

                <span>[!]</span>

                TYPE <strong>"help"</strong> TO VIEW AVAILABLE COMMANDS

              </div>

            </div>

          )}


          {/* ENTER SYSTEM */}

          {!authenticated && (

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() => setAuthenticated(true)}
              >
                ENTER SYSTEM
              </button>

              <a
                href="/contact"
                className="secondary-btn"
              >
                CONTACT ME
              </a>

            </div>

          )}

        </div>


        {/* 3D NETWORK */}

        <div className="hero-visual">

          <NetworkCore />

        </div>

      </section>

    </main>
  )
}

export default Home