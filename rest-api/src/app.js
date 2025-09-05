const express = require('express');
const cors = require('cors');
const sql = require('mysql2');

const app = express();
app.use(express.json());

const db = new sql.createConnection({
    host: "database",
    port: 3306, 
    user: "root",
    password: "test",
    database: "cosc349_db",
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

app.use(cors({
    origin: "http://localhost:4200"
}));

const PORT = 3000;



app.get("/equipment", (req, res) => {
    // res.send({"name": "Light 1", "Description": "This is a test light"});
    db.query('SELECT * FROM equipment', (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(results);
    });
})

app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});
