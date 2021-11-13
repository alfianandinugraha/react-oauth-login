import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { OAuthResponse } from 'types'
import * as ls from 'local-storage'

const OAuthPage = (): React.ReactElement => {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const state = JSON.parse(searchParams.get('state') || '')
    const vendor = state.vendor as OAuthResponse['vendor']

    if (vendor === 'facebook') {
      const error = searchParams.get('error')
      if (!error) window.close()

      const code = searchParams.get('code') || ''
      const response: OAuthResponse = {
        vendor: 'facebook',
        success: {
          code,
        },
      }
      ls.set('oauth-response', response)
    }

    window.close()
  }, [])
  return <h1>OAuth Page</h1>
}

export default OAuthPage
