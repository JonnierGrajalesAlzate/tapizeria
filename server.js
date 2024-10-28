const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const db = new sqlite3.Database('./catalogo_sofas.db'); 

app.use(cors()); 
app.use(bodyParser.json());
app.use(express.static('public'));
app.post('/productos', (req, res) => {
    const { titulo, imagen, precio } = req.body;
    db.run(`INSERT INTO productos (titulo, imagen, precio) VALUES (?, ?, ?)`, [titulo, imagen, precio], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(201).json({ id: this.lastID });
    });
});


app.get('/productos', (req, res) => {
    db.all('SELECT * FROM productos', [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
