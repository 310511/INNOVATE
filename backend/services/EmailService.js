// import nodemailer from 'nodemailer';
// import { configDotenv } from 'dotenv';
// configDotenv();

// class EmailService {
//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: process.env.EMAIL_SERVICE || 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
//   }

//   async sendOtp(email, otp) {
//     const mailOptions = {
//       from: `"InnovativePitch" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: '🔐 Your Verification Code',
//       html: `
//         <div style="font-family: sans-serif; max-width: 600px; margin: 20px auto;">
//           <h2>Hello!</h2>
//           <p>Here's your 6-digit verification code for InnovativePitch:</p>
//           <div style="text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold;">
//             ${otp}
//           </div>
//           <p>This code expires in <strong>2 minutes</strong>.</p>
//           <p>If you didn’t request this, please ignore this email.</p>
//           <hr/>
//           <p>— InnovativePitch Team</p>
//         </div>
//       `,
//     };

//     return this.transporter.sendMail(mailOptions);
//   }
// }

//  export default new EmailService();

import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendOtp(email, otp) {
    const mailOptions = {
      from: `"InnovativePitch" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "🔐 Your Verification Code",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 20px auto;">
          <h2>Hello!</h2>
          <p>Here's your 6-digit verification code for InnovativePitch:</p>
          <div style="text-align: center; margin: 20px 0; font-size: 24px; font-weight: bold;">
            ${otp}
          </div>
          <p>This code expires in <strong>2 minutes</strong>.</p>
          <p>If you didn’t request this, please ignore this email.</p>
          <hr/>
          <p>— InnovativePitch Team</p>
        </div>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}

export default new EmailService();
