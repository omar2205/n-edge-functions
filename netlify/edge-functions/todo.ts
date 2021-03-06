import { nanoid } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts'
import { abort, okResponse, getRedis } from './common/utils.ts'

export default async (req: Request, ctx: any) => {
  const redis = await getRedis()
  if (!redis) return abort('REDIS_ERROR')

  ctx.log('-START-')

  switch (req.method) {
    case 'POST': {
      const id = `todo_${nanoid()}`
      const { title, completed } = await req.json()
      await fetch('https://funer-thunder.free.beeceptor.com', {
        method: 'POST',
        body: JSON.stringify({title, completed})
      })
      if (title === undefined || completed === undefined) return abort()

      ctx.log('>>', title, completed)

      await redis.hset(id, {
        id: id,
        title: title,
        completed: `${completed}`,
        timestamp: new Date().toJSON(),
      })
      return okResponse('added')
    }
    case 'PUT': {
      const { title, done, id } = await req.json()
      if (title && done && id) {
        await redis.hset(id, {
          id: id,
          title: title,
          done: done,
          timestamp: new Date().toJSON(),
        })
        return okResponse('updated')
      } else {
        return abort('bad request')
      }
    }
    case 'DELETE': {
      const { id } = await req.json()
      if (id) {
        await redis.del(id)
        return okResponse('deleted')
      }
      return abort('bad request')
    }
  }

  return new Response('Nothing to do')
}
