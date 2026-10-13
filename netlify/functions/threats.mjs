
let cache = {
  events: [],
  stats: {
    total: 0,
    malware: 0,
    c2: 0,
    highConfidence: 0,
  },
  updatedAt: null,
};

let lastFetch = 0;
let pendingFetch = null;

const CACHE_TIME = 60 * 1000;
const REQUEST_TIMEOUT = 15000;

const THREATFOX_URL =
  "https://threatfox-api.abuse.ch/api/v1/";

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });

async function fetchThreatFox() {
  const AUTH_KEY =
    process.env.THREATFOX_AUTH_KEY?.trim();
    console.log("CTI diagnostic:", {
  keyPresent: Boolean(AUTH_KEY),
  keyLength: AUTH_KEY?.length ?? 0,
});

  if (!AUTH_KEY) {
    throw new Error(
      "THREATFOX_AUTH_KEY is missing"
    );
  }

  const controller = new AbortController();

  const timeout = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT
  );

  let response;

  try {
    response = await fetch(THREATFOX_URL, {
      method: "POST",
      headers: {
        "Auth-Key": AUTH_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "CyberPortfolio-CTI/1.0",
      },
      body: JSON.stringify({
        query: "get_iocs",
        days: 1,
      }),
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        "ThreatFox API request timed out"
      );
    }

    throw new Error(
      `ThreatFox connection failed: ${error.message}`
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errorBody = await response.text();

    // Avoid logging any possible secret values.
    const safeBody = errorBody
      .replaceAll(AUTH_KEY, "[REDACTED]")
      .slice(0, 500);

    console.error("ThreatFox API error:", {
      status: response.status,
      body: safeBody,
    });

    if (response.status === 401) {
      throw new Error(
        "ThreatFox HTTP 401: Authentication failed"
      );
    }

    if (response.status === 403) {
      throw new Error(
        "ThreatFox HTTP 403: Access forbidden. Check API key and access permissions."
      );
    }

    if (response.status === 429) {
      throw new Error(
        "ThreatFox HTTP 429: Rate limit exceeded"
      );
    }

    throw new Error(
      `ThreatFox HTTP ${response.status}`
    );
  }

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      "ThreatFox returned invalid JSON"
    );
  }

  if (result.query_status !== "ok") {
    throw new Error(
      `ThreatFox query failed: ${
        result.query_status || "unknown"
      }`
    );
  }

  const data = Array.isArray(result.data)
    ? result.data
    : [];

  data.sort((a, b) => {
    const dateA = new Date(
      a.first_seen || 0
    ).getTime();

    const dateB = new Date(
      b.first_seen || 0
    ).getTime();

    return dateB - dateA;
  });

  const malwareCount = data.filter(
    (item) =>
      item.malware_printable ||
      item.malware
  ).length;

  const c2Count = data.filter(
    (item) =>
      item.threat_type === "botnet_cc" ||
      item.threat_type === "c2"
  ).length;

  const highConfidence = data.filter(
    (item) =>
      Number(item.confidence_level || 0) >= 80
  ).length;

  const events = data.slice(0, 100).map(
    (item) => ({
      id: String(item.id || ""),
      ioc: item.ioc || "UNKNOWN",

      threatType:
        item.threat_type || "unknown",

      threatTypeDescription:
        item.threat_type_desc ||
        "Threat intelligence event",

      iocType:
        item.ioc_type || "unknown",

      iocTypeDescription:
        item.ioc_type_desc || "",

      malware:
        item.malware_printable ||
        item.malware ||
        "Unknown",

      confidence: Number(
        item.confidence_level || 0
      ),

      firstSeen:
        item.first_seen || null,

      lastSeen:
        item.last_seen || null,

      reporter:
        item.reporter || "unknown",

      tags: Array.isArray(item.tags)
        ? item.tags
        : [],

      reference:
        item.reference || null,
    })
  );

  cache = {
    events,
    stats: {
      total: data.length,
      malware: malwareCount,
      c2: c2Count,
      highConfidence,
    },
    updatedAt: new Date().toISOString(),
  };

  lastFetch = Date.now();

  return cache;
}

export default async function handler() {
  try {
    const now = Date.now();

    if (
      !cache.updatedAt ||
      now - lastFetch > CACHE_TIME
    ) {
      if (!pendingFetch) {
        pendingFetch = fetchThreatFox()
          .finally(() => {
            pendingFetch = null;
          });
      }

      await pendingFetch;
    }

    return jsonResponse({
      success: true,
      source: "ThreatFox / abuse.ch",
      updatedAt: cache.updatedAt,
      stats: cache.stats,
      events: cache.events,
    });
  } catch (error) {
    console.error(
      "ThreatFox error:",
      error.message
    );

    // Return cached data if available.
    if (cache.updatedAt) {
      return jsonResponse({
        success: true,
        source: "ThreatFox / abuse.ch",
        cached: true,
        stale: true,
        warning: error.message,
        updatedAt: cache.updatedAt,
        stats: cache.stats,
        events: cache.events,
      });
    }

    return jsonResponse(
      {
        success: false,
        source: "ThreatFox / abuse.ch",
        error: error.message,
        updatedAt: null,
        stats: cache.stats,
        events: [],
      },
      503
    );
  }
}
