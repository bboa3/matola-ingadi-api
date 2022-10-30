declare module 'user' {
    export interface Photo {
    alt: string
    url: string
  }

  export interface Session {
    _id: string
    sessionToken: string
    userId: string
    expires: string
  }
}
