import { nanoid } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts'

import { getObj, getRedis } from './utils.ts'

export default async (req, ctx) => {
  const redis = await getRedis()
  // if redis has a status of 500 then there
  // is an error with the connection
  if (redis.status === 500)
    return redis

  const todosKeys = await redis.keys('todo_')
  const todos = await Promise.all(
    todosKeys.map((k: string) => redis.hgetall(k))
  )

  return new Response(JSON.stringify({reqId: nanoid(16), todos}, null, 2))
}
