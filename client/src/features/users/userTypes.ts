export type UserType = Omit<UserFormData, "password">;

export interface UserFormData {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}
