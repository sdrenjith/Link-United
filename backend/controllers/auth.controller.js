const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // 1. check user exists
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result.rows[0];

    
    // 2. check password (plain for now)
    if (user.password !== password) {
     console.log(user);
      return res.status(400).json({ message: "Invalid credentials" + user + " " + password});
    }

    // 3. success
    const token = jwt.sign({id: user.id, email: user.email, role: user.role}, "secretKey", { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token: token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
