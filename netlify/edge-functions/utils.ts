// deno-lint-ignore-file
import { connect } from 'https://deno.land/x/redis@v0.25.4/mod.ts'

/**
 * Returns an object from formatted array
 * ['name', 'alice'] -> {name: 'alice'}
 */
function getObj(arr: any[]) {
  const obj = Object()

  for (let i = 0; i < arr.length - 1; i += 2) {
    obj[arr[i]] = arr[i + 1]
  }

  return obj
}

/**
 * Returns a Redis client
 */
async function getRedis() {
  const conn = Deno.env.get('REDIS_CONN')
  if (!conn || conn === 'CHANGE_ME') return false

  const [hostname, port, name, password] = (conn as string).split('|')
  const redis = await connect({
    hostname,
    port,
    name,
    password,
  })
  return redis
}

export { getObj, getRedis }
