import { nanoid } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts'

import { getObj, getRedis } from './utils.ts'

export default async (req: Request, ctx: any) => {
  const redis = await getRedis()
  if (!redis)
    return new Response('ERROR_REDIS', {
      status: 500,
    })

  switch (req.method) {
    case 'POST':
      const id = `todo_${nanoid(4)}`
      const {title, done} = await req.json()
      if (title && done) await redis.hset(id, { title, done })
      break
  }

  const todosKeys = await redis.keys('todo_*')
  const todos = await Promise.all(
    todosKeys.map(async (k: string) => getObj(await redis.hgetall(k)))
  )

  return new Response(JSON.stringify(todos))
}
