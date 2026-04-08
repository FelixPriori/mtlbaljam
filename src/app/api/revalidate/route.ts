import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad request', { status: 400 })
    }

    revalidatePath('/', 'layout')

    return NextResponse.json({ revalidated: true, now: Date.now(), type: body._type })
  } catch (err: unknown) {
    console.error(err)
    return new Response((err as Error).message, { status: 500 })
  }
}
