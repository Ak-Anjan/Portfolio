import { useState } from 'react'

function Experience() {
  const [selectedRole, setSelectedRole] =
    useState(null)

  const roles = {
    engineer: {
      title: 'Jr Security Engineer',
      company: 'FCOOS Technologies Pvt Ltd',
      period: 'Sep 2026 – Present',
      type: 'Full-time',
      location: 'On-site',
      subtitle: 'Firewall, IT and Linux',

      details: [
        'Firewall administration and security policy management',
        'Network security monitoring and traffic control',
        'Linux server administration and security configuration',
        'IT security operations and infrastructure support',
        'Security event monitoring and log analysis',
      ],

      skills: [
        'Firewall Security',
        'Network Security',
        'Linux',
        'IT Security',
        'Security Monitoring',
      ],
    },

    intern: {
      title: 'Cybersecurity Intern',
      company: 'FCOOS Technologies Pvt Ltd',
      period: 'Mar 2026 – Aug 2026',
      type: 'Internship',
      location: 'Hybrid',
      subtitle:
        'Security Operations & Network Security',

      details: [
        'Configured and managed firewall security policies',
        'Worked with pfSense and OPNsense firewall environments',
        'Configured and tested network security rules and traffic controls',
        'Worked with Suricata IDS/IPS for security monitoring and detection',
        'Used Wazuh for security monitoring and SIEM-related activities',
        'Worked with ARPWatch for ARP-based network activity monitoring',
        'Worked on ARP spoofing detection and network monitoring',
        'Implemented website and traffic filtering policies',
        'Worked with Geo-IP filtering and network access controls',
        'Configured controls for P2P and cryptocurrency-related traffic',
        'Worked with SSH security and brute-force detection',
        'Configured rsyslog for centralized security log collection',
      ],

      skills: [
        'pfSense',
        'OPNsense',
        'Suricata',
        'Wazuh',
        'ARPWatch',
        'Linux',
        'rsyslog',
        'Network Security',
      ],
    },
  }

  return (
    <main className="experience-simple">

      {/* BACKGROUND */}

      <div className="experience-bg-grid"></div>


      {/* HEADER */}

      <div className="experience-header-simple">

        <div className="experience-logo">
          <span>&lt;</span>
          AK
          <span>/&gt;</span>
        </div>

        <div className="experience-online">
          <span></span>
          SYSTEM ONLINE
        </div>

      </div>


      {/* CONTENT */}

      <section className="experience-content-simple">

        <div className="experience-kicker">
          [ PROFESSIONAL EXPERIENCE ]
        </div>

        <h1>
          EXPERIENCE
        </h1>


        {/* COMPANY */}

        <div className="experience-company-simple">

          <div className="company-dot"></div>

          <div>

            <div className="company-name-simple">
              FCOOS Technologies Pvt Ltd
            </div>

            <div className="company-location-simple">
              Bengaluru, Karnataka, India
            </div>

          </div>

        </div>


        {/* ROLES */}

        <div className="role-list-simple">

          {/* ENGINEER */}

          <button
            className="role-button-simple"
            onClick={() =>
              setSelectedRole('engineer')
            }
          >

            <div className="role-button-left">

              <span className="role-status-dot"></span>

              <span className="role-name-simple">
                Jr Security Engineer
              </span>

            </div>

            <span className="role-arrow-simple">
              →
            </span>

          </button>


          {/* INTERN */}

          <button
            className="role-button-simple"
            onClick={() =>
              setSelectedRole('intern')
            }
          >

            <div className="role-button-left">

              <span className="role-status-dot completed"></span>

              <span className="role-name-simple">
                Cybersecurity Intern
              </span>

            </div>

            <span className="role-arrow-simple">
              →
            </span>

          </button>

        </div>


        {/* RETURN */}

        <a
          href="/"
          className="experience-return-simple"
        >
          ← RETURN TO SYSTEM
        </a>

      </section>


      {/* =====================================
          ROLE DETAILS POPUP
          ===================================== */}

      {selectedRole && (

        <div
          className="role-popup-overlay"
          onClick={() =>
            setSelectedRole(null)
          }
        >

          <div
            className="role-popup"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* POPUP HEADER */}

            <div className="role-popup-header">

              <div>

                <div className="popup-label">
                  ROLE DETAILS
                </div>

                <h2>
                  {roles[selectedRole].title}
                </h2>

                <div className="popup-company">
                  {roles[selectedRole].company}
                </div>

              </div>


              <button
                className="popup-close"
                onClick={() =>
                  setSelectedRole(null)
                }
              >
                ×
              </button>

            </div>


            {/* ROLE META */}

            <div className="popup-meta">

              <div>
                <span>PERIOD</span>

                <strong>
                  {roles[selectedRole].period}
                </strong>
              </div>


              <div>
                <span>TYPE</span>

                <strong>
                  {roles[selectedRole].type}
                </strong>
              </div>


              <div>
                <span>LOCATION</span>

                <strong>
                  {roles[selectedRole].location}
                </strong>
              </div>

            </div>


            {/* ROLE */}

            <div className="popup-section">

              <div className="popup-section-title">
                &gt; ROLE
              </div>

              <div className="popup-role">
                {roles[selectedRole].subtitle}
              </div>

            </div>


            {/* DETAILS */}

            <div className="popup-section">

              <div className="popup-section-title">
                &gt; RESPONSIBILITIES
              </div>

              <div className="popup-details">

                {roles[
                  selectedRole
                ].details.map(
                  (detail, index) => (

                    <div
                      className="popup-detail"
                      key={index}
                    >

                      <span>
                        {String(
                          index + 1
                        ).padStart(2, '0')}
                      </span>

                      <p>
                        {detail}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* SKILLS */}

            <div className="popup-section">

              <div className="popup-section-title">
                &gt; TECHNOLOGIES
              </div>

              <div className="popup-skills">

                {roles[
                  selectedRole
                ].skills.map(
                  (skill) => (

                    <span
                      key={skill}
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* FOOTER */}

            <div className="popup-footer">

              <span>
                [✓] ROLE PROFILE LOADED
              </span>

              <button
                onClick={() =>
                  setSelectedRole(null)
                }
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

export default Experience