import * as bcript from "bcrypt"
export async function comparePassword(password: string, hashPassword: string) {
  try {
    return await bcript.compare(password, hashPassword)
  } catch (error) {
    throw error
  }
}