import { pool } from "../config/db.js";
import { s3 } from "../config/s3.js";
import { v4 as uuidv4 } from "uuid";
import { getVideoDurationInSeconds } from "get-video-duration";
import multer from "multer";


const storage = multer.memoryStorage();
export const upload = multer({ storage });


export const createSession = async (req, res) => {
  try {
    const { org_id, user_id } = req.body;

    if (!org_id || !user_id) {
      return res.status(400).json({ error: "org_id and user_id are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Video file is required" });
    }

    const videoFile = req.file;

    const video_id = uuidv4();
    const created_at = new Date();

    
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `videos/${Date.now()}_${videoFile.originalname}`,
      Body: videoFile.buffer,
      ContentType: videoFile.mimetype,
      ACL: "public-read"
    };

    const uploadResult = await s3.upload(params).promise();
    const videoUrl = uploadResult.Location;

    
    const duration = await getVideoDurationInSeconds(videoFile.buffer);

    
    const query = `
      INSERT INTO sessions (
        video_id, org_id, user_id, duration, video_url, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      video_id,
      org_id,
      user_id,
      Math.floor(duration),
      videoUrl,
      created_at
    ];

    const result = await pool.query(query, values);

    return res.status(201).json({
      message: "Session created successfully",
      session: result.rows[0]
    });

  } catch (error) {
    console.error("Session upload error:", error);
    return res.status(500).json({
      error: "Internal server error",
      detail: error.message
    });
  }
};



export const getSessions = async (req, res) => {
  try {
    const { video_id, org_id, user_id } = req.query;

    
    if (!video_id && !org_id && !user_id) {
      return res.status(400).json({
        error: "Provide at least one filter: video_id, org_id, or user_id"
      });
    }

    let query = "SELECT * FROM sessions WHERE ";
    const values = [];
    let conditions = [];

    
    if (video_id) {
      conditions.push(`video_id = $${values.length + 1}`);
      values.push(video_id);
    }

    if (org_id) {
      conditions.push(`org_id = $${values.length + 1}`);
      values.push(org_id);
    }

    if (user_id) {
      conditions.push(`user_id = $${values.length + 1}`);
      values.push(user_id);
    }

    
    query += conditions.join(" OR ");
    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, values);

    return res.status(200).json({
      message: "Sessions fetched successfully",
      sessions: result.rows
    });

  } catch (error) {
    console.error("Get sessions error:", error);
    return res.status(500).json({
      error: "Internal server error",
      detail: error.message
    });
  }
};

