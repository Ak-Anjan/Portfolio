export default async function handler() {
  return new Response(
    JSON.stringify({
      status: 'online',
      service:
        'Threat Intelligence API',
      source:
        'ThreatFox',
      timestamp:
        new Date().toISOString(),
    }),
    {
      status: 200,

      headers: {
        'Content-Type':
          'application/json',
      },
    }
  )
}
