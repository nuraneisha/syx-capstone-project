const fs = require("fs");

// Read the JSON file
const raw = fs.readFileSync("data.json");
const data = JSON.parse(raw);

// Keywords map
const categoryKeywords = {
    Tops: ["tee", "shirt", "jacket", "hoodie", "suit set", "jersey", "sleeveless"],
    Bottoms: ["jeans", "short", "jorts", "brief", "underwear", "pants"],
    Apparel: ["cap", "hat", "sock", "bag", "totebag", "chain", "keychain", "case", "belt", "bandana"],
};

// Categorize each item and add ID + category
const categorized = data.map((item, index) => {
    const title = item.Title.toLowerCase();
    let category = "Uncategorized";

    for (const [mainCategory, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some((k) => title.includes(k))) {
            category = mainCategory;
            break;
        }
    }


    return {
        id: index + 1,
        ...item,
        category,
    };
});

// Save output
fs.writeFileSync("data_id_categorized.json", JSON.stringify(categorized, null, 2));
console.log("IDs and categories added successfully!");
