import { nanoid } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts'
import { abort, getRedis } from './utils.ts'

export default async (req: Request, ctx: any) => {
  const redis = await getRedis()
  if (!redis) return abort('REDIS_ERROR')

  switch (req.method) {
    case 'POST':
      const id = `todo_${nanoid()}`
      const { title, done } = await req.json()
      if (!title || !done) return abort()

      await redis.hset(id, { title, done, timestamp: new Date() })
      return new Response(
        JSON.stringify({
          msg: 'added',
          code: 100,
        })
      )
      break
    case 'DELETE':
      return 'no delete'
  }

  return new Response('Nothing to do')
}
