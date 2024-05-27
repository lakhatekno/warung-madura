const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// CRUD untuk tabel 'gudang'
// Create
app.post('/gudang', (req, res) => {
  const { id_barang, nama_barang, stok, harga_jual } = req.body;
  const query = 'INSERT INTO gudang (id_barang, nama_barang, stok, harga_jual) VALUES (?, ?, ?, ?)';
  db.query(query, [id_barang, nama_barang, stok, harga_jual], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

// Read
app.get('/gudang', (req, res) => {
  const query = 'SELECT * FROM gudang';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Update
app.put('/gudang/:id', (req, res) => {
  const { id } = req.params;
  const { nama_barang, stok, harga_jual } = req.body;
  const query = 'UPDATE gudang SET nama_barang = ?, stok = ?, harga_jual = ? WHERE id_barang = ?';
  db.query(query, [nama_barang, stok, harga_jual, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Record updated successfully' });
  });
});

// Delete
app.delete('/gudang/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM gudang WHERE id_barang = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  });
});

// CRUD untuk tabel 'transaksi'
// Create
app.post('/transaksi', (req, res) => {
  const { id_transaksi, tanggal_waktu, total_harga, metode_pembayaran } = req.body;
  const query = 'INSERT INTO transaksi (id_transaksi, tanggal_waktu, total_harga, metode_pembayaran) VALUES (?, ?, ?, ?)';
  db.query(query, [id_transaksi, tanggal_waktu, total_harga, metode_pembayaran], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

// Read
app.get('/transaksi', (req, res) => {
  const query = 'SELECT * FROM transaksi';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Update
app.put('/transaksi/:id', (req, res) => {
  const { id } = req.params;
  const { tanggal_waktu, total_harga, metode_pembayaran } = req.body;
  const query = 'UPDATE transaksi SET tanggal_waktu = ?, total_harga = ?, metode_pembayaran = ? WHERE id_transaksi = ?';
  db.query(query, [tanggal_waktu, total_harga, metode_pembayaran, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Record updated successfully' });
  });
});

// Delete
app.delete('/transaksi/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM transaksi WHERE id_transaksi = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  });
});

// CRUD untuk tabel 'barang_terjual'
// Create
app.post('/barang_terjual', (req, res) => {
  const { id_transaksi, id_barang, qty, total_harga } = req.body;
  const query = 'INSERT INTO barang_terjual (id_transaksi, id_barang, qty, total_harga) VALUES (?, ?, ?, ?)';
  db.query(query, [id_transaksi, id_barang, qty, total_harga], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

// Read
app.get('/barang_terjual', (req, res) => {
  const query = 'SELECT * FROM barang_terjual';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Update
app.put('/barang_terjual/:id_transaksi/:id_barang', (req, res) => {
  const { id_transaksi, id_barang } = req.params;
  const { qty, total_harga } = req.body;
  const query = 'UPDATE barang_terjual SET qty = ?, total_harga = ? WHERE id_transaksi = ? AND id_barang = ?';
  db.query(query, [qty, total_harga, id_transaksi, id_barang], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Record updated successfully' });
  });
});

// Delete
app.delete('/barang_terjual/:id_transaksi/:id_barang', (req, res) => {
  const { id_transaksi, id_barang } = req.params;
  const query = 'DELETE FROM barang_terjual WHERE id_transaksi = ? AND id_barang = ?';
  db.query(query, [id_transaksi, id_barang], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
