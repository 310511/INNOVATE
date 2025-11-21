import { pool } from "../config/db.js";

const getUserById = async (req, res) => {
    const { user_id } = req.params; 
    try {
       
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]); 
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { getUserById };
