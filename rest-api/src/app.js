const express = require('express');
const cors = require('cors');
const sql = require('mysql2');

const app = express();
app.use(express.json());

const db = new sql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

app.use(cors({
    origin: "http://localhost:" + process.env.CLIENT_PORT
}));

app.get("/inventory", (req, res) => {
    db.query('SELECT * FROM item', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
})

app.listen(process.env.API_PORT, () => {
    console.log("Server listening on port: ", process.env.API_PORT);
});
