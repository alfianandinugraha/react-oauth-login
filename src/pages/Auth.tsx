import BaseLayout from '@/layouts/BaseLayout'
import styled from '@emotion/styled'
import { Facebook, GitHub, Google } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const FACEBOOK_APP_ID = 308645417927319

const REDIRECT_URI = 'http://localhost:3000/oauth'

const OAuthButton = styled(Button)`
  margin-bottom: 16px;
`

const AuthPage = (): React.ReactElement => {
  const openDialog = (url: string) => {
    window.open(url, '', 'width=700, height=700,fullscreen=no')
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
