import {
  Canvas,
  useFrame,
} from '@react-three/fiber'

import {
  OrbitControls,
  Stars,
  Html,
} from '@react-three/drei'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import * as THREE from 'three'


const NODE_COUNT = 28


/* =========================================
   THREAT COLOR MAPPING
   ========================================= */

function getThreatColor(event) {
  const type =
    String(
      event?.threatType || ''
    ).toLowerCase()

  if (
    type.includes('botnet') ||
    type.includes('c2')
  ) {
    return '#ff8c00'
  }

  if (
    type.includes('payload') ||
    type.includes('malware')
  ) {
    return '#ff3b3b'
  }

  if (
    type.includes('skim') ||
    type.includes('skimming')
  ) {
    return '#ff00ff'
  }

  if (
    type.includes('exploit') ||
    type.includes('scan')
  ) {
    return '#6ee7ff'
  }

  return '#00ff88'
}


/* =========================================
   FORMAT THREAT TYPE
   ========================================= */

function formatThreatType(event) {
  const type =
    String(
      event?.threatTypeDescription ||
        event?.threatType ||
        'Unknown threat'
    )

  return type
    .replace(
      /^Indicator that identifies a /i,
      ''
    )
    .replace(
      /\(C&C\)/i,
      ''
    )
    .trim()
}


/* =========================================
   TEXT TRUNCATION
   ========================================= */

function truncate(
  value,
  length = 28
) {
  const text =
    String(value || '')

  if (
    text.length <= length
  ) {
    return text
  }

  return `${text.slice(
    0,
    length
  )}...`
}


/* =========================================
   THREAT NODE
   ========================================= */

function ThreatNode({
  position,
  event,
  index,
  selected,
  onSelect,
}) {
  const groupRef =
    useRef()

  const [
    hovered,
    setHovered,
  ] = useState(false)

  const color =
    getThreatColor(event)

  const confidence =
    Number(
      event?.confidence || 0
    )

  const scale =
    confidence >= 90
      ? 1.15
      : confidence >= 70
        ? 1
        : 0.9


  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    const time =
      state.clock.getElapsedTime()

    const targetScale =
      selected
        ? 1.45
        : hovered
          ? 1.3
          : scale

    groupRef.current.scale.lerp(
      new THREE.Vector3(
        targetScale,
        targetScale,
        targetScale
      ),
      0.12
    )

    groupRef.current.position.y =
      position[1] +
      Math.sin(
        time * 1.4 + index
      ) *
        0.015
  })


  return (
    <group
      ref={groupRef}
      position={position}
    >

      {/* =====================================
          INVISIBLE INTERACTION AREA
          ===================================== */}

      <mesh
        onPointerOver={(
          pointerEvent
        ) => {
          pointerEvent.stopPropagation()

          setHovered(true)

          document.body.style.cursor =
            'pointer'
        }}

        onPointerOut={() => {
          setHovered(false)

          document.body.style.cursor =
            'default'
        }}

        onClick={(
          pointerEvent
        ) => {
          pointerEvent.stopPropagation()

          /*
           * IMPORTANT:
           * Send the REAL threat event,
           * not the Three.js pointer event.
           */
          onSelect(event)
        }}
      >
        <sphereGeometry
          args={[
            0.24,
            16,
            16,
          ]}
        />

        <meshBasicMaterial
          transparent
          opacity={0}
        />
      </mesh>


      {/* =====================================
          OUTER GLOW
          ===================================== */}

      <mesh>
        <sphereGeometry
          args={[
            0.13,
            16,
            16,
          ]}
        />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={
            selected
              ? 0.85
              : 0.35
          }
        />
      </mesh>


      {/* =====================================
          MAIN NODE
          ===================================== */}

      <mesh>
        <sphereGeometry
          args={[
            0.055,
            12,
            12,
          ]}
        />

        <meshBasicMaterial
          color={color}
        />
      </mesh>


      {/* =====================================
          HOVER TOOLTIP
          ===================================== */}

      {hovered &&
        !selected && (
          <Html
            distanceFactor={8}
            position={[
              0.12,
              0.12,
              0,
            ]}
          >
            <div className="threat-tooltip">

              <div
                className="threat-tooltip-title"
                style={{
                  color,
                }}
              >
                {event?.malware ||
                  'UNKNOWN THREAT'}
              </div>

              <div className="threat-tooltip-type">
                {formatThreatType(
                  event
                )}
              </div>

              <div className="threat-tooltip-ioc">
                {truncate(
                  event?.ioc,
                  32
                )}
              </div>

              <div className="threat-tooltip-confidence">
                CONFIDENCE {confidence}%
              </div>

            </div>
          </Html>
        )}

    </group>
  )
}


/* =========================================
   3D NETWORK SCENE
   ========================================= */

function NetworkScene({
  events,
  selectedEvent,
  onSelect,
  onOpenMonitor,
}) {
  const groupRef =
    useRef()


  /* =====================================
     CREATE 28 NETWORK NODES
     ===================================== */

  const nodes =
    useMemo(() => {
      const result = []

      for (
        let i = 0;
        i < NODE_COUNT;
        i++
      ) {
        const phi =
          Math.acos(
            1 -
              (2 *
                (i + 0.5)) /
                NODE_COUNT
          )

        const theta =
          Math.PI *
          (1 + Math.sqrt(5)) *
          i

        const radius = 2.25

        result.push({
          position: [
            radius *
              Math.sin(phi) *
              Math.cos(theta),

            radius *
              Math.sin(phi) *
              Math.sin(theta),

            radius *
              Math.cos(phi),
          ],

          event:
            events.length > 0
              ? events[
                  i %
                    events.length
                ]
              : null,
        })
      }

      return result
    }, [events])


  /* =====================================
     CREATE NETWORK CONNECTIONS
     ===================================== */

  const connections =
    useMemo(() => {
      const lines = []

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
          const distance =
            new THREE.Vector3(
              ...nodes[i].position
            ).distanceTo(
              new THREE.Vector3(
                ...nodes[j].position
              )
            )

          if (
            distance < 2.5 &&
            lines.length < 70
          ) {
            lines.push([
              nodes[i].position,
              nodes[j].position,
            ])
          }
        }
      }

      return lines
    }, [nodes])


  /* =====================================
     NETWORK ROTATION
     ===================================== */

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    const time =
      state.clock.getElapsedTime()

    groupRef.current.rotation.y =
      time * 0.08

    groupRef.current.rotation.x =
      Math.sin(
        time * 0.15
      ) * 0.08
  })


  return (
    <>

      {/* ===================================
          BACKGROUND STARS
          =================================== */}

      <Stars
        radius={30}
        depth={15}
        count={900}
        factor={1.4}
        saturation={0}
        fade
        speed={0.3}
      />


      {/* ===================================
          LIGHTING
          =================================== */}

      <ambientLight
        intensity={0.3}
      />

      <pointLight
        position={[
          0,
          0,
          0,
        ]}
        intensity={3}
        distance={8}
      />


      <group ref={groupRef}>

        {/* =================================
            NETWORK CONNECTIONS
            ================================= */}

        {connections.map(
          (
            connection,
            index
          ) => {
            const points = [
              new THREE.Vector3(
                ...connection[0]
              ),

              new THREE.Vector3(
                ...connection[1]
              ),
            ]

            const geometry =
              new THREE.BufferGeometry().setFromPoints(
                points
              )

            return (
              <line
                key={index}
                geometry={geometry}
              >
                <lineBasicMaterial
                  color="#00ff88"
                  transparent
                  opacity={0.12}
                />
              </line>
            )
          }
        )}


        {/* =================================
            THREAT NODES
            ================================= */}

        {nodes.map(
          (
            node,
            index
          ) => (
            <ThreatNode
              key={
                node.event?.id ||
                index
              }

              position={
                node.position
              }

              event={
                node.event
              }

              index={index}

              selected={
                selectedEvent?.id ===
                node.event?.id
              }

              onSelect={
                onSelect
              }
            />
          )
        )}


        {/* =================================
            CENTRAL CYBER CORE
            ================================= */}

        <mesh>
          <icosahedronGeometry
            args={[
              0.65,
              2,
            ]}
          />

          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={1.8}
            wireframe
          />
        </mesh>


        {/* =================================
            CLICKABLE WHITE CTI CORE
            ================================= */}

        <mesh
          onClick={(
            pointerEvent
          ) => {
            pointerEvent.stopPropagation()

            onOpenMonitor()
          }}

          onPointerOver={(
            pointerEvent
          ) => {
            pointerEvent.stopPropagation()

            document.body.style.cursor =
              'pointer'
          }}

          onPointerOut={() => {
            document.body.style.cursor =
              'default'
          }}
        >

          <sphereGeometry
            args={[
              0.2,
              24,
              24,
            ]}
          />

          <meshBasicMaterial
            color="#ffffff"
          />

        </mesh>


        {/* =================================
            OUTER GREEN RING
            ================================= */}

        <mesh
          rotation={[
            0,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              0.95,
              0.015,
              8,
              100,
            ]}
          />

          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={0.5}
          />
        </mesh>


        {/* =================================
            CYAN RING
            ================================= */}

        <mesh
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              1.15,
              0.01,
              8,
              100,
            ]}
          />

          <meshBasicMaterial
            color="#6ee7ff"
            transparent
            opacity={0.35}
          />
        </mesh>


        {/* =================================
            OUTER GREEN RING
            ================================= */}

        <mesh
          rotation={[
            0,
            Math.PI / 2,
            0,
          ]}
        >
          <torusGeometry
            args={[
              1.35,
              0.008,
              8,
              100,
            ]}
          />

          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={0.25}
          />
        </mesh>

      </group>
    </>
  )
}


/* =========================================
   INDIVIDUAL THREAT FLASH CARD
   ========================================= */

function ThreatFlashCard({
  event,
  onClose,
}) {
  if (!event) {
    return null
  }

  const color =
    getThreatColor(event)

  const confidence =
    Number(
      event.confidence || 0
    )


  return (
    <div
      className="threat-flash-card"

      style={{
        borderColor: color,

        boxShadow:
          `0 0 25px ${color}44`,
      }}
    >

      <button
        className="threat-card-close"

        onClick={onClose}
      >
        ×
      </button>


      <div
        className="threat-card-live"

        style={{
          color,
        }}
      >
        ● LIVE THREAT
      </div>


      <div
        className="threat-card-category"

        style={{
          color,
        }}
      >
        {event.malware ||
          'UNKNOWN THREAT'}
      </div>


      <div className="threat-card-description">
        {formatThreatType(
          event
        )}
      </div>


      <div className="threat-card-section">

        <div className="threat-card-label">
          THREAT IDENTIFIER
        </div>

        <div className="threat-card-id">
          {event.ioc ||
            'UNKNOWN'}
        </div>

      </div>


      <div className="threat-card-grid">

        <div>
          <span>
            TYPE
          </span>

          <strong>
            {event.iocType ||
              'unknown'}
          </strong>
        </div>


        <div>
          <span>
            CONFIDENCE
          </span>

          <strong
            style={{
              color:
                confidence >= 80
                  ? '#00ff88'
                  : '#ff8c00',
            }}
          >
            {confidence}%
          </strong>
        </div>


        <div>
          <span>
            REPORTER
          </span>

          <strong>
            {event.reporter ||
              'unknown'}
          </strong>
        </div>


        <div>
          <span>
            STATUS
          </span>

          <strong
            style={{
              color:
                event.isCompromised
                  ? '#ff3b3b'
                  : '#00ff88',
            }}
          >
            {event.isCompromised
              ? 'COMPROMISED'
              : 'ACTIVE'}
          </strong>
        </div>

      </div>


      <div className="threat-card-section">

        <div className="threat-card-label">
          FIRST SEEN
        </div>

        <div className="threat-card-value">
          {event.firstSeen ||
            'UNKNOWN'}
        </div>

      </div>


      <div className="threat-card-section">

        <div className="threat-card-label">
          SOURCE
        </div>

        <div className="threat-card-value">
          THREATFOX / ABUSE.CH
        </div>

      </div>


      {event.tags?.length >
        0 && (
        <div className="threat-card-tags">

          {event.tags
            .slice(0, 5)
            .map((tag) => (
              <span
                key={tag}
              >
                {tag}
              </span>
            ))}

        </div>
      )}

    </div>
  )
}


/* =========================================
   LIVE THREAT MONITOR
   ========================================= */

function LiveThreatMonitor({
  status,
  stats,
  updatedAt,
  events,
  onClose,
}) {
  const latestEvents =
    events.slice(0, 5)


  return (
    <div
      className="live-monitor-overlay"

      onClick={onClose}
    >

      <div
        className="live-threat-monitor"

        onClick={(
          event
        ) => {
          event.stopPropagation()
        }}
      >

        {/* =================================
            CLOSE BUTTON
            ================================= */}

        <button
          className="live-monitor-close"

          onClick={onClose}
          aria-label="Close live threat monitor"
        >
          ×
        </button>


        {/* =================================
            HEADER
            ================================= */}

        <div className="live-monitor-header">

          <div>

            <div className="live-monitor-title">
              LIVE THREAT MONITOR
            </div>

            <div className="live-monitor-source">
              THREATFOX / ABUSE.CH
            </div>

          </div>


          <div
            className={
              `live-monitor-status ${
                status
                  .toLowerCase()
                  .replace(
                    /\s+/g,
                    '-'
                  )
              }`
            }
          >
            <span></span>

            {status}

          </div>

        </div>


        {/* =================================
            METRICS
            ================================= */}

        <div className="live-monitor-grid">

          <div className="live-monitor-stat">

            <span>
              TOTAL IOCS
            </span>

            <strong>
              {stats.total ??
                0}
            </strong>

          </div>


          <div className="live-monitor-stat">

            <span>
              MALWARE
            </span>

            <strong>
              {stats.malware ??
                0}
            </strong>

          </div>


          <div className="live-monitor-stat">

            <span>
              C2
            </span>

            <strong>
              {stats.c2 ??
                0}
            </strong>

          </div>


          <div className="live-monitor-stat">

            <span>
              HIGH CONF.
            </span>

            <strong>
              {stats.highConfidence ??
                0}
            </strong>

          </div>

        </div>


        {/* =================================
            LAST UPDATE
            ================================= */}

        <div className="live-monitor-update">

          LAST UPDATE:&nbsp;

          {updatedAt
            ? new Date(
                updatedAt
              ).toLocaleTimeString()

            : '--'}

        </div>


        {/* =================================
            LATEST EVENTS
            ================================= */}

        <div className="live-event-feed">

          <div className="live-event-feed-title">
            LATEST CTI EVENTS
          </div>


          {latestEvents.length ===
          0 ? (

            <div className="live-event-empty">
              WAITING FOR CTI DATA...
            </div>

          ) : (

            latestEvents.map(
              (event) => {
                const color =
                  getThreatColor(
                    event
                  )

                return (
                  <div
                    className="live-event-row"

                    key={
                      event.id
                    }
                  >

                    <span
                      className="live-event-dot"

                      style={{
                        background:
                          color,

                        boxShadow:
                          `0 0 8px ${color}`,
                      }}
                    />


                    <div className="live-event-info">

                      <strong>
                        {truncate(
                          event.malware ||
                            'Unknown',
                          18
                        )}
                      </strong>

                      <span>
                        {truncate(
                          event.ioc,
                          28
                        )}
                      </span>

                    </div>


                    <span className="live-event-confidence">
                      {event.confidence}%
                    </span>

                  </div>
                )
              }
            )

          )}

        </div>

      </div>

    </div>
  )
}


/* =========================================
   MAIN NETWORK CORE
   ========================================= */

function NetworkCore() {

  /* =====================================
     THREAT EVENTS
     ===================================== */

  const [
    events,
    setEvents,
  ] = useState([])


  /* =====================================
     THREAT STATISTICS
     ===================================== */

  const [
    stats,
    setStats,
  ] = useState({
    total: 0,
    malware: 0,
    c2: 0,
    highConfidence: 0,
  })


  /* =====================================
     LAST UPDATE
     ===================================== */

  const [
    updatedAt,
    setUpdatedAt,
  ] = useState(null)


  /* =====================================
     CTI CONNECTION STATUS
     ===================================== */

  const [
    status,
    setStatus,
  ] = useState(
    'CONNECTING'
  )


  /* =====================================
     SELECTED INDIVIDUAL THREAT
     ===================================== */

  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState(null)


  /* =====================================
     LIVE MONITOR POPUP
     ===================================== */

  const [
    showLiveMonitor,
    setShowLiveMonitor,
  ] = useState(false)


  /* =====================================
     FETCH LIVE THREATFOX DATA
     ===================================== */

  useEffect(() => {

    let mounted = true


    const fetchThreats =
      async () => {

        try {

          if (mounted) {
            setStatus(
              'CONNECTING'
            )
          }


          const response =
            await fetch(
              '/api/threats'
            )


          if (
            !response.ok
          ) {
            throw new Error(
              `HTTP ${response.status}`
            )
          }


          const data =
            await response.json()


          if (
            !data.success
          ) {
            throw new Error(
              data.error ||
                'Threat API failed'
            )
          }


          if (!mounted) {
            return
          }


          setEvents(
            Array.isArray(
              data.events
            )
              ? data.events
              : []
          )


          setStats(
            data.stats || {
              total: 0,
              malware: 0,
              c2: 0,
              highConfidence: 0,
            }
          )


          setUpdatedAt(
            data.updatedAt ||
              null
          )


          setStatus(
            'LIVE CTI'
          )

        } catch (error) {

          console.error(
            'CTI fetch error:',
            error
          )


          if (mounted) {
            setStatus(
              'OFFLINE'
            )
          }

        }

      }


    /* Initial request */
    fetchThreats()


    /* Refresh every 30 seconds */
    const interval =
      setInterval(
        fetchThreats,
        30000
      )


    return () => {

      mounted = false

      clearInterval(
        interval
      )

    }

  }, [])


  /* =====================================
     AUTOMATIC RANDOM THREAT POPUP
     ===================================== */

  useEffect(() => {

    if (
      events.length === 0 ||
      status !== 'LIVE CTI'
    ) {
      return
    }

    let cancelled = false

    let showTimer = null

    let hideTimer = null


    const scheduleThreat = () => {

      /*
       * Wait randomly between
       * 4 and 8 seconds.
       */

      const delay =
        4000 +
        Math.random() * 4000


      showTimer = setTimeout(() => {

        if (cancelled) {
          return
        }


        /*
         * Pick a random REAL
         * ThreatFox event.
         */

        const randomIndex =
          Math.floor(
            Math.random() *
              Math.min(
                NODE_COUNT,
                events.length
              )
          )


        const randomThreat =
          events[randomIndex]


        if (!randomThreat) {

          scheduleThreat()

          return
        }


        /*
         * POPUP THE REAL THREAT
         */

        setSelectedEvent(
          randomThreat
        )


        /*
         * KEEP THE THREAT CARD
         * VISIBLE FOR 2 SECONDS.
         */

        hideTimer =
          setTimeout(() => {

            if (!cancelled) {

              setSelectedEvent(
                (current) =>
                  current?.id ===
                  randomThreat.id
                    ? null
                    : current
              )

            }

          }, 2000)


        /*
         * Schedule the next
         * random threat.
         */

        scheduleThreat()

      }, delay)

    }


    /*
     * Start automatic
     * threat popup cycle.
     */

    scheduleThreat()


    /*
     * Cleanup timers when
     * component is removed
     * or CTI data changes.
     */

    return () => {

      cancelled = true


      if (showTimer) {

        clearTimeout(
          showTimer
        )

      }


      if (hideTimer) {

        clearTimeout(
          hideTimer
        )

      }

    }

  }, [events, status])


  /* =====================================
     INDIVIDUAL THREAT SELECT
     ===================================== */

  const handleSelect =
    (event) => {

      setSelectedEvent(
        event
      )

    }


  /* =====================================
     OPEN LIVE MONITOR
     ===================================== */

  const openLiveMonitor =
    () => {

      setShowLiveMonitor(
        true
      )

    }


  /* =====================================
     CLOSE LIVE MONITOR
     ===================================== */

  const closeLiveMonitor =
    () => {

      setShowLiveMonitor(
        false
      )

    }


  return (
    <div className="network-core-container">

      {/* ===================================
          3D NETWORK
          =================================== */}

      <Canvas
        className="network-canvas"

        camera={{
          position: [
            0,
            0,
            6.5,
          ],

          fov: 45,
        }}
      >

        <NetworkScene

          events={
            events
          }

          selectedEvent={
            selectedEvent
          }

          onSelect={
            handleSelect
          }

          onOpenMonitor={
            openLiveMonitor
          }

        />


        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minDistance={5}
          maxDistance={8}
        />

      </Canvas>


      {/* ===================================
          LIVE THREAT MONITOR
          HIDDEN UNTIL WHITE CORE CLICK
          =================================== */}

      {showLiveMonitor && (

        <LiveThreatMonitor

          status={
            status
          }

          stats={
            stats
          }

          updatedAt={
            updatedAt
          }

          events={
            events
          }

          onClose={
            closeLiveMonitor
          }

        />

      )}


      {/* ===================================
          INDIVIDUAL THREAT CARD
          =================================== */}

      <ThreatFlashCard

        event={
          selectedEvent
        }

        onClose={() =>
          setSelectedEvent(
            null
          )
        }

      />


      {/* ===================================
          OFFLINE INDICATOR
          =================================== */}

      {status ===
        'OFFLINE' && (

        <div className="cti-offline-banner">
          [!] CTI FEED OFFLINE
        </div>

      )}

    </div>
  )
}


export default NetworkCore