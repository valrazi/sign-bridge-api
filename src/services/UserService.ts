import { UserRegisterDTO } from "../dto/users/registerDto";
import { User } from "../models/User";
import moment from 'moment'
import { comparePassword, hashPassword } from "../utils/hashPassword";
import { UserLoginDto } from "../dto/users/loginDto";
import { DataNotFound } from "../common/errors/NotFound";
import { InvalidCredentials } from "../common/errors/InvalidCredentials";
import { encyrptToken } from "../utils/jwt";
import { throw_error } from "../utils/throwError";
import { UserForgotPasswordDto } from "../dto/users/forgotPassword";
import { UserUpdateProfileDTO } from "../dto/users/updateProfile";
import { UserChangePasswordDTO } from "../dto/users/changePassword";
import { Subscriptions } from "../models/Subscription";
import { Conflict } from "../common/errors/ConflictData";
export class UserService {
    async register(payload: UserRegisterDTO): Promise<User>{
        try {
            const emailExist = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if(emailExist) {
                throw new Conflict()
            }
            const newUser = await User.create({
                fullName: payload.fullName,
                email: payload.email,
                password: payload.password,
                dateBirth: moment(payload.dateBirth).toDate(),
                phoneNumber: payload.phoneNumber,
                placeBirth: payload.placeBirth,
                securityAnswer: payload.securityAnswer,
                securityQuestion: payload.securityQuestion,
                roleId: 3
            })
            const user = await User.findOne({
                where: {
                    id: newUser.id
                },
                attributes: {
                    exclude: ['password', 'deletedAt']
                }
            })
            await Subscriptions.create({
                startedAt: moment().toDate(),
                endedAt: moment().add(1, 'years').toDate(),
                isValid: true,
                price: 1,
                transferProof: 'SYSTEM',
                userId: user?.id,
                validatedAt: moment().toDate()
            })
            return user!
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async login(payload: UserLoginDto) {
        try {
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            const hashed = hashPassword('user')
            const isSame = comparePassword('user', hashed)
            console.log({hashed, isSame})
            if(!user) {
                throw new DataNotFound('user data not found')
            }
            const isPasswordValid = comparePassword(payload.password, user?.password!)
            if(!isPasswordValid) {
                throw new InvalidCredentials('credentials invalid')
            }
            const userFormatted = await User.findOne({
                where: {
                    id: user.id
                },
                attributes: {
                    exclude: ['password', 'deletedAt']
                }
            })
            return {
                token: encyrptToken({email: user.email, id: user.id, encAt: new Date()}),
                user:userFormatted
            }
        } catch (error) {
            throw error
        }
    }
    async detail(user: User) {
        try {
            const userDetail = await User.findOne({
                where: {
                    id: user.id
                },
                attributes: {
                    exclude: ['password', 'deletedAt']
                }
            })
            return userDetail
        } catch (error) {
            throw error
        }
    }
    async forget(payload: UserForgotPasswordDto) {
        try {
            console.log({payload})
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if(!user) {
                throw new DataNotFound()
            }
            if(payload.securityQuestion != user.securityQuestion || payload.securityAnswer != user.securityAnswer){
                throw new InvalidCredentials()
            }
            user.password = hashPassword(payload.password)
            await user.save()
            const updatedUser = await User.findOne({
                where: {
                    id: user.id
                },
                attributes: {
                    exclude: ['password', 'deletedAt']
                }
            })
            return updatedUser
        } catch (error) {
            throw error
        }
    }
    async update(payload: UserUpdateProfileDTO, user: User) {
        try {
            let updateUser = await User.findOne({
                where: {
                    id: user.id
                }
            })
            if(!updateUser){
                throw new DataNotFound()
            }
            updateUser.fullName = payload.fullName
            updateUser.email = payload.email
            updateUser.phoneNumber = payload.phoneNumber
            await updateUser.save()
            updateUser = await User.findOne({
                where: {
                    id: updateUser.id
                },
                attributes: {
                    exclude:['password', 'deletedAt']
                }
            })
            return updateUser
        } catch (error) {
            throw error
        }
    }
    async changePassword(payload: UserChangePasswordDTO, user: User) {
        try {
            let updateUser = await User.findOne({
                where: {
                    id: user.id
                }
            })
            if(!updateUser){
                throw new DataNotFound()
            }
            if(!comparePassword(payload.oldPassword, updateUser.password)){
                throw new InvalidCredentials()
            }
            updateUser.password = hashPassword(payload.newPassword)
            await updateUser.save()
            updateUser = await User.findOne({
                where: {
                    id: updateUser.id
                },
                attributes: {
                    exclude:['password', 'deletedAt']
                }
            })
            return updateUser
        } catch (error) {
            throw error
        }
    }
}