export interface IUser {
    title?: string;
    firstName: string;
    lastName: string;
    emailId: string;
    dateOfBirth?: string;
    id: string;
    fullName?: string;
}

export interface IUserSessionData {
    jwtToken : string;
    userRole : string;
    userInfo : IUser;
    personalDetailsRequired : boolean;
    passwordChangeRequired : boolean;
  }