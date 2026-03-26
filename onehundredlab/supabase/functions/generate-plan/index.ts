import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  // ✅ Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  try {
    const { prompt } = await req.json()

    const accessToken = Deno.env.get('GOOGLE_ACCESS_TOKEN')

    const response = await fetch(
      `https://us-central1-aiplatform.googleapis.com/v1/projects/elevated-cargo-491411-v2/locations/us-central1/publishers/google/models/gemini-1.5-flash:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        }),
      }
    )

    const data = await response.json()

    return new Response(
      JSON.stringify({
        text:
          data.candidates?.[0]?.content?.parts?.[0]?.text ||
          'Error generating response',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})