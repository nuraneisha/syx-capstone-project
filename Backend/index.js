import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
import multer from "multer"
import Stripe from 'stripe';


let app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const { PORT } = process.env || 3001;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

let pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
    {
        rejectUnauthorized: false
    }
})

//✅store file in memory 
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/uploads", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        //file.buffer contains the file in memory(Buffer)
        console.log("File received in memory:", file.originalname);
        console.log("Size", file.size, "bytes");

        // Read the JSON file
        const text = req.file.buffer.toString("utf-8");
        const data = JSON.parse(text);

        // Keywords map
        const categoryKeywords = {
            Tops: ["tee", "shirt", "jacket", "hoodie", "suit set", "jersey", "sleeveless"],
            Bottoms: ["jeans", "short", "jorts", "brief", "underwear", "pants"],
            Apparel: ["cap", "hat", "sock", "bag", "totebag", "chain", "keychain", "case", "belt", "bandana"],
        };

        // Categorize each item and add ID + category
        const categorized = data.map((item, index) => {
            const title = item.Title.toLowerCase() || "";
            let category = "Uncategorized";

            for (const [mainCategory, keywords] of Object.entries(categoryKeywords)) {
                if (keywords.some((k) => title.includes(k))) {
                    category = mainCategory;
                    break;
                }
            }


            return {
                prod_id: index + 1,
                prod_name: item.Title?.trim(),
                prod_education: item.Education?.trim(),
                prod_education1: item.Education1?.trim(),
                prod_content: item.Content?.trim(),
                prod_price: item.Price?.trim() || item.Price2?.trim() || "0",
                prod_category: category



            };
        });

        let insertCount = 0;

        //will handle the duplicate
        for (const item of categorized) {
            const insertQuery = `INSERT INTO product(prod_id,prod_name,prod_education,prod_education1,prod_content,prod_price,prod_category,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,NOW()) ON CONFLICT (prod_id) DO UPDATE SET 
            prod_name = EXCLUDED.prod_name,
            prod_education = EXCLUDED.prod_education,
            prod_education1 = EXCLUDED.prod_education1,
            prod_content = EXCLUDED.prod_content,
            prod_price =EXCLUDED.prod_price,
            prod_category = EXCLUDED.prod_category
            WHERE
            product.prod_name IS DISTINCT FROM EXCLUDED.prod_name OR
            product.prod_education IS DISTINCT FROM EXCLUDED.prod_education OR
            product.prod_education1 IS DISTINCT FROM EXCLUDED.prod_education1 OR
            product.prod_content IS DISTINCT FROM EXCLUDED.prod_content OR
            product.prod_price IS DISTINCT FROM EXCLUDED.prod_price OR
            product.prod_category IS DISTINCT FROM EXCLUDED.prod_category`;

            const values = [
                item.prod_id,
                item.prod_name,
                item.prod_education,
                item.prod_education1,
                item.prod_content,
                item.prod_price,
                item.prod_category
            ];

            await pool.query(insertQuery, values);
            insertCount++;
        }
        res.json({
            message: `File processed successfully. ${insertCount} products inserted.`,
        });

    }
    catch (error) {
        console.error("Failed to process file:", error)
        return res.status(400).json({ error: "Invalid file format or JSON" });
    }
});

// ✅get all products
//Eg: /products
app.get("/products", async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT*FROM product")
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Failed to select all product:", error)
        return res.status(400).json({ error: error.message });
    }
    finally {
        client.release();
    }
})

// ✅ get all products in a specific category
//Eg: /products/Apparel
app.get("/products/category/:category", async (req, res) => {

    const client = await pool.connect();
    try {
        const category = req.params.category;
        const result = await client.query("SELECT * FROM product WHERE prod_category = $1", [category]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Failed to get category:", error);
        res.status(400).json({ error: error.message });
    } finally {
        client.release();
    }
});

// ✅get specific product
//Eg: /products/1
app.get("/products/:prod_id", async (req, res) => {

    const client = await pool.connect();
    try {
        const prod_id = req.params.prod_id;
        console.log(prod_id);
        const result = await client.query("SELECT * FROM product WHERE prod_id = $1", [prod_id]);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to get selected products:", error);
        res.status(400).json({ error: error.message });
    } finally {
        client.release();
    }
});

// ✅  get specific product by products(exclude apparel)
//Eg:/products/card/1
app.post("/products/card/:prod_id", async (req, res) => {
    const client = await pool.connect();
    try {
        const { prod_id } = req.params;
        const { user_id, prod_name, prod_education, prod_education1, prod_price, sizes } = req.body;
        const result = await client.query(
            `INSERT INTO cart (user_id,prod_id, prod_name, prod_education, prod_education1, prod_price, sizes, created_at)
             VALUES ($1, $2, $3, $4, $5, $6,$7, NOW())
             RETURNING *`,
            [user_id, prod_id, prod_name, prod_education, prod_education1, prod_price, sizes]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to insert product into cart:", error);
        res.status(400).json({ error: error.message });
    } finally {
        client.release();
    }
});

// ✅  get specific product by apparel
//Eg:/products/apparel/1
app.post("/products/apparel/:prod_id", async (req, res) => {
    const client = await pool.connect();
    try {
        const { prod_id } = req.params;
        const { user_id, prod_name, prod_education, prod_education1, prod_price } = req.body;

        const result = await client.query(
            `INSERT INTO cart (user_id,prod_id, prod_name, prod_education, prod_education1, prod_price, created_at)
             VALUES ($1, $2, $3, $4, $5,$6, NOW())
             RETURNING *`,
            [user_id, prod_id, prod_name, prod_education, prod_education1, prod_price]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Failed to insert apparel product into cart:", error);
        res.status(400).json({ error: error.message });
    } finally {
        client.release();
    }
});


// ✅ Get cart data
app.get("/cart/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query("SELECT * FROM cart WHERE user_id = $1 ORDER BY id ASC", [userId]);
        return res.status(200).json({ items: result.rows });
    } catch (err) {
        console.error("Cart Count Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ Delete cart data
app.delete("/cart/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await pool.query("DELETE FROM cart WHERE id = $1 RETURNING *", [id]);
        const user_id = deleted.rows[0].user_id;
        const result = await pool.query("SELECT * FROM cart where user_id=$1", [user_id])
        return res.status(200).json({ items: result.rows });
    } catch (err) {
        console.error("Cart Count Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ update the select and quantity
app.put("/cart/select", async (req, res) => {
    const { selected, quantity, id } = req.body;
    try {
        const result = await pool.query("UPDATE cart SET selected = $1,quantity = $2 WHERE id = $3 RETURNING *", [selected, quantity, id]);
        console.log(result);
        return res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error("Select Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ select selected prod which are true
app.get("/cart/select/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM cart where user_id = $1 AND selected=true", [user_id]);
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error in fecthing the selected items:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ Calculate the total Cost based on the selection
app.get("/cart/checkout/:user_id", async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pool.query("SELECT SUM(quantity*REPLACE(prod_price, 'MYR', '')::NUMERIC)AS total_cost FROM cart WHERE user_id=$1 AND selected=true", [user_id]);
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error("Cart Count Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ checkout using stripe
app.post("/checkout", async (req, res) => {
    const { items } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "fpx"],
            mode: "payment",
            line_items: items.filter(item => item.selected).map(item => {
                const amount = parseFloat(item.prod_price.replace("MYR", "").replace(",", "")) * 100;

                return {
                    price_data: {
                        currency: "myr",
                        product_data: {
                            name: item.prod_name,
                            images: [item.prod_education],
                        },
                        unit_amount: Math.round(amount),
                    },
                    quantity: item.quantity || 1,
                };
            }),
            success_url: "http://localhost:5173",
            cancel_url: "http://localhost:5173/shopping",
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})
