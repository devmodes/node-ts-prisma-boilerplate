import { me, signin, signup } from "@controllers/auth.controller";
import { controller } from "@controllers/index";
import { authMiddleware } from "@middlewares/auth.middleware";
import { SigninSchema, SignupSchema } from "@schema/auth.schema";
import { validate } from "@utils/validate";
import { Router } from "express";

const router = Router();

router.post("/signup", [validate(SignupSchema)], controller(signup));
router.post("/signin", [validate(SigninSchema)], controller(signin));
router.get("/me", [authMiddleware], controller(me));

export default router;
