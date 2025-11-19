# Silent Tuesday
Check to see if the US Patent and Trademark Office has failed to issue a patent on a Tuesday for the first time since the 1800s.

The dashboard panel should be green if patents are being published on time, orange if it's Tuesday and nothing has been published, and red if they were not published on the most recent Tuesday as expected.

## Cloudflare Pages Config
Set project name, branch, and choose `none` for framework. In /functions/index.js, update "Access-Control-Allow-Origin" to reflect your blog domain.

## Add API Key as Cloudflare Secret
In Cloudflare project navigate to **Settings** > **Environment variables** > **Add variabl**, and add **Variable name** as `USPTO_API_KEY` along with the API key and choose **Encrypt**. Click **Save**

## Add Card to Ghost
In the Ghost blog post editor create an HTML card and copy the code from */ghost/card.html. Update `API_URL` to your Cloudflare Pages URL.
