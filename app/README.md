# User-Facing Web Analytics Application

This folder contains all of the code to build the frontend of this demo.

![App Screenshot](../img/app_screenshot.png "App Screenshot")

To read the full e2e tutorial, head to [the Tinybird docs > User-facing web analytics tutorial](https://www.tinybird.co/docs/guides/tutorials/user-facing-web-analytics).

## Deploying the app

This is a NextJS application. Deploy it to the cloud with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftinybirdco%2Fdemo-user-facing-web-analytics%2Ftree%2Fmain%2Fapp&env=NEXT_PUBLIC_TINYBIRD_AUTH_TOKEN,NEXT_PUBLIC_TINYBIRD_HOST,NEXT_PUBLIC_BASE_URL&envDescription=Tinybird%20configuration&project-name=user-facing-web-analytics&repository-name=user-facing-web-analytics)

You'll need to enter your [Tinybird Token](https://www.tinybird.co/docs/concepts/auth-tokens) and Tinybird Host (e.g. https://ui.tinybird.co).
Also, we recommend you to set also the `NEXT_PUBLIC_BASE_URL` variable with your application final url (e.g. https://analytics.tinybird.co).
