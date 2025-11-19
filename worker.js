export default {
  async fetch(request, env, ctx) {
    const USPTO_URL = "https://api.uspto.gov/api/v1/patent/applications/search";
    
    const corsHeaders = {
      // Update Access-Control-Allow-Origin to your domain
      "Access-Control-Allow-Origin": "https://forkingoff.com",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Query for the single most recent patent grant
      const requestBody = {
        "sort": [ { "field": "applicationMetaData.grantDate", "order": "desc" } ],
        "pagination": { "offset": 0, "limit": 1 }
      };

      // Send POST request to USPTO API
      const response = await fetch(USPTO_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": env.USPTO_API_KEY 
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`USPTO Status: ${response.status}`);
      }

      const data = await response.json();

      // JSON response
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
  },
};
