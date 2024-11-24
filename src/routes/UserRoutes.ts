import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const userController = new UserController();

router.post('/register', userController.registerUser.bind(userController))
router.post('/login', userController.loginUser.bind(userController))
router.post('/forget-password', userController.forgetPassword.bind(userController))
router.put('/', authMiddleware, userController.updateUser.bind(userController))
router.put('/password', authMiddleware, userController.changeUserPassword.bind(userController))
router.get('/detail', authMiddleware, userController.detailUser.bind(userController)) // apply the middleware here

export default router