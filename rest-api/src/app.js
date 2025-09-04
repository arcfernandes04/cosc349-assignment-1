const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:4200"
}));

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT);
});


app.get("/equipment", (req, res) => {
    res.send({"name": "Light 1", "Description": "This is a test light"});
})
