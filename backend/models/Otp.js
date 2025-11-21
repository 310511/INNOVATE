class Otp {
  constructor() {
    this.store = {}; // { email: { code, expiresAt } }
  }

  set(email, code, ttl = 120_000) { // 2 mins in ms
    this.store[email] = {
      code,
      expiresAt: Date.now() + ttl,
    };
  }

  get(email) {
    const record = this.store[email];
    if (!record) return null;
    
    if (Date.now() > record.expiresAt) {
      delete this.store[email]; // auto-expire
      return null;
    }
    return record;
  }

  delete(email) {
    delete this.store[email];
  }

  isValid(email, code) {
    const record = this.get(email);
    return record && record.code === code;
  }
}

export default  new Otp(); // singleton