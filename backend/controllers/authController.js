import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import { OAuth2Client } from "google-auth-library";
import { config } from "dotenv";
import axios from "axios";

config();

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET  = process.env.GOOGLE_CLIENT_SECRET;
const Redirect_Url = process.env.GOOGLE_REDIRECT_URI;
const client = new OAuth2Client(CLIENT_ID,
  CLIENT_SECRET, 
  Redirect_Url);

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI;
const LINKEDIN_OAUTH_URL = process.env.LINKEDIN_OAUTH_URL || "https://www.linkedin.com/oauth/v2/authorization";
const LINKEDIN_TOKEN_URL = process.env.LINKEDIN_TOKEN_URL || "https://www.linkedin.com/oauth/v2/accessToken";
const LINKEDIN_USER_INFO_URL = process.env.LINKEDIN_USER_INFO_URL || "https://api.linkedin.com/v2/userinfo";


const isValidGooglePayload = (payload) => {
  const validIssuers = ["https://accounts.google.com", "accounts.google.com"];
  return (
    payload &&
    validIssuers.includes(payload.iss) &&
    payload.email_verified === true &&
    payload.email
  );
};

export const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number } = req.body;
    console.log("req",req.body)

    if (!first_name || !last_name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (existUser.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const insertResult = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, phone_number, provider)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        phone_number,
        password ? "local" : "google",
      ]
    );

    const user = insertResult.rows[0];

    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    if (!user.password) {
      return res.status(403).json({
        message: "This account uses Google Login. No password set.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


export const googleAuth = async (req, res) => {
  const { code } = req.body; 

  // console.log("code",code);
  
  // console.log("client idhshdkhHDSidojOD", CLIENT_ID)
  // console.log("client idhshdkhHDSidojOD", CLIENT_SECRET)

  if (!code) {
    return res.status(400).json({ message: "Authorization code required" });
  }

  try {
    // 🔁 Exchange auth code for tokens server-side
    const { tokens } = await client.getToken(code);
    const idToken = tokens.id_token;

    if (!idToken) {
      return res.status(400).json({ message: "No ID token in response from Google" });
    }

    
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!isValidGooglePayload(payload)) {
      return res
        .status(400)
        .json({ message: "Invalid or unverified Google token" });
    }
    console.log("payload", payload)

    const { email, given_name, family_name, name } = payload;

    const firstName = given_name || name?.split(" ")[0] || "User";
    const lastName = family_name || name?.split(" ").slice(1).join(" ") || "";

    // DB logic unchanged
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    let user = result.rows[0];

    if (!user) {
      const insert = await pool.query(
        `INSERT INTO users (first_name, last_name, email, provider)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [firstName, lastName, email, "google"]
      );
      user = insert.rows[0];
    } else if (user.provider !== "google") {
      return res.status(403).json({
        message:
          "This email is registered with password login. Use email/password to sign in.",
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Authentication successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Google Auth Error:", error);

    // More precise error handling
    if (error.response?.status === 400 && error.message?.includes("invalid_grant")) {
      return res.status(400).json({ message: "Invalid or expired authorization code" });
    }
    if (error.message?.includes("Token used too late") || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Google session expired. Try again." });
    }
    if (error.message?.includes("verification failed")) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    res.status(500).json({ message: "Authentication failed" });
  }
};


// export const googleAuth = async (req, res) => {
//   const { token: idToken } = req.body;

//   if (!idToken) {
//     return res.status(400).json({ message: "ID token required" });
//   }

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken,
//       audience: CLIENT_ID,
//     });

//     const payload = ticket.getPayload();

//     if (!isValidGooglePayload(payload)) {
//       return res
//         .status(400)
//         .json({ message: "Invalid or unverified Google token" });
//     }

//     const { email, given_name, family_name, name } = payload;

//     // Safe fallbacks for names
//     const firstName = given_name || name?.split(" ")[0] || "User";
//     const lastName = family_name || name?.split(" ").slice(1).join(" ") || "";

//     // Check existing user
//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);
//     let user = result.rows[0];

//     if (!user) {
//       // Create new Google user
//       const insert = await pool.query(
//         `INSERT INTO users (first_name, last_name, email, provider)
//          VALUES ($1, $2, $3, $4)
//          RETURNING *`,
//         [firstName, lastName, email, "google"]
//       );
//       user = insert.rows[0];
//     } else if (user.provider !== "google") {
//       return res.status(403).json({
//         message:
//           "This email is registered with password login. Use email/password to sign in.",
//       });
//     }

//     // Issue JWT
//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({
//       message: "Authentication successful",
//       token,
//       user: {
//         id: user.id,
//         firstName: user.first_name,
//         lastName: user.last_name,
//         email: user.email,
//         provider: user.provider,
//       },
//     });
//   } catch (error) {
//     console.error("Google Auth Error:", error);
//     if (
//       error.message?.includes("Token used too late") ||
//       error.name === "TokenExpiredError"
//     ) {
//       return res
//         .status(401)
//         .json({ message: "Google session expired. Try again." });
//     }
//     if (error.message?.includes("verification failed")) {
//       return res.status(401).json({ message: "Invalid Google token" });
//     }
//     res
//       .status(500)
//       .json({ message: "Authentication failed", error });
//   }
// };

//linkedin
export const linkedinLogin = (req, res) => {
  const scope = "openid profile email";
  const state = crypto.randomUUID();
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    LINKEDIN_REDIRECT_URI
  )}&state=${state}&scope=${encodeURIComponent(scope)}`;


  res.redirect(authUrl);
};

// Step 2: Handle callback after user auth
export const linkedinCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ message: "Authorization code missing" });
  }

  try {
  
    const tokenResponse = await axios.post(
      LINKEDIN_TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: LINKEDIN_REDIRECT_URI,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const access_token = tokenResponse.data.access_token;

   
    const userInfo = await axios.get(LINKEDIN_USER_INFO_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { sub, given_name, family_name, email, picture, name } =
      userInfo.data;

   //console.log("userIngo", userInfo);
    console.log("name", name);
    console.log("family_name", family_name);

   
    const existUser = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    let user;
    if (existUser.rows.length > 0) {
      user = existUser.rows[0];
    } else {
      const result = await pool.query(
        `INSERT INTO users (first_name, last_name, email, provider)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [given_name, family_name, email, "linkedin"]
      );
      user = result.rows[0];
    }

    // Create JWT
    const token = jwt.sign({ id: user.user_id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const userString = encodeURIComponent(JSON.stringify(user));

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    return res.redirect(
      `${frontendUrl}/auth/linkedin-success?token=${token}&user=${userString}`
    );
  } catch (error) {
    console.log("LinkedIn Auth Error:", error);
    return res.status(500).json({ message: "LinkedIn login failed" });
  }
};
