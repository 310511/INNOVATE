import express from "express";
import { createSession, getSessions, upload } from "../controllers/sessionController.js"

const router = express.Router();

router.post( "/create",  upload.single("video"),  createSession);

router.get("/get-sessions", getSessions);



export default router;
