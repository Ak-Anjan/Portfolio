import { useState } from 'react'

function Projects() {
  const [showProject, setShowProject] = useState(false)

  return (
    <main className="projects-page">

      <div className="projects-background-grid"></div>

      <div className="projects-container">

        {/* RETURN */}
        <a
          href="/"
          className="projects-return"
        >
          ← RETURN TO SYSTEM
        </a>

        {/* HEADER */}
        <div className="projects-header">
          <p className="projects-kicker">
            [ SECURITY PROJECTS ]
          </p>

          <h1>
            PROJECT<span>S</span>
          </h1>

          <p className="projects-subtitle">
            SECURITY ENGINEERING • NETWORK DEFENSE • IDS/IPS
          </p>
        </div>

        {/* PROJECT CARD */}
        <section className="project-card-section">

          <button
            className="project-card"
            onClick={() => setShowProject(true)}
          >

            <div className="project-card-top">
              <span className="project-number">
                01
              </span>

              <span className="project-status">
                ● COMPLETED
              </span>
            </div>

            <div className="project-icon">
              <span>⌁</span>
            </div>

            <h2>
              SURICATA
              <span>NETWORK SECURITY PROJECT</span>
            </h2>

            <p>
              Network security project focused on
              Suricata IDS/IPS with firewall and
              security monitoring components.
            </p>

            <div className="project-tags">
              <span>SURICATA</span>
              <span>IDS / IPS</span>
              <span>NETWORK SECURITY</span>
              <span>pfSense</span>
              <span>OPNsense</span>
            </div>

            <div className="project-card-footer">
              <span>
                OPEN PROJECT
              </span>

              <span className="project-arrow">
                →
              </span>
            </div>

          </button>

        </section>

        {/* PROJECT POPUP */}
        {showProject && (
          <div
            className="project-overlay"
            onClick={() => setShowProject(false)}
          >

            <div
              className="project-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* MODAL HEADER */}
              <div className="project-modal-header">

                <div className="modal-window-controls">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <span>
                  secure-project-module
                </span>

                <button
                  className="modal-close"
                  onClick={() =>
                    setShowProject(false)
                  }
                >
                  ×
                </button>

              </div>

              {/* MODAL CONTENT */}
              <div className="project-modal-body">

                <div className="project-modal-kicker">
                  [ PROJECT_01 ]
                </div>

                <h2>
                  SURICATA
                  <span>
                    NETWORK SECURITY PROJECT
                  </span>
                </h2>

                <div className="project-line"></div>

                {/* OVERVIEW */}
                <section className="project-detail-section">

                  <h3>
                    <span>[01]</span>
                    PROJECT OVERVIEW
                  </h3>

                  <p>
                    A network security project focused
                    on implementing and documenting
                    Suricata-based network security
                    monitoring and IDS/IPS capabilities.
                  </p>

                </section>

                {/* TECHNOLOGIES */}
                <section className="project-detail-section">

                  <h3>
                    <span>[02]</span>
                    TECHNOLOGIES
                  </h3>

                  <div className="technology-grid">

                    <div>
                      <strong>SURICATA</strong>
                      <small>
                        IDS / IPS
                      </small>
                    </div>

                    <div>
                      <strong>pfSense</strong>
                      <small>
                        Firewall
                      </small>
                    </div>

                    <div>
                      <strong>OPNsense</strong>
                      <small>
                        Firewall / Security
                      </small>
                    </div>

                    <div>
                      <strong>NETWORK SECURITY</strong>
                      <small>
                        Traffic Monitoring
                      </small>
                    </div>

                  </div>

                </section>

                {/* PROJECT MATERIAL */}
                <section className="project-detail-section">

                  <h3>
                    <span>[03]</span>
                    PROJECT MATERIAL
                  </h3>

                  <div className="project-files">

                    <div className="project-file">
                      <span>▣</span>
                      <div>
                        <strong>
                          Network Security Project Summary
                        </strong>
                        <small>
                          Presentation
                        </small>
                      </div>
                    </div>

                    <div className="project-file">
                      <span>▣</span>
                      <div>
                        <strong>
                          pfSense Configuration
                        </strong>
                        <small>
                          Documentation
                        </small>
                      </div>
                    </div>

                    <div className="project-file">
                      <span>▣</span>
                      <div>
                        <strong>
                          OPNsense Configuration
                        </strong>
                        <small>
                          Documentation
                        </small>
                      </div>
                    </div>

                    <div className="project-file">
                      <span>▣</span>
                      <div>
                        <strong>
                          OPNsense Rule Set
                        </strong>
                        <small>
                          XML / Rule documentation
                        </small>
                      </div>
                    </div>

                    <div className="project-file">
                      <span>▣</span>
                      <div>
                        <strong>
                          SQL Malware
                        </strong>
                        <small>
                          Project documentation
                        </small>
                      </div>
                    </div>

                  </div>

                </section>

                {/* SECURITY FOCUS */}
                <section className="project-detail-section">

                  <h3>
                    <span>[04]</span>
                    SECURITY FOCUS
                  </h3>

                  <div className="security-list">

                    <p>
                      <span>[✓]</span>
                      Network Security Monitoring
                    </p>

                    <p>
                      <span>[✓]</span>
                      Intrusion Detection
                    </p>

                    <p>
                      <span>[✓]</span>
                      Intrusion Prevention
                    </p>

                    <p>
                      <span>[✓]</span>
                      Firewall Security
                    </p>

                    <p>
                      <span>[✓]</span>
                      Security Rule Configuration
                    </p>

                  </div>

                </section>

                {/* GITHUB */}
                <section className="project-github">

                  <div>
                    <span className="github-label">
                      SOURCE REPOSITORY
                    </span>

                    <strong>
                      Ak-Anjan / Suricata-Project
                    </strong>
                  </div>

                  <a
                    href="https://github.com/Ak-Anjan/Suricata-Project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-button"
                  >
                    VIEW ON GITHUB
                    <span>↗</span>
                  </a>

                </section>

              </div>

            </div>

          </div>
        )}

      </div>

    </main>
  )
}

export default Projects