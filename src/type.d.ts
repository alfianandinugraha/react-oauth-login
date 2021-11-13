declare module 'types' {
  type OAuthResponse = {
    vendor: 'facebook' | 'google' | 'github'
    success?: {
      code: string
    }
    isError?: boolean
  }
}
