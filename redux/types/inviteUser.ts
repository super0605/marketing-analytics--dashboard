import { UserModel } from "../../models";

export interface inviteUserState {
  roading: false,
  newUser: UserModel,
  error?: string,
}