const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});


app.get("/equipment", (req, res) => {
    res.send("test worked!");
})
