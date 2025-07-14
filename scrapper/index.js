let express = require('express');
let cors = require('cors');
let fs = require("fs")
let app = express();
app.use(cors());
let port = 3000;


// Read and parse JSON data
const data = fs.readFileSync("data_id_categorized.json");
const products = JSON.parse(data);

// Endpoint to get all products
app.get("/products", async (req, res) => {
    console.log("📥 GET /products triggered");
    res.status(200).json(products);
})

// Endpoint to get all products in a specific category
app.get("/products/:category", async (req, res) => {
    const category = req.params.category
    // filter by category
    const filter = products.filter((product) => {
        return product.category === category
    })
    res.status(200).json(filter);
})

// Start server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
})