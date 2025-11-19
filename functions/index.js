export async function onRequest(context) {
  const USPTO_URL = "https://api.uspto.gov/api/v1/patent/applications/search";
  
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://forkingoff.com", 
    "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (context.request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch the single most recent patent grant.
    const requestBody = {
      "sort": [ { "field": "applicationMetaData.grantDate", "order": "desc" } ],
      "pagination": { "offset": 0, "limit": 1 }
    };

    // POST query to the USPTO API
    const response = await fetch(USPTO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": context.env.USPTO_API_KEY 
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`USPTO API Error: ${response.status}`);
    }

    const data = await response.json();

    // JSON response
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (err) {
    // Fail gracefully so the dashboard shows "System Failure" instead of crashing
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}
