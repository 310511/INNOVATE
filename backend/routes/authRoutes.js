import { Router } from "express";
import { signup, login, googleAuth,linkedinLogin,linkedinCallback } from "../controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.post('/google', googleAuth);
router.get("/linkedin", linkedinLogin);
router.get("/linkedin/callback", linkedinCallback);

export default router;
