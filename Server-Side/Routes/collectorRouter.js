import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// ✅ Collector Login
router.post("/collector_login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM collector WHERE email=?";
  con.query(sql, [email], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Database query error" });

    if (result.length === 0)
      return res.json({ Status: false, Error: "Wrong email or password" });

    const collector = result[0];
    bcrypt.compare(password, collector.password, (err, isMatch) => {
      if (err || !isMatch)
        return res.json({ Status: false, Error: "Wrong email or password" });

      const token = jwt.sign(
        { role: "collector", email: collector.email, id: collector.id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );

      res.cookie("token", token, { httpOnly: true });
      return res.json({ Status: true, id: collector.id, name: collector.name });
    });
  });
});

// ✅ Get Collector Detail (with category)
router.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT col.id, col.name, col.email, col.address, col.salary, col.image,
           col.category_id, cat.name AS category_name
    FROM collector col
    LEFT JOIN category cat ON col.category_id = cat.id
    WHERE col.id = ?
  `;
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Database query error" });
    if (result.length === 0)
      return res.json({ Status: false, Error: "Collector not found" });
    return res.json({ Status: true, Result: result[0] });
  });
});

// ✅ Collector Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true, Message: "Logged out successfully" });
});

export { router as collectorRouter };
