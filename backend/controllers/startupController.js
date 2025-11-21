import { pool } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { s3 } from "../config/s3.js";



const storage = multer.memoryStorage();
export const upload = multer({ storage });



export const createStartup = async (req, res) => {
  try {
    const { user_id, org_name, industry_type, website_url } = req.body;

    if (!user_id || !org_name) {
      return res.status(400).json({
        error: "user_id and org_name are required fields"
      });
    }

    const org_id = uuidv4();
    const created_at = new Date();
    const updated_at = new Date();

    const query = `
      INSERT INTO startups (
        org_id, user_id, org_name, industry_type, website_url, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      org_id,
      user_id,
      org_name,
      industry_type || null,
      website_url || null,
      created_at,
      updated_at
    ];

    const result = await pool.query(query, values);

    return res.status(201).json({
      message: "Startup created successfully",
      startup: result.rows[0]
    });
  } catch (error) {
    console.error("Error creating startup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadPitchDeck = async (req, res) => {
  try {
    const { org_id } = req.body;

    if (!org_id) {
      return res.status(400).json({ error: "org_id is required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const file = req.file;

    
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `pitch-decks/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read"
    };

    
    const uploadResult = await s3.upload(params).promise();
    const fileUrl = uploadResult.Location;

    
    const query = `
      UPDATE startups 
      SET pitch_deck_url = $1, updated_at = NOW()
      WHERE org_id = $2
      RETURNING *;
    `;

    const values = [fileUrl, org_id];

    const result = await pool.query(query, values);

    return res.status(200).json({
      message: "Pitch deck uploaded successfully",
      file_url: fileUrl,
      startup: result.rows[0]
    });

  } catch (error) {
    console.error("Pitch deck upload error:", error);
    return res.status(500).json({
      error: "Internal server error",
      detail: error.message
    });
  }
};





export const getStartupsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;  

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    const query = `
      SELECT *
      FROM startups
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query, [user_id]);

    return res.status(200).json({
      message: "Startups fetched successfully",
      startups: result.rows   
    });

  } catch (error) {
    console.error("Get startups error:", error);
    return res.status(500).json({
      error: "Internal server error",
      detail: error.message
    });
  }
};


export const getStartupsByOrg = async (req, res) => {
  try {
    const { org_id } = req.params;  

    if (!org_id) {
      return res.status(400).json({ error: "org_id is required" });
    }

    const query = `
      SELECT *
      FROM startups
      WHERE org_id = $1
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query, [org_id]);

    return res.status(200).json({
      message: "Startups fetched successfully",
      startups: result.rows   
    });

  } catch (error) {
    console.error("Get startups by org error:", error);
    return res.status(500).json({
      error: "Internal server error",
      detail: error.message
    });
  }
};
