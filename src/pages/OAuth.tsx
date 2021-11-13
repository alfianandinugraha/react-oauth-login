import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { OAuthResponse } from 'types'
import * as ls from 'local-storage'

const OAuthPage = (): React.ReactElement => {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const state = JSON.parse(searchParams.get('state') || '')
    const vendor = state.vendor as OAuthResponse['vendor']
    const code = searchParams.get('code') || ''
    const response: OAuthResponse = {
      vendor,
    }

    if (vendor === 'facebook') {
      const error = searchParams.get('error')
      if (!error) {
        const responseError: OAuthResponse = {
          ...response,
          isError: true,
        }
        ls.set('oauth-response', responseError)
        window.close()
        return
      }
      const facebookResponse: OAuthResponse = {
        ...response,
        success: {
          code,
        },
      }

      ls.set('oauth-response', facebookResponse)
    }

    if (vendor === 'google') {
      const googleResponse: OAuthResponse = {
        ...response,
        success: {
          code,
        },
      }
      ls.set('oauth-response', googleResponse)
    }

    if (vendor === 'github') {
      const error = searchParams.get('error')
      if (error) {
        const responseError: OAuthResponse = {
          ...response,
          isError: true,
        }
        ls.set('oauth-response', responseError)
        window.close()
        return
      }

      const responseSuccess: OAuthResponse = { ...response, success: { code } }
      ls.set('oauth-response', responseSuccess)
    }

    window.close()
  }, [])
  return <h1>OAuth Page</h1>
}

export default OAuthPage
