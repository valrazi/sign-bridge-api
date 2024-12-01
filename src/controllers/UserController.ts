import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserRegisterDTO } from "../dto/users/registerDto";
import { created, general_error, not_found, success, wrong_credentials } from "../utils/responseSend";
import { UserLoginDto } from "../dto/users/loginDto";
import { DataNotFound } from "../common/errors/NotFound";
import { InvalidCredentials } from "../common/errors/InvalidCredentials";
import { return_error } from "../utils/throwError";
import { UserForgotPasswordDto } from "../dto/users/forgotPassword";
import { UserUpdateProfileDTO } from "../dto/users/updateProfile";
import { UserChangePasswordDTO } from "../dto/users/changePassword";

const userService = new UserService();
export class UserController {
  async registerUser(req: Request, res: Response) {
    try {
      const payload: UserRegisterDTO = req.body;
      const user = await userService.register(payload);
      created(res, user);
    } catch (error) {
      return_error(error, res)
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const payload: UserLoginDto = req.body
      const token = await userService.login(payload)
      success(res, token)
    } catch (error) {
      return_error(error, res)
    }
  }

  async detailUser(req: Request, res: Response) {
    try {
      const user = req.user
      if (user) {
        const data = await userService.detail(user)
        success(res, data)
      } else {
        wrong_credentials(res)
      }
    } catch (error) {
      return_error(error, res)
    }
  }
  async forgetPassword(req: Request, res: Response) {
    try {
      const data = await userService.forget(req.body)
      success(res, data)
    } catch (error) {
      return_error(error, res)
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const user = req.user
      if (user) {
        const payload: UserUpdateProfileDTO = req.body
        const data = await userService.update(payload, user)
        success(res, data)
      } else {
        wrong_credentials(res)
      }
    } catch (error) {
      return_error(error, res)
    }
  }
  async changeUserPassword(req: Request, res: Response) {
    try {
      const user = req.user
      if (user) {
        const payload: UserChangePasswordDTO = req.body
        const data = await userService.changePassword(payload, user)
        success(res, data)
      } else {
        wrong_credentials(res)
      }
    } catch (error) {
      return_error(error, res)
    }
  }
}
