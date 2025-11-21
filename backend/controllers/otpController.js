import User from '../models/User.js';
import OtpService from "../services/OtpServices.js";
import EmailService from "../services/EmailService.js";

export  const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Generate & store OTP
    const otp = OtpService.generate();
    OtpService.store(email, otp);

    // Send email
    await EmailService.sendOtp(email, otp);

    res.json({ message: 'OTP sent successfully!' });
  } catch (err) {
    console.error('❌ OTP send error:', err);
    res.status(500).json({ error: 'Failed to send OTP. Please try again.' });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  try {
    if (OtpService.consume(email, otp)) {
      return res.json({ message: 'OTP verified successfully!' });
    }
    res.status(400).json({ error: 'Invalid or expired OTP' });
  } catch (err) {
    console.error('❌ OTP verify error:', err);
    res.status(500).json({ error: 'Verification failed. Please try again.' });
  }
};