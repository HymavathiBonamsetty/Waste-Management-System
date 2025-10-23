import express from "express";
import db from "../utils/db.js"; // your db connection file
const router = express.Router();

// Get all collections with collector/category names
router.get("/", (req, res) => {
  const sql = `
    SELECT c.id, col.name AS collector_name, cat.name AS category_name,
           c.waste_amount, c.collection_date, c.status
    FROM collection c
    JOIN collector col ON c.collector_id = col.id
    JOIN category cat ON c.category_id = cat.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

// Add new collection
router.post("/add", (req, res) => {
  const { collector_id, category_id, waste_amount, collection_date, status } = req.body;
  const sql = `
    INSERT INTO collection (collector_id, category_id, waste_amount, collection_date, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [collector_id, category_id, waste_amount, collection_date, status], (err) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true });
  });
});

// Get collection by id
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM collection WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result[0] });
  });
});

// Update collection
router.put("/edit/:id", (req, res) => {
  const { collector_id, category_id, waste_amount, collection_date, status } = req.body;
  const sql = `
    UPDATE collection SET collector_id=?, category_id=?, waste_amount=?, collection_date=?, status=?
    WHERE id=?
  `;
  db.query(sql, [collector_id, category_id, waste_amount, collection_date, status, req.params.id], (err) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true });
  });
});

// Delete collection
router.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM collection WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true });
  });
});

export const collectionRouter = router;
