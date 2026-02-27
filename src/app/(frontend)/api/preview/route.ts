import type { CollectionSlug, PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'

export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config })
  const { searchParams } = new URL(req.url)

  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')

  // Allow local development without secret
  const isDev = process.env.NODE_ENV === 'development'

  if (!isDev && previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path) {
    return new Response('Path is required', { status: 400 })
  }

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the actual page
  redirect(path)
}

export async function POST(req: NextRequest): Promise<Response> {
  // Handle Payload's live preview POST requests
  const draft = await draftMode()
  draft.enable()

  return NextResponse.json({ success: true })
}
