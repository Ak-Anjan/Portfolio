import { useState } from 'react'
import NetworkCore from '../components/NetworkCore'
import Terminal from '../components/Terminal'
import HackerBackground from '../components/HackerBackground'

function Home() {
  const [showLogin, setShowLogin] = useState(false)

  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem('terminal_authenticated') === 'true'
  )

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [accessing, setAccessing] = useState(false)

  const handleAccess = () => {
    setError('')

    if (!password) {
      setError('PASSWORD REQUIRED')
      return
    }

    if (password === 'anjan123') {
      setAccessing(true)

      setTimeout(() => {
        sessionStorage.setItem(
          'terminal_authenticated',
          'true'
        )

        setAuthenticated(true)
        setShowLogin(false)
        setAccessing(false)
        setPassword('')
      }, 1200)

    } else {
      setError('ACCESS DENIED — INVALID PASSWORD')
      setPassword('')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAccess()
    }

    if (event.key === 'Escape') {
      setShowLogin(false)
      setPassword('')
      setError('')
    }
  }

  return (
  <main className="portfolio">

    <HackerBackground />

      {/* =========================
          HEADER
      ========================= */}

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

    {authenticated && (
      <button
        className="nav-logout"
        onClick={() => {
          sessionStorage.removeItem(
            'terminal_authenticated'
          )

          window.location.href = '/'
        }}
      >
        LOGOUT
      </button>
    )}

  </div>

</nav>


      {/* =========================
          HERO
      ========================= */}

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

            JR {' '}

            <strong>
                SECURITYENGINEER
            </strong>

          </h2>


          {/* DESCRIPTION */}

          <p className="description">
            Network Security • Linux • Firewalls • Cloud Security
          </p>


          {/* =========================
              AUTHENTICATED TERMINAL
          ========================= */}

          {authenticated && (

            <div className="terminal-wrapper">

              <div className="terminal-access-granted">

                <div className="access-message">

                  <span>
                    [✓]
                  </span>

                  ACCESS GRANTED

                </div>

                <div className="access-subtitle">

                  SECURE TERMINAL INITIALIZED

                </div>

              </div>


              <Terminal />


              <div className="terminal-hint">

                <span>
                  [!]
                </span>

                TYPE <strong>"help"</strong> TO VIEW AVAILABLE COMMANDS

              </div>

            </div>

          )}


          {/* =========================
              ENTER SYSTEM BUTTON
          ========================= */}

          {!authenticated && (

            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() => {
                  setShowLogin(true)
                  setError('')
                }}
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


        {/* =========================
            3D NETWORK
        ========================= */}

        <div className="hero-visual">

          <NetworkCore />

        </div>

      </section>


      {/* =========================
          PASSWORD AUTHENTICATION
      ========================= */}

      {showLogin && (

        <div
          className="auth-overlay"
          onClick={() => {
            setShowLogin(false)
            setPassword('')
            setError('')
          }}
        >

          <div
            className="auth-window"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* AUTH HEADER */}

            <div className="auth-header">

              <div className="auth-dots">

                <span></span>
                <span></span>
                <span></span>

              </div>

              <span>
                secure-authentication
              </span>

            </div>


            {/* AUTH BODY */}

            <div className="auth-body">

              <div className="auth-icon">
                [ SECURE ]
              </div>


              <h3>

                AUTHENTICATION

                <span>
                  REQUIRED
                </span>

              </h3>


              <p className="auth-status">

                ROOT ACCESS REQUEST DETECTED

              </p>


              {/* PASSWORD TERMINAL */}

              <div className="auth-terminal">

                <div>

                  <span className="green">
                    root@anjan
                  </span>

                  <span>
                    :
                  </span>

                  <span className="blue">
                    ~
                  </span>

                  <span>
                    $ authenticate
                  </span>

                </div>


                <div className="password-line">

  <span className="green">
    password:
  </span>

  <input
    type="password"
    value={password}
    onChange={(event) =>
      setPassword(event.target.value)
    }
    onKeyDown={handleKeyDown}
    autoFocus
    autoComplete="off"
    spellCheck="false"
  />

</div>

<div className="password-hint">
  HINT: PASSWORD IS <strong>"anjan123"</strong>
</div>

              </div>


              {/* LOADING */}

              {accessing && (

                <div className="access-loading">

                  <span>
                    [+]
                  </span>

                  ESTABLISHING SECURE CONNECTION...

                </div>

              )}


              {/* ERROR */}

              {error && !accessing && (

                <div className="access-error">

                  [!] {error}

                </div>

              )}


              {/* AUTH BUTTONS */}

              <div className="auth-actions">

                <button
                  className="primary-btn"
                  onClick={handleAccess}
                  disabled={accessing}
                >

                  {accessing
                    ? 'AUTHENTICATING...'
                    : 'AUTHENTICATE'}

                </button>


                <button
                  className="secondary-btn"
                  onClick={() => {
                    setShowLogin(false)
                    setPassword('')
                    setError('')
                  }}
                >

                  CANCEL

                </button>

              </div>


              <p className="auth-hint">

                ENTER PASSWORD TO INITIALIZE TERMINAL

              </p>

            </div>

          </div>

        </div>

      )}

    </main>
  )
}

export default Home