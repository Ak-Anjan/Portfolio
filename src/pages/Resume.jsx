function Resume() {
  return (
    <main className="resume-page">
      <div className="resume-grid"></div>

      <div className="resume-container">

        <a href="/" className="resume-return">
          ← RETURN TO SYSTEM
        </a>

        <header className="resume-header">
          <p className="resume-kicker">
            [ PROFESSIONAL RESUME ]
          </p>

          <h1>
            ANJAN KUMAR S
          </h1>

          <h2>JUNIOR SECURITY ENGINEER</h2>

          <p className="resume-location">
            Bengaluru, India
          </p>
        </header>

        <section className="resume-section">
          <h3>[ PROFESSIONAL SUMMARY ]</h3>

          <p>
            Junior Security Engineer with hands-on experience in network
            security, IDS/IPS, SIEM, firewall administration, vulnerability
            assessment, and security monitoring. Skilled in Suricata, Snort,
            Wazuh, ELK Stack, pfSense, OPNsense, Wireshark, Nmap, Linux,
            Python, and Bash. Experienced in security testing, threat
            detection, incident investigation, network traffic analysis,
            and security hardening, with a strong focus on securing network
            infrastructure and supporting day-to-day security operations.
          </p>
        </section>

        <section className="resume-section">
          <h3>[ TECHNICAL SKILLS ]</h3>

          <div className="resume-skill-group">
            <strong>SECURITY</strong>
            <p>
              SIEM • Security Monitoring • Alert Triage • Log Analysis •
              Incident Investigation • Incident Response • Threat Detection •
              VAPT • Vulnerability Assessment • Security Hardening • Threat
              Hunting • IOC/TTP Analysis • OWASP Top 10 • CVE/CVSS
            </p>
          </div>

          <div className="resume-skill-group">
            <strong>TOOLS</strong>
            <p>
              Wazuh • ELK Stack • Suricata • Snort • Filebeat • Wireshark •
              Nmap • Burp Suite • OWASP ZAP • SQLMap • DVWA • pfSense •
              OPNsense • Git • GitHub
            </p>
          </div>

          <div className="resume-skill-group">
            <strong>NETWORKING & SYSTEMS</strong>
            <p>
              TCP/IP • DNS • HTTP/HTTPS • VPN • Firewalls • VLAN • Routing •
              OSPF • ACL • DHCP • NAT • Cisco IOS • Linux • Ubuntu • Windows •
              Network Troubleshooting
            </p>
          </div>

          <div className="resume-skill-group">
            <strong>CLOUD & SCRIPTING</strong>
            <p>
              AWS EC2 • AWS IAM • Python • Bash • NIST CSF • CIS Controls
            </p>
          </div>
        </section>

        <section className="resume-section">
          <h3>[ EXPERIENCE ]</h3>

          <div className="resume-timeline">

            <article className="resume-job">
              <div className="resume-job-header">
                <div>
                  <h4>Junior Security Engineer</h4>
                  <span>FCOOS Technologies Pvt. Ltd.</span>
                </div>

                <div className="resume-job-date">
                  September 2026 – Present
                </div>
              </div>

              <p className="resume-job-type">
                Bengaluru, India • Full-time
              </p>
            </article>

            <article className="resume-job">
              <div className="resume-job-header">
                <div>
                  <h4>Cybersecurity Intern</h4>
                  <span>FCOOS Technologies Pvt. Ltd.</span>
                </div>

                <div className="resume-job-date">
                  March 2026 – August 2026
                </div>
              </div>

              <p className="resume-job-description">
                Configured and managed Suricata and Snort IDS/IPS across
                pfSense, OPNsense, and Linux; developed and tuned custom
                detection rules for malware, SQL injection, SSH brute-force,
                P2P/TOR, ARP spoofing, and other suspicious activity.
              </p>

              <p className="resume-job-description">
                Implemented IPS controls, firewall policies, country-based
                IP blocking, and network access controls; integrated Wazuh,
                Suricata, and ELK Stack for centralized monitoring and alert
                correlation.
              </p>

              <p className="resume-job-description">
                Performed network traffic analysis and incident investigation
                using Wireshark and Linux.
              </p>
            </article>

          </div>
        </section>

        <section className="resume-section">
          <h3>[ PROJECTS ]</h3>

          <article className="resume-project">
            <h4>Suricata IDS/IPS & SIEM Integration</h4>

            <p>
              Developed and tested 15+ custom IDS/IPS rules; integrated
              Wazuh, Suricata and ELK Stack for centralized monitoring
              and log correlation.
            </p>

            <div className="resume-project-tags">
              <span>Suricata</span>
              <span>Wazuh</span>
              <span>ELK Stack</span>
              <span>IDS/IPS</span>
            </div>
          </article>

          <article className="resume-project">
            <h4>Network Security & Cisco Lab</h4>

            <p>
              Designed LAN/WAN topologies and configured VLANs,
              inter-VLAN routing, OSPF, static routing, ACLs, DHCP
              and NAT; performed traffic analysis and troubleshooting.
            </p>

            <div className="resume-project-tags">
              <span>Networking</span>
              <span>Cisco</span>
              <span>VLAN</span>
              <span>OSPF</span>
              <span>ACL</span>
            </div>
          </article>
        </section>

        <section className="resume-section">
          <h3>[ EDUCATION ]</h3>

          <div className="resume-education">
            <div>
              <h4>MSc Cyber Security</h4>
              <p>AMITY University, Bengaluru</p>
              <span>2024 – 2026</span>
            </div>

            <div>
              <h4>Bachelor of Computer Application (BCA)</h4>
              <p>KLE Society’s Degree College, Nagarbhavi</p>
              <span>2020 – 2023</span>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h3>[ CERTIFICATION ]</h3>

          <div className="resume-certification">
            <span className="cert-icon">✓</span>

            <div>
              <h4>CompTIA Security+</h4>
              <p>SY0-701</p>
              <span>Certified • 2026</span>
            </div>
          </div>
        </section>

        <section className="resume-actions">

          <a
            href="/Anjan Kumar S.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-button primary"
          >
            VIEW RESUME ↗
          </a>

          <a
            href="/Anjan Kumar S.pdf"
            download
            className="resume-button secondary"
          >
            DOWNLOAD RESUME ↓
          </a>

        </section>

        <footer className="resume-footer">
          <span>root@anjan</span>
          <span>:</span>
          <span>~/resume</span>
          <span>$</span>
          <span className="cursor"></span>
        </footer>

      </div>
    </main>
  )
}

export default Resume