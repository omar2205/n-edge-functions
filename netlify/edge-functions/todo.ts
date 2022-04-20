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
      ctx.log('---', title, done)
      await redis.hset(id, { title, done })
      break
  }

  return new Response('Nothing to do')
}
