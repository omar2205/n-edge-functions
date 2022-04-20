import { nanoid } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts'

import { getObj, getRedis } from './utils.ts'

export default async (req: Request, ctx: any) => {
  ctx.log('> start')
  ctx.log(Deno.env.get('REDIS_CONN'))
  const redis = await getRedis()
  if (!redis)
    return new Response('ERROR_REDIS', {
      status: 500,
    })

  ctx.log('-- redis working?')

  const todosKeys = await redis.keys('todo_')
  ctx.log('-- keys', todosKeys)
  const todos = await Promise.all(
    todosKeys.map((k: string) => redis.hgetall(k))
  )

  return new Response(JSON.stringify({ reqId: nanoid(16), todos }, null, 2))
}
