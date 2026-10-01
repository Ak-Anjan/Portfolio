function About() {
  return (
    <main className="page about-page">

      <div className="page-top">
        <span className="green">// 01 — ABOUT</span>
      </div>

      <p className="section-command">
        root@anjan:~$ cat about.txt
      </p>

      <h1 className="page-title">
        SECURITY
        <span>OPERATIONS</span>
      </h1>

      <div className="about-grid">

        {/* MAIN ABOUT TERMINAL */}
        <div className="about-terminal">

          <div className="about-terminal-header">
            <span></span>
            <span></span>
            <span></span>
            <label>about.txt</label>
          </div>

          <div className="about-terminal-body">

            <p>
              <span className="green">
                [IDENTITY]
              </span>
            </p>

            <p className="about-main-text">
              Jr Security Engineer focused on protecting
              infrastructure, networks and systems through
              practical security operations and resilient
              technology solutions.
            </p>

            <p>
              <span className="green">
                [MISSION]
              </span>
            </p>

            <p className="about-main-text">
              Build secure, reliable and resilient technology
              environments while continuously improving
              security visibility, monitoring and response.
            </p>

            <p>
              <span className="green">
                [FOCUS]
              </span>
            </p>

            <div className="about-list">
              <div>
                <span>→</span> Network Security
              </div>

              <div>
                <span>→</span> Firewall Administration
              </div>

              <div>
                <span>→</span> Linux Systems
              </div>

              <div>
                <span>→</span> IT Support
              </div>

              <div>
                <span>→</span> Cloud Security
              </div>

              <div>
                <span>→</span> Security Monitoring
              </div>
            </div>

          </div>

        </div>

        {/* SECURITY STATUS */}
        <div className="about-status">

          <div className="status-card">
            <span className="card-number">
              01
            </span>

            <strong>
              NETWORK
            </strong>

            <p>
              SECURITY
            </p>
          </div>

          <div className="status-card">
            <span className="card-number">
              02
            </span>

            <strong>
              FIREWALL
            </strong>

            <p>
              ADMINISTRATION
            </p>
          </div>

          <div className="status-card">
            <span className="card-number">
              03
            </span>

            <strong>
              LINUX
            </strong>

            <p>
              SYSTEMS
            </p>
          </div>

          <div className="status-card">
            <span className="card-number">
              04
            </span>

            <strong>
              SECURITY
            </strong>

            <p>
              MONITORING
            </p>
          </div>

        </div>

      </div>

      <a
        href="/"
        className="back-button"
      >
        ← RETURN TO TERMINAL
      </a>

    </main>
  )
}

export default About