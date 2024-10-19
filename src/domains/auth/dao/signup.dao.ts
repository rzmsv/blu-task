
interface ResponseType {
  id: number
  email: string
  fullName: string | null
  role: "USER" | "ADMIN"
}

export interface SignupDAO {
  res: ResponseType
  message: []
}