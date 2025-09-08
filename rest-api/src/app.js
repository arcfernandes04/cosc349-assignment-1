const express = require('express');
const cors = require('cors');
const sql = require('mysql2/promise');

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:" + process.env.CLIENT_PORT
}));

// Connection set up
successfulConnection = false;

let db;

const connectionConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, 
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

async function connectWithRetry(maxRetries = 10, delay = 2000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const connection = await sql.createConnection(connectionConfig);

      console.log(`Attempt ${attempt}: DB connection successful`);
      return connection;
    } catch (err) {
      console.error(`Attempt ${attempt}: Error connecting to database: ${err.stack}`);
      if (attempt < maxRetries) {
        console.log(`Waiting ${delay / 1000}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw new Error('Max retries reached. Could not connect.');
      }
    }
  }
}

connectWithRetry()
  .then(conn => {
    db = conn;
  })
  .catch(err => {
    console.error('Unexpected error during connection:', err);
  });

// End point definitions
app.get("/inventory", async (req, res) => {

    try {
        results = await db.execute(`
            SELECT item_id, item_name, item_rental_price, item_quantity
            FROM item
            `);
        res.json(results[0]);
    }catch (err) {
        console.error(`Error executing query: ${err.stack}`);
        res.status(500);
    }
});

app.post("/item", async (req, res) => {
    const { item_name, item_rental_price, item_quantity, warehouse_id } = req.body;

    try { 
        const [result] = await db.execute('INSERT INTO item (item_name, item_rental_price, item_quantity) values(?,?,?)', [item_name, item_rental_price, item_quantity]);
        res.status(201).json({ message: 'Item created successfully', item_id: result.insertId });
    }catch (err) {
        console.error('Insert error:', err);
        res.status(500);
    }
})


// Listening for reqs
app.listen(process.env.API_PORT, () => {
    console.log("Server listening on port: ", process.env.API_PORT);
});
