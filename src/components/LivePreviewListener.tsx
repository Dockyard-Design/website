'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * This component enables live preview functionality and shows a draft mode indicator
 * only when actually in the Payload admin iframe (live preview).
 */
export function LivePreviewListener() {
  const pathname = usePathname()
  const [isInIframe, setIsInIframe] = useState(false)
  const [isDraftMode, setIsDraftMode] = useState(false)

  useEffect(() => {
    // Check if we're in an iframe (Payload admin live preview)
    const inIframe = window.self !== window.top
    setIsInIframe(inIframe)

    // Check for draft mode cookie
    const hasDraftCookie =
      document.cookie.includes('__prerender_bypass') ||
      document.cookie.includes('__next_preview_data')
    setIsDraftMode(hasDraftCookie)

    if (inIframe) {
      // Send message to parent window that the page has loaded
      window.parent.postMessage(
        {
          type: 'NEXT_JS_LIVE_PREVIEW_READY',
          pathname,
        },
        '*',
      )

      // Listen for messages from Payload admin
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'NEXT_JS_LIVE_PREVIEW_REFRESH') {
          // Trigger a refresh when Payload sends new data
          window.location.reload()
        }
      }

      window.addEventListener('message', handleMessage)
      return () => window.removeEventListener('message', handleMessage)
    }
  }, [pathname])

  // Only show banner when in iframe AND in draft mode
  if (!isInIframe || !isDraftMode) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-2 text-center text-sm font-bold">
      DRAFT MODE - Live Preview Active
    </div>
  )
}
