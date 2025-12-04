import { Router } from "express";
import { login, logout, profile, register, verifyToken } from "../controllers/auth.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router()

router
.route("/register")
.post(validateSchema(registerSchema), register)

router
.route("/login")
.post(validateSchema(loginSchema), login)

router
.route("/logout")
.post(logout)

////////////            ////////////////
router.use(validateToken)

router
.route("/verify")
.get(verifyToken)

router
.route("/profile")
.get(profile)


export default router