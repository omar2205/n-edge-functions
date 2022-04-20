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
  const conn: string | any[] = Deno.env.get('REDIS_CONN')
  if (conn === 'CHANGE_ME' || conn.length !== 4)
    return new Response('ERROR_REDIS', {
      status: 500,
    })

  const [hostname, port, name, password] = conn.split('|')
  const redis = await connect({
    hostname,
    port,
    name,
    password,
  })
  return redis
}


export { getObj, getRedis }
