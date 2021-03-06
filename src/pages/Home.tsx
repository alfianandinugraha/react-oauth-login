import BaseLayout from '@/layouts/BaseLayout'
import styled from '@emotion/styled'
import { Facebook, GitHub, Google } from '@mui/icons-material'
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import * as ls from 'local-storage'
import { OAuthResponse } from 'types'
import toast from 'react-hot-toast'

const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID || ''

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''

const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID || ''

const REDIRECT_URI =
  process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000/oauth'

const MAX_OPEN_POPUP = 60000

const OAuthButton = styled(Button)`
  margin-bottom: 8px;
  align-self: flex-start;
`

const OAuthBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const scopeAsParam = (scopes: string[]) => {
  return scopes.reduce((rev, curr) => `${rev}+${curr}`)
}

const toastSuccess = () => {
  toast.success(() => {
    return <Typography>Access Granted !</Typography>
  })
}

const toastError = () => {
  toast.error(() => {
    return <Typography>Failed, please try again</Typography>
  })
}

const HomePage = (): React.ReactElement => {
  const [facebookCode, setFacebookCode] = useState('')
  const [googleCode, setGoogleCode] = useState('')
  const [githubCode, setGithubCode] = useState('')

  const hasAnyToken = !!facebookCode || !!githubCode || !!googleCode

  const openDialog = (url: string): Promise<OAuthResponse> => {
    const popup = window.open(url, '', 'width=700, height=700,fullscreen=no')
    let openDuration = 0

    const promise = new Promise<OAuthResponse>((resolve, reject) => {
      const checking = setInterval(() => {
        const response = ls.get<OAuthResponse | undefined>('oauth-response')

        if (response) {
          if (response.isError) {
            reject(new Error('Access denied'))
          } else {
            resolve(response)
          }

          clearInterval(checking)
          ls.remove('oauth-response')
        }

        if (openDuration >= MAX_OPEN_POPUP) {
          popup?.close()
          reject(new Error('Timeout'))
          clearInterval(checking)
        }
        openDuration += 1000

        if (popup?.closed) {
          reject(new Error('Closed'))
          clearInterval(checking)
        }
      }, 1000)
    })

    return promise
  }

  const facebookDialog = () => {
    const state = JSON.stringify({
      vendor: 'facebook',
    })

    const dialogUrl = new URL('https://www.facebook.com/v12.0/dialog/oauth')
    const dialogUrlParam = dialogUrl.searchParams
    dialogUrlParam.append('state', state)
    dialogUrlParam.append('redirect_uri', REDIRECT_URI)
    dialogUrlParam.append('client_id', FACEBOOK_APP_ID)

    openDialog(dialogUrl.toString())
      .then((response) => {
        console.log(response)
        setFacebookCode(response.success?.code || '')
        toastSuccess()
      })
      .catch(() => {
        setFacebookCode('')
        toastError()
      })
  }

  const googleDialog = () => {
    const state = JSON.stringify({
      vendor: 'google',
    })

    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
      'openid',
    ]

    const dialogUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    const dialogUrlParam = dialogUrl.searchParams
    dialogUrlParam.append('scope', scopeAsParam(scopes))
    dialogUrlParam.append('include_granted_scopes', 'true')
    dialogUrlParam.append('response_type', 'code')
    dialogUrlParam.append('state', state)
    dialogUrlParam.append('redirect_uri', REDIRECT_URI)
    dialogUrlParam.append('client_id', GOOGLE_CLIENT_ID)
    const url = decodeURIComponent(dialogUrl.toString())

    openDialog(url)
      .then((response) => {
        console.log(response)
        setGoogleCode(response.success?.code || '')
        toastSuccess()
      })
      .catch(() => {
        setGoogleCode('')
        toastError()
      })
  }

  const githubDialog = () => {
    const state = JSON.stringify({
      vendor: 'github',
    })

    const scopes = ['read:user', 'user:email']

    const dialogUrl = new URL('https://github.com/login/oauth/authorize')
    const dialogUrlParam = dialogUrl.searchParams
    dialogUrlParam.append('client_id', GITHUB_CLIENT_ID)
    dialogUrlParam.append('redirect_uri', REDIRECT_URI)
    dialogUrlParam.append('allow_signup', 'true')
    dialogUrlParam.append('state', state)
    dialogUrlParam.append('scope', scopeAsParam(scopes))
    const url = decodeURIComponent(dialogUrl.toString())

    openDialog(url)
      .then((response) => {
        console.log(response)
        setGithubCode(response.success?.code || '')
        toastSuccess()
      })
      .catch(() => {
        setGithubCode('')
        toastError()
      })
  }

  return (
    <BaseLayout>
      <Typography variant="h4" sx={{ marginBottom: '4px' }}>
        React OAuth Login
      </Typography>
      {hasAnyToken && (
        <Typography variant="caption" color="GrayText">
          Send the Access Code to your Back-end via REST API, and let them
          happily process the Token
        </Typography>
      )}
      <Box
        marginTop="24px"
        display="flex"
        flexDirection="column"
        alignItems="start"
      >
        <OAuthBox>
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
          {facebookCode && (
            <TextField
              label="Access Code"
              variant="filled"
              value={facebookCode}
              fullWidth
              multiline
              maxRows={10}
            />
          )}
        </OAuthBox>
        <OAuthBox>
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
            onClick={googleDialog}
          >
            Login with Google
          </OAuthButton>
          {googleCode && (
            <TextField
              label="Access Code"
              variant="filled"
              value={googleCode}
              fullWidth
            />
          )}
        </OAuthBox>
        <OAuthBox display="flex" flexDirection="column">
          <OAuthButton
            variant="contained"
            color="primary"
            startIcon={<GitHub />}
            sx={{
              backgroundColor: '#000000',
              '&:hover': { backgroundColor: '#191919' },
            }}
            onClick={githubDialog}
          >
            Login with GitHub
          </OAuthButton>
          {githubCode && (
            <TextField
              label="Access Code"
              variant="filled"
              value={githubCode}
              fullWidth
            />
          )}
        </OAuthBox>
      </Box>
    </BaseLayout>
  )
}

export default HomePage
