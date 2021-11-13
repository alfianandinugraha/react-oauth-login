import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { OAuthResponse } from 'types'
import * as ls from 'local-storage'
import { Box, Typography } from '@mui/material'

const OAuthPage = (): React.ReactElement => {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const state = JSON.parse(searchParams.get('state') || '')
    const vendor = state.vendor as OAuthResponse['vendor']
    const code = searchParams.get('code') || ''
    const response: OAuthResponse = {
      vendor,
    }

    if (code) {
      const successResponse: OAuthResponse = {
        ...response,
        success: {
          code,
        },
      }

      ls.set('oauth-response', successResponse)
      window.close()
      return
    }

    const responseError: OAuthResponse = {
      ...response,
      isError: true,
    }
    ls.set('oauth-response', responseError)
    window.close()
  }, [])
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100vh',
        width: '100%',
      }}
    >
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
      <Typography sx={{ marginTop: '16px' }}>Redirecting...</Typography>
    </Box>
  )
}

export default OAuthPage
