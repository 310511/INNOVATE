import crypto from 'crypto';
import otpModel from '../models/Otp.js';

class OtpService {
  generate() {
    return crypto.randomInt(100000, 999999).toString();
  }

  store(email, code) {
    otpModel.set(email, code); 
  }

  validate(email, code) {
    return otpModel.isValid(email, code);
  }

  consume(email, code) {
    if (this.validate(email, code)) {
      otpModel.delete(email);
      return true;
    }
    return false;
  }
}

 export default  new OtpService();