import express from "express";
import { validation } from "../../middleware";
import { controllerHandler } from "../../helpers/controllerHandler";
import { UserController } from "./userController";
import { UserValidationSchema } from "./userValidation";

const router = express.Router();
const call = controllerHandler;
const User = new UserController();

router.use(validation(UserValidationSchema));

router.get("/", call(User.getUsers, (req, _res, _next) => []));

router.post("/", call(User.addUser, (req, _res, _next) => [req.body]));

export const userRouter = router;
