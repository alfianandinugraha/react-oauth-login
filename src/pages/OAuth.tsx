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

    if (vendor === 'google') {
      const code = searchParams.get('code') || ''
      const response: OAuthResponse = {
        vendor: 'google',
        success: {
          code,
        },
      }
      ls.set('oauth-response', response)
    }

    if (vendor === 'github') {
      const response: OAuthResponse = {
        vendor: 'github',
      }
      const error = searchParams.get('error')
      if (error) {
        const responseError: OAuthResponse = {
          ...response,
          error: {
            reason:
              searchParams.get('error_description') ||
              'Failed to get user access',
            type: searchParams.get('error') || 'access_denied',
          },
        }
        ls.set('oauth-response', responseError)
        window.close()
        return
      }

      const code = searchParams.get('code') || ''
      const responseSuccess: OAuthResponse = { ...response, success: { code } }
      ls.set('oauth-response', responseSuccess)
    }

    window.close()
  }, [])
  return <h1>OAuth Page</h1>
}

export default OAuthPage
