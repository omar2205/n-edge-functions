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

function abort(errMsg?: string) {
  return new Response(
    JSON.stringify({ msg: errMsg || 'error', code: 4001 }),
    {
      status: 400,
    }
  )
}

function okResponse(responseMsg?: string) {
  return new Response(
    JSON.stringify({ msg: responseMsg || 'OK', code: 100 }),
    {
      status: 200,
    }
  )
}

export { abort, okResponse, getObj, getRedis }
export default {
  text: 'util',
}
