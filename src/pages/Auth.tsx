import styled from '@emotion/styled'
import { Facebook, GitHub, Google } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'

const OAuthButton = styled(Button)`
  margin-bottom: 16px;
`

const AuthPage = (): React.ReactElement => {
  return (
    <Container maxWidth="md" sx={{ marginTop: '36px' }}>
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
    </Container>
  )
}

export default AuthPage
