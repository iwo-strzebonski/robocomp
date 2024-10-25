export interface LoginRequestBody {
  email: string
  password: string
}

export interface LoginResponseBody {
  accessToken: string
  tokenType: string
}
