function Contact() {
  const email =
    's.anjankumardikshith@gmail.com'

  const linkedin =
    'https://www.linkedin.com/in/anjan-kumar-s-a65581247'

  return (
    <main className="contact-page">

      {/* =====================================
          BACKGROUND
          ===================================== */}

      <div className="contact-grid"></div>


      {/* =====================================
          HEADER
          ===================================== */}

      <header className="contact-header">

        <div className="contact-logo">
          <span>&lt;</span>
          AK
          <span>/&gt;</span>
        </div>

        <div className="contact-status">
          <span></span>
          SECURE CHANNEL ONLINE
        </div>

      </header>


      {/* =====================================
          MAIN
          ===================================== */}

      <section className="contact-main">

        <div className="contact-kicker">
          [ SECURE COMMUNICATION CHANNEL ]
        </div>

        <h1>
          GET IN
          <span>TOUCH</span>
        </h1>

        <p className="contact-intro">
          Interested in cybersecurity, network security,
          firewall security or technology?
          Let's connect.
        </p>


        {/* =====================================
            CONTACT CARDS
            ===================================== */}

        <div className="contact-cards">


          {/* EMAIL */}

          <a
            href={`mailto:${email}`}
            className="contact-card"
          >

            <div className="contact-card-icon">
              @
            </div>

            <div className="contact-card-content">

              <div className="contact-card-label">
                EMAIL
              </div>

              <h2>
                {email}
              </h2>

              <p>
                Send me an email
              </p>

            </div>

            <div className="contact-card-arrow">
              →
            </div>

          </a>


          {/* LINKEDIN */}

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >

            <div className="contact-card-icon linkedin-icon">
              in
            </div>

            <div className="contact-card-content">

              <div className="contact-card-label">
                LINKEDIN
              </div>

              <h2>
                Connect with me
              </h2>

            

            </div>

            <div className="contact-card-arrow">
              →
            </div>

          </a>

        </div>


        {/* =====================================
            CONNECTION STATUS
            ===================================== */}

        <div className="contact-terminal">

          <div className="contact-terminal-header">

            <span></span>
            <span></span>
            <span></span>

            <label>
              secure-communication
            </label>

          </div>


          <div className="contact-terminal-body">

            <div>
              <span className="contact-green">
                root@Ak
              </span>

              <span>
                :~
              </span>

              <span>
                $ connect --status
              </span>
            </div>


            <div className="contact-output">

              [✓] EMAIL CHANNEL ........ ONLINE

              <br />

              [✓] LINKEDIN CHANNEL ..... ONLINE

              <br />

              [✓] COMMUNICATION ......... AVAILABLE

            </div>


            <div className="contact-command">

              <span className="contact-green">
                root@Ak
              </span>

              <span>
                :~$
              </span>

              <span className="contact-cursor">
                _
              </span>

            </div>

          </div>

        </div>


        {/* =====================================
            RETURN
            ===================================== */}

        <a
          href="/"
          className="contact-return"
        >
          ← RETURN TO SYSTEM
        </a>

      </section>

    </main>
  )
}

export default Contact