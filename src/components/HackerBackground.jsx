import { useEffect, useRef } from 'react'

function HackerBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')

    let animationFrame

    let width = 0
    let height = 0

    /* =====================================
       COLORS
       ===================================== */

    const GREEN = '0,255,136'
    const CYAN = '110,231,255'


    /* =====================================
       DATA
       ===================================== */

    const nodes = []

    const packets = []

    const commands = [
      'ACCESS_GRANTED',
      'FIREWALL_ACTIVE',
      'PACKET_ANALYSIS',
      'THREAT_MONITOR',
      'NETWORK_SCAN',
      'IDS_ACTIVE',
      'IPS_ACTIVE',
      'SSH_CONNECTION',
      'SYSLOG_STREAM',
      'AUTH_REQUIRED',
      'SECURITY_EVENT',
      'PORT_SCAN',
      'LINUX_KERNEL',
      'C2_MONITOR',
      'ENCRYPTED_TRAFFIC',
      'SOC_MONITOR',
      'TRACE_ROUTE',
      'THREATFOX_LIVE',
    ]

    const floatingCommands = []


    /* =====================================
       RESIZE
       ===================================== */

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = width
      canvas.height = height

      createNodes()
      createPackets()
    }


    /* =====================================
       CREATE NETWORK NODES
       ===================================== */

    const createNodes = () => {
      nodes.length = 0

      const count =
        Math.min(
          75,
          Math.floor(
            (width * height) / 18000
          )
        )

      for (let i = 0; i < count; i++) {
        nodes.push({
          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          radius:
            Math.random() *
              1.8 +
            0.6,

          vx:
            (Math.random() - 0.5) *
            0.18,

          vy:
            (Math.random() - 0.5) *
            0.18,

          pulse:
            Math.random() *
            Math.PI *
            2,

          speed:
            0.01 +
            Math.random() *
              0.025,

          color:
            Math.random() > 0.82
              ? CYAN
              : GREEN,
        })
      }
    }


    /* =====================================
       CREATE DATA PACKETS
       ===================================== */

    const createPackets = () => {
      packets.length = 0

      for (let i = 0; i < 18; i++) {
        packets.push({
          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          vx:
            0.8 +
            Math.random() *
              1.8,

          size:
            Math.random() *
              2 +
            1,

          opacity:
            0.25 +
            Math.random() *
              0.55,

          color:
            Math.random() > 0.7
              ? CYAN
              : GREEN,
        })
      }
    }


    /* =====================================
       CREATE FLOATING COMMANDS
       ===================================== */

    const createCommands = () => {
      floatingCommands.length = 0

      for (let i = 0; i < 14; i++) {
        floatingCommands.push({
          x:
            Math.random() *
            width,

          y:
            Math.random() *
            height,

          text:
            commands[
              Math.floor(
                Math.random() *
                  commands.length
              )
            ],

          opacity:
            Math.random() *
              0.055 +
            0.015,

          speed:
            0.08 +
            Math.random() *
              0.16,

          life:
            Math.random() *
            500,

          maxLife:
            250 +
            Math.random() *
              500,
        })
      }
    }


    /* =====================================
       DRAW BACKGROUND
       ===================================== */

    const drawBackground = () => {
      ctx.fillStyle =
        'rgba(1,5,3,0.28)'

      ctx.fillRect(
        0,
        0,
        width,
        height
      )
    }


    /* =====================================
       CYBER GRID
       ===================================== */

    const drawGrid = (time) => {
      const gridSize = 70

      const offset =
        (time * 0.015) %
        gridSize

      ctx.lineWidth = 1

      ctx.strokeStyle =
        `rgba(${GREEN},0.035)`

      for (
        let x = -gridSize;
        x < width + gridSize;
        x += gridSize
      ) {
        ctx.beginPath()

        ctx.moveTo(
          x + offset,
          0
        )

        ctx.lineTo(
          x + offset,
          height
        )

        ctx.stroke()
      }


      for (
        let y = -gridSize;
        y < height + gridSize;
        y += gridSize
      ) {
        ctx.beginPath()

        ctx.moveTo(
          0,
          y + offset
        )

        ctx.lineTo(
          width,
          y + offset
        )

        ctx.stroke()
      }
    }


    /* =====================================
       MOVING NODES
       ===================================== */

    const updateNodes = () => {
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy
        node.pulse += node.speed

        if (node.x < -20) {
          node.x = width + 20
        }

        if (node.x > width + 20) {
          node.x = -20
        }

        if (node.y < -20) {
          node.y = height + 20
        }

        if (node.y > height + 20) {
          node.y = -20
        }
      })
    }


    /* =====================================
       NETWORK CONNECTIONS
       ===================================== */

    const drawConnections = () => {
      for (
        let i = 0;
        i < nodes.length;
        i++
      ) {
        for (
          let j = i + 1;
          j < nodes.length;
          j++
        ) {
          const a = nodes[i]
          const b = nodes[j]

          const dx =
            a.x - b.x

          const dy =
            a.y - b.y

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            )

          const maxDistance = 150

          if (
            distance <
            maxDistance
          ) {
            const opacity =
              (1 -
                distance /
                  maxDistance) *
              0.08

            ctx.strokeStyle =
              `rgba(${GREEN},${opacity})`

            ctx.lineWidth = 1

            ctx.beginPath()

            ctx.moveTo(
              a.x,
              a.y
            )

            ctx.lineTo(
              b.x,
              b.y
            )

            ctx.stroke()
          }
        }
      }
    }


    /* =====================================
       DRAW NODES
       ===================================== */

    const drawNodes = () => {
      nodes.forEach((node) => {
        const pulse =
          Math.sin(
            node.pulse
          ) *
            0.5 +
          0.5

        /* glow */

        ctx.beginPath()

        ctx.arc(
          node.x,
          node.y,
          node.radius +
            pulse * 5,
          0,
          Math.PI * 2
        )

        ctx.fillStyle =
          `rgba(${node.color},${
            0.015 +
            pulse * 0.025
          })`

        ctx.fill()


        /* core */

        ctx.beginPath()

        ctx.arc(
          node.x,
          node.y,
          node.radius,
          0,
          Math.PI * 2
        )

        ctx.fillStyle =
          `rgba(${node.color},${
            0.2 +
            pulse * 0.4
          })`

        ctx.fill()
      })
    }


    /* =====================================
       MOVING DATA PACKETS
       ===================================== */

    const updatePackets = () => {
      packets.forEach((packet) => {
        packet.x += packet.vx

        if (
          packet.x >
          width + 30
        ) {
          packet.x = -30

          packet.y =
            Math.random() *
            height
        }
      })
    }


    const drawPackets = () => {
      packets.forEach((packet) => {
        const gradient =
          ctx.createLinearGradient(
            packet.x - 45,
            packet.y,
            packet.x,
            packet.y
          )

        gradient.addColorStop(
          0,
          `rgba(${packet.color},0)`
        )

        gradient.addColorStop(
          1,
          `rgba(${packet.color},${packet.opacity})`
        )

        ctx.strokeStyle =
          gradient

        ctx.lineWidth = 1.5

        ctx.beginPath()

        ctx.moveTo(
          packet.x - 45,
          packet.y
        )

        ctx.lineTo(
          packet.x,
          packet.y
        )

        ctx.stroke()


        ctx.beginPath()

        ctx.arc(
          packet.x,
          packet.y,
          packet.size,
          0,
          Math.PI * 2
        )

        ctx.fillStyle =
          `rgba(${packet.color},${packet.opacity})`

        ctx.fill()
      })
    }


    /* =====================================
       FLOATING SECURITY COMMANDS
       ===================================== */

    const updateCommands = () => {
      floatingCommands.forEach(
        (item) => {
          item.y -= item.speed

          item.life += 1

          if (
            item.life >
            item.maxLife
          ) {
            item.life = 0

            item.x =
              Math.random() *
              width

            item.y =
              height +
              Math.random() *
                100

            item.text =
              commands[
                Math.floor(
                  Math.random() *
                    commands.length
                )
              ]
          }
        }
      )
    }


    const drawCommands = () => {
      ctx.font =
        '11px monospace'

      floatingCommands.forEach(
        (item) => {
          ctx.fillStyle =
            `rgba(${GREEN},${item.opacity})`

          ctx.fillText(
            `> ${item.text}`,
            item.x,
            item.y
          )
        }
      )
    }


    /* =====================================
       SCANNING BEAM
       ===================================== */

    const drawScanBeam = (time) => {
      const scanY =
        (time * 0.055) %
        (height + 250) -
        125

      const gradient =
        ctx.createLinearGradient(
          0,
          scanY - 100,
          0,
          scanY + 100
        )

      gradient.addColorStop(
        0,
        `rgba(${GREEN},0)`
      )

      gradient.addColorStop(
        0.45,
        `rgba(${GREEN},0.015)`
      )

      gradient.addColorStop(
        0.5,
        `rgba(${GREEN},0.07)`
      )

      gradient.addColorStop(
        0.55,
        `rgba(${GREEN},0.015)`
      )

      gradient.addColorStop(
        1,
        `rgba(${GREEN},0)`
      )

      ctx.fillStyle =
        gradient

      ctx.fillRect(
        0,
        scanY - 100,
        width,
        200
      )
    }


    /* =====================================
       CORNER HUD
       ===================================== */

    const drawHUD = (time) => {
      const pulse =
        Math.sin(
          time * 0.003
        ) *
          0.5 +
        0.5

      ctx.font =
        '10px monospace'

      ctx.fillStyle =
        `rgba(${GREEN},${
          0.08 +
          pulse * 0.05
        })`

      ctx.fillText(
        'SYS::ONLINE',
        25,
        height - 35
      )

      ctx.fillText(
        'NET::MONITORED',
        25,
        height - 20
      )


      ctx.fillText(
        'SECURE_CONNECTION',
        width - 145,
        height - 35
      )

      ctx.fillText(
        'ENCRYPTED',
        width - 145,
        height - 20
      )
    }


    /* =====================================
       ANIMATION LOOP
       ===================================== */

    const animate = (time) => {
      drawBackground(time)

      drawGrid(time)

      updateNodes()

      drawConnections()

      drawNodes()

      updatePackets()

      drawPackets()

      updateCommands()

      drawCommands()

      drawScanBeam(time)

      drawHUD(time)

      animationFrame =
        requestAnimationFrame(
          animate
        )
    }


    /* =====================================
       INITIALIZE
       ===================================== */

    resize()

    createCommands()

    window.addEventListener(
      'resize',
      resize
    )

    animationFrame =
      requestAnimationFrame(
        animate
      )


    /* =====================================
       CLEANUP
       ===================================== */

    return () => {
      cancelAnimationFrame(
        animationFrame
      )

      window.removeEventListener(
        'resize',
        resize
      )
    }

  }, [])


  return (
    <canvas
      ref={canvasRef}
      className="hacker-background"
    />
  )
}

export default HackerBackground