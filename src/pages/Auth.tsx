import BaseLayout from '@/layouts/BaseLayout'
import styled from '@emotion/styled'
import { Facebook, GitHub, Google } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import * as ls from 'local-storage'
import { OAuthResponse } from 'types'

const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID || ''

const REDIRECT_URI = 'http://localhost:3000/oauth'

const MAX_OPEN_POPUP = 60000

const OAuthButton = styled(Button)`
  margin-bottom: 16px;
`

const AuthPage = (): React.ReactElement => {
  const openDialog = (url: string) => {
    const popup = window.open(url, '', 'width=700, height=700,fullscreen=no')
    let openDuration = 0

    const checking = setInterval(() => {
      const response = ls.get<OAuthResponse | undefined>('oauth-response')

      if (openDuration >= MAX_OPEN_POPUP) {
        popup?.close()
        clearInterval(checking)
      }
      openDuration += 1000

      if (popup?.closed) {
        clearInterval(checking)
      }

      if (response) {
        console.log(response)
        clearInterval(checking)
        ls.remove('oauth-response')
      }
    }, 1000)
  }

  const facebookDialog = () => {
    const state = JSON.stringify({
      vendor: 'facebook',
    })
    openDialog(
      `https://www.facebook.com/v12.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${REDIRECT_URI}&state=${state}`
    )
  }

  return (
    <BaseLayout>
      <Typography variant="h4">Login</Typography>
      <Box
        marginTop="24px"
        display="flex"
        flexDirection="column"
        alignItems="start"
      >
        <OAuthButton
          variant="contained"
          color="primary"
          startIcon={<Facebook />}
          sx={{
            backgroundColor: '#365F98',
            '&:hover': {
              backgroundColor: '#2b4c7a',
            },
          }}
          onClick={facebookDialog}
        >
          Login with Facebook
        </OAuthButton>
        <OAuthButton
          variant="contained"
          color="primary"
          startIcon={<Google />}
          sx={{
            backgroundColor: '#F74032',
            '&:hover': {
              backgroundColor: '#c63328',
            },
          }}
        >
          Login with Google
        </OAuthButton>
        <OAuthButton
          variant="contained"
          color="primary"
          startIcon={<GitHub />}
          sx={{
            backgroundColor: '#000000',
            '&:hover': { backgroundColor: '#191919' },
          }}
        >
          Login with GitHub
        </OAuthButton>
      </Box>
    </BaseLayout>
  )
}

export default AuthPage
