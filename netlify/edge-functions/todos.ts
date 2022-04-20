import { nanoid } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts'
import { getObj, getRedis } from './common/utils.ts'

export default async (req: Request, ctx: any) => {
  const redis = await getRedis()
  if (!redis)
    return new Response('ERROR_REDIS', {
      status: 500,
    })

  const todosKeys = await redis.keys('todo_*')
  const todos = await Promise.all(
    todosKeys.map(async (k: string) => getObj(await redis.hgetall(k)))
  )

  return new Response(JSON.stringify(todos))
}
