import 'dotenv/config'
export const appConfigs = {
  /* ----------------------------------- APP ---------------------------------- */
  APP_PORT: process.env.APP_PORT,

  /* --------------------------------- PRISMA --------------------------------- */
  DATABASE_URL: process.env.DATABASE_URL,

  /* ---------------------------------- HASH ---------------------------------- */
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  /* ----------------------------------- JWT ---------------------------------- */
  JWT_SECRET: process.env.JWT_SECRET
}