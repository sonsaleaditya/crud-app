const db = require('../config/db');

// CREATE
const create = (req, res) => {
  if(!req.body) 
    return res.status(400).json({ success: false, msg: 'No data provided' }); 

  const { name, email } = req.body;
  if (!name || !email) 
    return res.status(400).json({ success: false, msg: 'All fields required' });

  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) 
      return res.status(500).json({ success: false, error: err });
    res.status(201).json({ success: true, msg: 'User created', id: result.insertId });
  });
};

// READ ALL
const getAll = (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) 
      return res.status(500).json({ success: false, error: err });
    res.status(200).json({ success: true, data: results });
  });
};

// READ ONE
const getOne = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) 
      return res.status(500).json({ success: false, error: err });
    if (results.length === 0) 
      return res.status(404).json({ success: false, msg: 'User not found' });
    res.status(200).json({ success: true, data: results[0] });
  });
};

// UPDATE
const update = (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  if (!name || !email) 
    return res.status(400).json({ success: false, msg: 'All fields required' });

  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(sql, [name, email, id], (err, result) => {
    if (err) 
      return res.status(500).json({ success: false, error: err });
    if (result.affectedRows === 0) 
      return res.status(404).json({ success: false, msg: 'User not found' });
    res.status(200).json({ success: true, msg: 'User updated' });
  });
};

// DELETE
const deleteUser = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) 
      return res.status(500).json({ success: false, error: err });
    if (result.affectedRows === 0) 
      return res.status(404).json({ success: false, msg: 'User not found' });
    res.status(200).json({ success: true, msg: 'User deleted' });
  });
};

const deleteAllUser = (req, res) => {
  db.query('DELETE FROM users', (err, result) => {
    if (err) 
      return res.status(500).json({ success: false, error: err });
    res.status(200).json({ success: true, msg: 'All users deleted' });
  });
};

module.exports = { create, getAll, getOne, update, deleteUser, deleteAllUser };
