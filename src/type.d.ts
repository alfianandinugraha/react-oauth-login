declare module 'types' {
  type OAuthResponse = {
    vendor: 'facebook'
    success?: {
      code: string
    }
    error?: {
      reason: string
      type: string
    }
  }
}
