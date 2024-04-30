import { querySQL } from '../api';
import config from '../config'

async function fetch() {
  return await querySQL<void>(`
    SELECT session_id FROM analytics_hits LIMIT 1 FORMAT JSON
  `)
}

export default async function getAuth() {
  const token = config.authToken
  const host = config.host

  let errorMessage;
  let isTokenValid = true;
  const isAuthenticated = !!token && !!host

  try {
    await fetch();
  } catch(error: any) {
    isTokenValid = !error || ![401, 403].includes(error.status ?? 0);
    errorMessage = error?.message

    if (error.cause) {
      errorMessage += ': ' + error.cause.message
    }
  }
  return { isAuthenticated, isTokenValid, errorMessage }
}
