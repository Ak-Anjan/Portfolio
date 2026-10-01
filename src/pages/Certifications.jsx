import { useState } from 'react'
import { Link } from 'react-router-dom'

function Certifications() {
  const [selectedCertificate, setSelectedCertificate] =
    useState(null)

  const certificate = {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    series: 'Plus Series',
    exam: 'SY0-701',
    certificationDate: 'August 29, 2026',
    expirationDate: 'August 29, 2029',
    candidateId: 'COMP001023003571',
    certificateCode:
      'ef2b1ec11326477180866cc293f44d6d',
    verification: 'CompTIA Official Verification',

    // PNG inside public folder
    image: '/comptia-security-plus.png',
  }

  const closeCertificate = () => {
    setSelectedCertificate(null)
  }

  return (
    <main className="certifications-page">

      {/* =========================================
          HEADER
          ========================================= */}

      <header className="certifications-header">

        <div className="certifications-kicker">
          [ SECURITY CREDENTIALS ]
        </div>

        <h1>
          CERTIFICATIONS
        </h1>

        <p>
          Professional certifications and verified
          security credentials.
        </p>

      </header>


      {/* =========================================
          CERTIFICATION CARD
          ========================================= */}

      <section className="certification-list">

        <button
          className="certification-card"
          onClick={() =>
            setSelectedCertificate(certificate)
          }
        >

          <div className="certification-status">
            <span className="certification-dot"></span>
            VERIFIED
          </div>


          <div className="certification-main">

            <div className="certification-icon">
              +
            </div>


            <div className="certification-info">

              <span className="certification-label">
                SECURITY CERTIFICATION
              </span>

              <h2>
                CompTIA Security+
              </h2>

              <p>
                CompTIA • SY0-701
              </p>

            </div>

          </div>


          <div className="certification-arrow">
            →
          </div>

        </button>

      </section>


      {/* =========================================
          RETURN
          ========================================= */}

      <Link
        to="/"
        className="certifications-return"
      >
        ← RETURN TO SYSTEM
      </Link>


      {/* =========================================
          CERTIFICATE POPUP
          ========================================= */}

      {selectedCertificate && (

        <div
          className="certificate-overlay"
          onClick={closeCertificate}
        >

          <div
            className="certificate-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* =================================
                MODAL HEADER
                ================================= */}

            <div className="certificate-modal-header">

              <div>

                <span className="certificate-modal-kicker">
                  [ VERIFIED CREDENTIAL ]
                </span>

                <h2>
                  {selectedCertificate.name}
                </h2>

                <p>
                  {selectedCertificate.issuer}
                </p>

              </div>


              <button
                className="certificate-close"
                onClick={closeCertificate}
                aria-label="Close certificate"
              >
                ×
              </button>

            </div>


            {/* =================================
                CERTIFICATE PNG
                ================================= */}

            <div className="certificate-image-container">

  <img
    src="/comptia-security-plus.png"
    alt="CompTIA Security+ Certificate"
    className="certificate-image"
  />

</div>


            {/* =================================
                CERTIFICATE INFORMATION
                ================================= */}

            <div className="certificate-details">

              <div className="certificate-detail">

                <span>
                  CERTIFICATION
                </span>

                <strong>
                  CompTIA Security+
                </strong>

              </div>


              <div className="certificate-detail">

                <span>
                  EXAM
                </span>

                <strong>
                  SY0-701
                </strong>

              </div>


              <div className="certificate-detail">

                <span>
                  SERIES
                </span>

                <strong>
                  Plus Series
                </strong>

              </div>


              <div className="certificate-detail">

                <span>
                  CERTIFICATION DATE
                </span>

                <strong>
                  August 29, 2026
                </strong>

              </div>


              <div className="certificate-detail">

                <span>
                  EXPIRATION DATE
                </span>

                <strong>
                  August 29, 2029
                </strong>

              </div>


              <div className="certificate-detail">

                <span>
                  CANDIDATE ID
                </span>

                <strong>
                  COMP001023003571
                </strong>

              </div>

            </div>


            {/* =================================
                CREDENTIAL SECTION
                ================================= */}

            <div className="credential-section">

              <div className="credential-title">
                &gt; CREDENTIAL DETAILS
              </div>


              <div className="credential-code">

                <span>
                  CERTIFICATE CODE
                </span>

                <code>
                  ef2b1ec11326477180866cc293f44d6d
                </code>

              </div>


              <div className="credential-verification">

                <span className="verification-icon">
                  ✓
                </span>

                <div>

                  <strong>
                    OFFICIAL CERTIFICATION
                  </strong>

                  <p>
                    CompTIA Security+
                    certification successfully
                    completed.
                  </p>

                </div>

              </div>

            </div>


            {/* =================================
                FOOTER
                ================================= */}

            <div className="certificate-modal-footer">

              <span>
                [✓] CREDENTIAL VERIFIED
              </span>

              <button
                onClick={closeCertificate}
              >
                CLOSE
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  )
}

export default Certifications