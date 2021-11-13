declare module 'types' {
  type OAuthResponse = {
    vendor: 'facebook' | 'google' | 'github'
    success?: {
      code: string
    }
    error?: {
      reason: string
      type: string
    }
  }
}
