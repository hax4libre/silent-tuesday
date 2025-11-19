# Silent Tuesday
This project checks to see if the US Patent and Trademark Office has failed to grant it's regular Tuesday patents for the first time since the 1800s.

![Example Panel](/Operational.png)

The project leverages a **Cloudflare Worker** to initiate a backend API query to the USPTO **Open Data Portal** endpoint and retrieve the most recent patent grant. The Cloudflare worker is triggered by HTML and JavaScript hosted on a **Ghost** blog in an HTML card object. The card renders a dashboard panel with information from the JSON response and informs visitors whether or not the USPTO is still issuing patents on time. In the event patents were not granted on the most recent Tuesday, the card will render a red warning message indicating something terrible has happened. If it's Tuesday and patent grants have not yet been published, the card will render an orange note of caution, while indicating there may be a brief delay. Cloudflare Workers and the USPTO ODP API offer sufficiently high volumes of free usage that an average, blog is unlikely to exceed daily limits.

*NOTE:* The ODP query filters by the `grantDate` within `applicationMetaData`, sorting in descending order and taking only the most recent object. The `grantDate` property returns a string in `yyyy-MM-dd` format, which is not granular enough to determine the absolute last patent issued on a given date. As a result, some users may get different results depending on how the ODP sorts objects at a given time. Nonetheless, the most recent date should be sufficient to determine whether the USPTO is hitting it's Tuesday mark. If you work with patent data frequently, and have a suggestion for better logic to implement, please let me know or submit a pull request.

***WARNING!*** Given the above caveat, I am obviously not an expert on the patent system. I take no responsibility for the accuracy or reliablity of the data returned in this project. If the dashboard turns red, and you liquidate all of your assets only to find out our economy didn't actually break that's on you, friend. Consult with a financial planner and/or lawyer before making major life choices based on something you read in a blog.

## Generate an API Key

The United States Patent and Trademark Office maintains multiple free, publicly available API endpoints through their [Open Data Portal](https://data.uspto.gov/swagger/index.html). You can create a free API key by following their **Getting started** instructions, which involve creating a **MyUSPTO** account, and verifying your identity with **ID.me**.

## Setup Cloudflare Worker
From the Cloudflare Dashboard, go to **Compute & AI** > **Workers & Pages** > **Create Applicatioin** > **Start with Hello World**.

Give it a name; make it fun! Click **Deploy** > **Edit Code**, then replace the default code with the contents of [worker.js](/worker.js).

Make sure to update `Access-Control-Allow-Origin` with your blog's domain, then click **Deploy**.

From your Worker main page, go to **Settings** > **Variables and Secrets** > **Add+** > Set **Type** as **Secret**, **Variable Name** as `USPTO_API_KEY`, paste your API key in **Value**, and click **Deploy**.

Click **Visit** to test your worker and see the full JSON response provided by the USPTO API. We'll be using `grantDate`, `patentNumber`, and `inventionTitle` to populate our card.

## Setup HTML Card in Ghost

From your Ghost blog editor, create an HTML card and paste the contents of [card.html](/ghost/card.html).

Make sure to update `WORKER_URL` with your Cloudflare Worker domain, which should look like `hXXps://worker-name[.]yourDomain[.]workers[.]dev` and is available in your Worker main page.

*NOTE:* You may want to disable visibility for **Email**, as many email inboxes deny embedded JavaScript by default.

## Contributions Welcomed!!!

This project was initiated to supplement a blog post, but may have other utilities as well. In the event it breaks before the USPTO does, I'll make an effort to update it. If you've got an idea for how to improve it, or make it more widely accessible let me know.
