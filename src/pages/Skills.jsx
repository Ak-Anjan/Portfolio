import { useState } from 'react'

const SKILLS = [
  {
    id: 'network',
    code: 'NET',
    title: 'NETWORK SECURITY',
    level: 'CORE',
    description:
      'Designing, securing and monitoring network infrastructure, traffic flows and access controls.',
    technologies: [
      'TCP/IP',
      'VLAN',
      'Routing',
      'DNS',
      'VPN',
      'NAT',
      'ACL',
      'Traffic Control',
    ],
    details: [
      'Network segmentation',
      'Traffic analysis',
      'Access control',
      'Routing and connectivity',
      'Network troubleshooting',
    ],
  },

  {
    id: 'firewall',
    code: 'FW',
    title: 'FIREWALL SECURITY',
    level: 'CORE',
    description:
      'Firewall configuration, policy management, traffic filtering and perimeter security.',
    technologies: [
      'pfSense',
      'OPNsense',
      'Sophos Firewall',
      'ACL',
      'NAT',
      'Firewall Rules',
      'Traffic Shaping',
      'VPN',
    ],
    details: [
      'Firewall rule management',
      'NAT configuration',
      'Bandwidth control',
      'Web filtering',
      'VPN configuration',
      'Security policy enforcement',
    ],
  },

  {
    id: 'linux',
    code: 'LNX',
    title: 'LINUX SYSTEMS',
    level: 'CORE',
    description:
      'Linux server administration, system services, networking and security operations.',
    technologies: [
      'Ubuntu',
      'Linux Server',
      'SSH',
      'Bash',
      'rsyslog',
      'APT',
      'systemd',
      'CLI',
    ],
    details: [
      'Ubuntu server administration',
      'Linux networking',
      'Service management',
      'Log management',
      'Package management',
      'Shell operations',
    ],
  },

  {
    id: 'cloud',
    code: 'CLD',
    title: 'CLOUD SECURITY',
    level: 'DEVELOPING',
    description:
      'Cloud security fundamentals focused on identity, access control and infrastructure protection.',
    technologies: [
      'AWS',
      'IAM',
      'Security Groups',
      'EC2',
      'Cloud Networking',
      'Access Control',
    ],
    details: [
      'IAM fundamentals',
      'Identity and access management',
      'Security group concepts',
      'Cloud network security',
      'Infrastructure security',
    ],
  },

  {
    id: 'monitoring',
    code: 'MON',
    title: 'SECURITY MONITORING',
    level: 'ACTIVE',
    description:
      'Collecting, forwarding and monitoring security events for improved visibility and detection.',
    technologies: [
      'rsyslog',
      'Syslog',
      'Log Collection',
      'Event Monitoring',
      'Firewall Logs',
      'Network Logs',
    ],
    details: [
      'Centralized log collection',
      'Firewall syslog integration',
      'Security event monitoring',
      'Linux log management',
      'Network visibility',
    ],
  },

  {
    id: 'cti',
    code: 'CTI',
    title: 'THREAT INTELLIGENCE',
    level: 'ACTIVE',
    description:
      'Working with external threat intelligence and IOC data to understand current threat activity.',
    technologies: [
      'ThreatFox',
      'IOC Analysis',
      'Malware',
      'C2',
      'Threat Feeds',
      'CTI Monitoring',
    ],
    details: [
      'IOC analysis',
      'Malware intelligence',
      'C2 infrastructure monitoring',
      'Threat feed integration',
      'Real-time CTI visualization',
    ],
  },

  {
    id: 'dns',
    code: 'DNS',
    title: 'DNS SECURITY',
    level: 'ACTIVE',
    description:
      'DNS-based security controls for filtering, access management and threat reduction.',
    technologies: [
      'DNS Filtering',
      'DNS Security',
      'Web Filtering',
      'Allow Lists',
      'Block Lists',
    ],
    details: [
      'DNS policy management',
      'Website filtering',
      'Allow-list configuration',
      'Block-list configuration',
      'Security policy troubleshooting',
    ],
  },

  {
    id: 'infrastructure',
    code: 'INF',
    title: 'INFRASTRUCTURE',
    level: 'DEVELOPING',
    description:
      'Working with virtualization and network infrastructure supporting secure environments.',
    technologies: [
      'Proxmox',
      'Virtualization',
      'Wi-Fi',
      'PoE',
      'Network Infrastructure',
    ],
    details: [
      'Virtualization fundamentals',
      'Proxmox environments',
      'Wireless infrastructure',
      'PoE networking',
      'Network deployment',
    ],
  },
]

function Skills() {
  const [selectedSkill, setSelectedSkill] =
    useState(null)

  return (
    <main className="page skills-page">

      {/* HEADER */}

      <div className="page-top">
        <span className="green">
          // 02 — SECURITY SKILLS
        </span>
      </div>

      <p className="section-command">
        root@anjan:~$ ls /security/skills
      </p>

      <div className="skills-title-row">

        <h1 className="page-title">
          SECURITY
          <span>STACK</span>
        </h1>

        <div className="skills-system-status">
          <span></span>
          SKILL MATRIX ONLINE
        </div>

      </div>


      {/* COMMAND */}

      <div className="skills-command-bar">

        <span className="green">
          root@anjan
        </span>

        <span>:</span>

        <span className="blue">
          ~/security
        </span>

        <span>
          $ scan --skills
        </span>

        <span className="scan-result">
          [8 MODULES FOUND]
        </span>

      </div>


      {/* SKILL GRID */}

      <section className="skills-grid">

        {SKILLS.map((skill, index) => (

          <button
            key={skill.id}
            className={
              `skill-card ${
                selectedSkill?.id === skill.id
                  ? 'skill-card-active'
                  : ''
              }`
            }

            onClick={() =>
              setSelectedSkill(skill)
            }
          >

            <div className="skill-card-top">

              <div className="skill-code">
                {skill.code}
              </div>

              <span className="skill-index">
                {String(index + 1).padStart(2, '0')}
              </span>

            </div>


            <div className="skill-card-content">

              <h2>
                {skill.title}
              </h2>

              <span className="skill-level">
                {skill.level}
              </span>

              <p>
                {skill.description}
              </p>

            </div>


            <div className="skill-tech-preview">

              {skill.technologies
                .slice(0, 4)
                .map((technology) => (

                  <span key={technology}>
                    {technology}
                  </span>

                ))}

              {skill.technologies.length > 4 && (
                <span>
                  +{skill.technologies.length - 4}
                </span>
              )}

            </div>


            <div className="skill-card-footer">
              <span>
                ACCESS MODULE
              </span>

              <strong>
                →
              </strong>
            </div>

          </button>

        ))}

      </section>


      {/* SELECTED SKILL DETAIL */}

      {selectedSkill && (

        <div
          className="skill-detail-overlay"

          onClick={() =>
            setSelectedSkill(null)
          }
        >

          <section
            className="skill-detail-panel"

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="skill-detail-close"

              onClick={() =>
                setSelectedSkill(null)
              }
            >
              ×
            </button>


            {/* DETAIL HEADER */}

            <div className="skill-detail-header">

              <div className="skill-detail-code">
                {selectedSkill.code}
              </div>

              <div>

                <span>
                  SECURITY MODULE
                </span>

                <h2>
                  {selectedSkill.title}
                </h2>

              </div>

            </div>


            {/* STATUS */}

            <div className="skill-detail-status">

              <span></span>

              MODULE STATUS:

              <strong>
                {selectedSkill.level}
              </strong>

            </div>


            {/* DESCRIPTION */}

            <div className="skill-detail-description">

              <span>
                // MODULE DESCRIPTION
              </span>

              <p>
                {selectedSkill.description}
              </p>

            </div>


            {/* TECHNOLOGIES */}

            <div className="skill-detail-section">

              <div className="skill-detail-section-title">
                TECHNOLOGIES / TOOLS
              </div>

              <div className="skill-tech-list">

                {selectedSkill.technologies.map(
                  (technology) => (

                    <span key={technology}>
                      <b>+</b>
                      {technology}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* SECURITY AREAS */}

            <div className="skill-detail-section">

              <div className="skill-detail-section-title">
                SECURITY CAPABILITIES
              </div>

              <div className="skill-capability-list">

                {selectedSkill.details.map(
                  (detail, index) => (

                    <div key={detail}>

                      <span>
                        {String(
                          index + 1
                        ).padStart(2, '0')}
                      </span>

                      <strong>
                        {detail}
                      </strong>

                      <em>
                        ACTIVE
                      </em>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* TERMINAL */}

            <div className="skill-detail-terminal">

              <span className="green">
                root@anjan
              </span>

              <span>:</span>

              <span className="blue">
                ~
              </span>

              <span>
                $ module --status
              </span>

              <br />

              <span className="green">
                [✓]
              </span>

              <span>
                &nbsp;{selectedSkill.title}
              </span>

              <span className="green">
                &nbsp;ONLINE
              </span>

            </div>

          </section>

        </div>

      )}


      {/* FOOTER */}

      <div className="skills-footer">

        <span className="green">
          root@anjan
        </span>

        <span>:</span>

        <span className="blue">
          ~/security
        </span>

        <span>
          $ modules --status
        </span>

        <strong>
          ● ALL SYSTEMS ACTIVE
        </strong>

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

export default Skills