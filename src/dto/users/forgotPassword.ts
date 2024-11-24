export interface UserForgotPasswordDto {
    email:string;
    securityQuestion: string;
    securityAnswer: string;
    password: string;
}