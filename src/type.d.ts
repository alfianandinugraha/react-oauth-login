declare module 'types' {
  type OAuthResponse = {
    vendor: 'facebook' | 'google'
    success?: {
      code: string
    }
    error?: {
      reason: string
      type: string
    }
  }
}
