const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

const PORT =
  process.env.PORT || 3001

const AUTH_KEY =
  process.env.THREATFOX_AUTH_KEY

const THREATFOX_URL =
  'https://threatfox-api.abuse.ch/api/v1/'


let cache = {
  events: [],
  stats: {
    total: 0,
    malware: 0,
    c2: 0,
    highConfidence: 0,
  },
  updatedAt: null,
}


let lastFetch = 0

const CACHE_TIME =
  60 * 1000


/* ================================= */
/* FETCH THREATFOX */
/* ================================= */

async function fetchThreatFox() {

  if (!AUTH_KEY) {

    throw new Error(
      'THREATFOX_AUTH_KEY is missing in .env'
    )

  }


  const response =
    await fetch(
      THREATFOX_URL,
      {
        method: 'POST',

        headers: {
          'Auth-Key': AUTH_KEY,

          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          query: 'get_iocs',

          days: 1,
        }),
      }
    )


  if (!response.ok) {

    throw new Error(
      `ThreatFox HTTP ${response.status}`
    )

  }


  const result =
    await response.json()


  if (
    result.query_status !==
    'ok'
  ) {

    throw new Error(
      `ThreatFox query failed: ${
        result.query_status
      }`
    )

  }


  const data =
    Array.isArray(result.data)
      ? result.data
      : []


  /* ================================= */
  /* SORT NEWEST FIRST */
  /* ================================= */

  data.sort(
    (a, b) => {

      const dateA =
        new Date(
          a.first_seen || 0
        )

      const dateB =
        new Date(
          b.first_seen || 0
        )

      return (
        dateB.getTime() -
        dateA.getTime()
      )

    }
  )


  /* ================================= */
  /* STATISTICS */
  /* ================================= */

  const malwareCount =
    data.filter(
      (item) =>
        item.malware_printable ||
        item.malware
    ).length


  const c2Count =
    data.filter(
      (item) =>
        item.threat_type ===
          'botnet_cc' ||
        item.threat_type ===
          'c2'
    ).length


  const highConfidence =
    data.filter(
      (item) =>
        Number(
          item.confidence_level
        ) >= 80
    ).length


  /* ================================= */
  /* FRONTEND EVENTS */
  /* ================================= */

  const events =
    data
      .slice(0, 100)
      .map((item) => ({

        id:
          String(
            item.id || ''
          ),

        ioc:
          item.ioc || 'UNKNOWN',

        threatType:
          item.threat_type || 'unknown',

        threatTypeDescription:
          item.threat_type_desc ||
          'Threat intelligence event',

        iocType:
          item.ioc_type || 'unknown',

        iocTypeDescription:
          item.ioc_type_desc ||
          '',

        malware:
          item.malware_printable ||
          item.malware ||
          'Unknown',

        confidence:
          Number(
            item.confidence_level || 0
          ),

        firstSeen:
          item.first_seen || null,

        lastSeen:
          item.last_seen || null,

        reporter:
          item.reporter || 'unknown',

        tags:
          Array.isArray(item.tags)
            ? item.tags
            : [],

        reference:
          item.reference || null,

      }))


  cache = {

    events,

    stats: {

      total: data.length,

      malware:
        malwareCount,

      c2:
        c2Count,

      highConfidence,

    },

    updatedAt:
      new Date().toISOString(),

  }


  lastFetch =
    Date.now()


  return cache
}


/* ================================= */
/* API ENDPOINT */
/* ================================= */

app.get(
  '/api/threats',
  async (req, res) => {

    try {

      const now =
        Date.now()


      if (
        !cache.updatedAt ||
        now - lastFetch >
          CACHE_TIME
      ) {

        await fetchThreatFox()

      }


      res.json({

        success: true,

        source:
          'ThreatFox / abuse.ch',

        updatedAt:
          cache.updatedAt,

        stats:
          cache.stats,

        events:
          cache.events,

      })

    } catch (error) {

      console.error(
        'ThreatFox error:',
        error.message
      )


      res.status(500).json({

        success: false,

        error:
          error.message,

      })

    }

  }
)


/* ================================= */
/* HEALTH CHECK */
/* ================================= */

app.get(
  '/api/health',
  (req, res) => {

    res.json({

      status: 'online',

      service:
        'Threat Intelligence API',

      source:
        'ThreatFox',

      updatedAt:
        cache.updatedAt,

    })

  }
)


/* ================================= */
/* START SERVER */
/* ================================= */

app.listen(
  PORT,
  () => {

    console.log('')
    console.log(
      '================================'
    )

    console.log(
      ' CYBER THREAT INTELLIGENCE API'
    )

    console.log(
      '================================'
    )

    console.log(
      `Server: http://localhost:${PORT}`
    )

    console.log(
      'Source: ThreatFox / abuse.ch'
    )

    console.log(
      '================================'
    )

    console.log('')

  }
)