const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const mongoURI = process.env.DATABASE;

if (!mongoURI) {
    console.error("MongoURI is undefined. Make sure your .env file is properly configured.");
    process.exit(1);
}

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        const db = mongoose.connection;

        // db.once("open", async () => {
        //     try {
        //         // Database ab ready hai, ab collection fetch karein
        //         const fetched_foodItems = db.db.collection("food_items");
        //         const foodItemsData = await fetched_foodItems.find({}).toArray();
        //         console.log("Fetched Food Items:", foodItemsData);
        //     } catch (error) {
        //         console.error("Error fetching data:", error);
        //     }
        // });

        db.once("open", async () => {
            try {
                // Database ab ready hai, ab collection fetch karein
                const fetched_foodCategory = db.db.collection("food_category");
                const foodCategoryData = await fetched_foodCategory.find({}).toArray();
                console.log("Fetched Food Items:", foodCategoryData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        });


    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

module.exports = mongoDB;
