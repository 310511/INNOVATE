import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";



export const createScore = async (req, res) => {
  try {
    const {
      org_id,
      user_id,
      video_id,
      judge_score_1,
      judge_score_2,
      judge_score_3,
      judge_score_4,
      judge_score_5,
      sentiment_analysis_scoring,
      feedback
    } = req.body;

    
    if (!org_id || !user_id || !video_id) {
      return res.status(400).json({ error: "org_id, user_id, and video_id are required" });
    }

    
    const js1 = Number(judge_score_1);
    const js2 = Number(judge_score_2);
    const js3 = Number(judge_score_3);
    const js4 = Number(judge_score_4);
    const js5 = Number(judge_score_5);
    const sentimentRaw = Number(sentiment_analysis_scoring);

    
    const judgeAverage = (js1 + js2 + js3 + js4 + js5) / 5;

    
    const judgeShare = (judgeAverage / 10) * 80;

    
    const sentimentScore = ((sentimentRaw + 1) / 2) * 10;

    
    const sentimentShare = (sentimentScore / 10) * 20;

    
    const totalScore = judgeShare + sentimentShare;

    
    let ipScore = "";
    if (totalScore >= 90) ipScore = "Excellent";
    else if (totalScore >= 80) ipScore = "Very Good";
    else if (totalScore >= 70) ipScore = "Good";
    else if (totalScore >= 60) ipScore = "Below Average";
    else ipScore = "Very Weak";

    const score_id = uuidv4();
    const created_at = new Date();

    const query = `
      INSERT INTO scores (
        score_id, org_id, user_id, video_id,
        judge_score_1, judge_score_2, judge_score_3, judge_score_4, judge_score_5,
        sentiment_analysis_scoring, total_score, ip_score, feedback, created_at
      )
      VALUES ($1, $2, $3, $4,
              $5, $6, $7, $8, $9,
              $10, $11, $12, $13, $14)
      RETURNING *;
    `;

    const values = [
      score_id,
      org_id,
      user_id,
      video_id,
      js1,
      js2,
      js3,
      js4,
      js5,
      sentimentRaw,
      totalScore,
      ipScore,
      feedback || null,
      created_at
    ];

    const result = await pool.query(query, values);

    return res.status(201).json({
      message: "Score created successfully",
      score: result.rows[0]
    });

  } catch (error) {
    console.error("Score creation error:", error);
    return res.status(500).json({
      error: "Internal server error",
      detail: error.message
    });
  }
};





export const getScores = async (req, res) => {
  try {
    const { org_id, video_id, user_id } = req.query;

    
    if (!org_id && !video_id && !user_id) {
      return res.status(400).json({
        error: "Provide at least one filter: org_id, video_id, or user_id"
      });
    }

    let query = "SELECT * FROM scores WHERE ";
    const values = [];
    let conditions = [];

 
    if (org_id) {
      conditions.push(`org_id = $${values.length + 1}`);
      values.push(org_id);
    }

    if (video_id) {
      conditions.push(`video_id = $${values.length + 1}`);
      values.push(video_id);
    }

    if (user_id) {
      conditions.push(`user_id = $${values.length + 1}`);
      values.push(user_id);
    }

    query += conditions.join(" OR ");
    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    return res.status(200).json({
      message: "Scores fetched successfully",
      scores: result.rows
    });

  } catch (error) {
    console.error("Get scores error:", error);
    return res.status(500).json({
      error: "Internal server error",
      detail: error.message
    });
  }
};
