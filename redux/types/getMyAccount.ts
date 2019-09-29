import { UserModel } from '../../models'

export interface GetMyAccountState {
  userId: number
  loading: boolean
  error: boolean
  token: string
  user: UserModel
  isAuth: boolean
}