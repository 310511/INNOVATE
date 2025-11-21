import express from "express";
import { createScore, getScores } from "../controllers/scoreController.js" 

const router = express.Router();

router.post("/create", createScore);

router.get("/scores", getScores);




export default router;