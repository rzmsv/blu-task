import * as bcript from "bcrypt"
import { appConfigs } from "src/configs"
export async function hashPassword(password: string) {
  try {
    return await bcript.hash(password, Number(appConfigs.BCRYPT_SALT))
  } catch (error) {
    throw error
  }
}