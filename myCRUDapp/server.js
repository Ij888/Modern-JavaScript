const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY 
    
AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    
    )
    `);

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            //res.status(500).json({ error: err.message });
            console.error(err);
        } else {
            res.json(rows);
            //message: 'success',
            //data: rows
        }
    });
});

///@@@@@@@@@@@@@@@@@@@@@@@///

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
    if (err) {
      console.error(err);
    } else {
      res.json({ message: 'User created successfully' });
    }
  });
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
    if (err) {
      console.error(err);
    } else {
      res.json({ message: 'User updated successfully' });
    }
  });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err);
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
