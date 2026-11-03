export type UserType = Omit<UserFormData, "password">;

// Optional details the user fills in on their profile page
export interface UserProfile {
  name: string;
  // When true (and a name is set) the site shows the name instead of the username
  showName: boolean;
  pronouns: string;
  bio: string;
  location: string;
  timeZone: string;
}

export interface UserFormData {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  // Missing on accounts created before profiles existed
  profile?: UserProfile;
}
