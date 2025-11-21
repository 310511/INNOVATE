import {pool} from'../config/db.js';

class User {
  // Check if email exists
  static async findByEmail(email) {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  }


}

export default User;