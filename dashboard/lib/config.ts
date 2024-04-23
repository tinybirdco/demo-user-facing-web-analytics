const config = {
  authToken: process.env.NEXT_PUBLIC_TINYBIRD_AUTH_TOKEN,
  host: process.env.NEXT_PUBLIC_TINYBIRD_HOST,
} as const

export default config
