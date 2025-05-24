declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    ENCRYPTION_KEY: string
    BETTER_AUTH_SECRET: string
    BETTER_AUTH_URL: string
  }
}
