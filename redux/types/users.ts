import { UserModel } from '../../models'

export interface usersState {
  roading: boolean
  userLists: UserModel[]
  error?: string
}