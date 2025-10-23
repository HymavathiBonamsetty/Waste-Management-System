import jwt from "jsonwebtoken";
import express from "express";
import con from "../utils/db.js"; // MySQL connection
import bcrypt from "bcrypt";
import multer from "multer"; // For file uploads
import path from "path";

const router = express.Router();

// ==========================
// Add new admin (password hashed)
// ==========================
router.post("/add_admin", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ Status: false, Error: "Name, email, and password required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // hash password
    const sql = "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)";
    con.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.json({ Status: false, Error: "Email already exists" });
        }
        return res.json({ Status: false, Error: err });
      }
      return res.json({ Status: true, Message: "Admin added successfully" });
    });
  } catch (err) {
    return res.json({ Status: false, Error: "Error hashing password" });
  }
});

// ==========================
// Admin login
// Supports both plaintext (old) and hashed passwords
// ==========================
router.post("/adminlogin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ loginStatus: false, Error: "Email and password required" });
  }

  const sql = "SELECT * FROM admin WHERE email = ?";
  con.query(sql, [email], async (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Database query error" });
    if (result.length === 0) {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }

    const dbPassword = result[0].password;

    try {
      // Try bcrypt comparison first
      const isMatch = await bcrypt.compare(password, dbPassword);
      if (isMatch) {
        const token = jwt.sign(
          { role: "admin", email: result[0].email, id: result[0].id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie("token", token, { httpOnly: true });
        return res.json({ loginStatus: true });
      }

      // If bcrypt fails, fallback to plaintext (for old passwords)
      if (password === dbPassword) {
        const token = jwt.sign(
          { role: "admin", email: result[0].email, id: result[0].id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie("token", token, { httpOnly: true });
        return res.json({ loginStatus: true });
      }

      return res.json({ loginStatus: false, Error: "Wrong password" });
    } catch (error) {
      console.error("Login error:", error);
      return res.json({ loginStatus: false, Error: "Authentication error" });
    }
  });
});

// ==========================
// Get all admins
// ==========================
router.get("/all_admins", (req, res) => {
  const sql = "SELECT id, name, email FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

// ==========================
// Admin logout
// ==========================
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true, Message: "Logged out successfully" });
});


// Total admins
router.get("/admin_count", (req, res) => {
  const sql = "SELECT COUNT(id) AS admin FROM admin";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

// Total collectors
router.get("/collector_count", (req, res) => {
  const sql = "SELECT COUNT(id) AS collector FROM collector";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

// Total waste collected
router.get("/waste_count", (req, res) => {
  const sql = "SELECT SUM(waste_amount) AS totalWaste FROM collection";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

// List of collectors with category name
router.get("/collector_records", (req, res) => {
  const sql = `
    SELECT col.id, col.name, col.email, col.address, col.salary,
           cat.name AS category_name
    FROM collector col
    LEFT JOIN category cat ON col.category_id = cat.id
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

// Delete collector
router.delete("/delete_collector/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM collector WHERE id=?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true });
  });
});


// ✅ Setup multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// ➕ Add collector
router.post("/add_collector", upload.single("image"), (req, res) => {
  const { name, email, password, address, salary, category_id } = req.body;

  if (!name || !email || !password || !address || !salary || !category_id) {
    return res.json({ Status: false, Error: "All fields are required" });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const image = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO collector (name, email, password, address, salary, category_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  con.query(
    sql,
    [name, email, hashedPassword, address, salary, category_id, image],
    (err, result) => {
      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true, Message: "Collector added successfully" });
    }
  );
});

// Edit collector
router.put("/edit_collector/:id", upload.single("image"), (req, res) => {
  const { name, email, address, salary, category_id } = req.body;
  const collectorId = req.params.id;

  // Check if a new image was uploaded
  let sql, values;
  if (req.file) {
    sql =
      "UPDATE collector SET name=?, email=?, address=?, salary=?, category_id=?, image=? WHERE id=?";
    values = [name, email, address, salary, category_id, req.file.filename, collectorId];
  } else {
    sql =
      "UPDATE collector SET name=?, email=?, address=?, salary=?, category_id=? WHERE id=?";
    values = [name, email, address, salary, category_id, collectorId];
  }

  con.query(sql, values, (err) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true });
  });
});



export { router as adminRouter };
