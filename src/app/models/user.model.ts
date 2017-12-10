export interface User {
    uid: string
    email: string
    isAdmin: boolean
    photoURL?: string
    displayName?: string
    fullName?: string
    street?: string
    zipAndCity?: string
    orders?: string[]
  }
  