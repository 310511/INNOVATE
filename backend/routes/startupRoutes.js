import express from "express";
import { createStartup, uploadPitchDeck, upload, getStartupsByUser, getStartupsByOrg } from "../controllers/startupController.js"

const router = express.Router();

router.post("/create", createStartup);
router.post("/upload-pitchdeck",  upload.single("file"), uploadPitchDeck);

router.get("/user/:user_id", getStartupsByUser);
router.get("/startup/:org_id", getStartupsByOrg);


export default router;
