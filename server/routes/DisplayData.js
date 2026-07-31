const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    console.log("✅ /foodData route hit!"); // Confirm karo API hit ho rahi hai

    try {
        // console.log("📌 Sending foodCategory:", global.food_category);
        // console.log("📌 Sending foodItems:", global.food_items);

        res.json({
            foodCategory: global.food_category || [], 
            foodItems: global.food_items || []
        });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





module.exports = router;







// const express = require("express");
// const router = express.Router();

// // Ensure global variables are initialized
// // global.food_Items = global.food_Items || [];
// // global.food_category = global.food_category || [];

// router.post('/foodData', (req, res) => {
//     console.log("✅ /foodData route hit!");

//     try {
//         res.json({
//             foodItems: global.food_Items,
//             foodCategory: global.food_category
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;






// const express = require("express");
// const router = express.Router();

// router.post('/foodData', (req, res) => {
//     console.log("✅ /foodData route hit!");

//     try {
//             res.send([global.food_Items, global.food_category])
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;














// const express = require("express");
// const router = express.Router();

// router.post('/foodData', (req, res) => {
//     console.log("✅ /foodData route hit!");

//     try {
//         if (!global.food_items || !global.food_category) {
//             return res.status(404).json({ error: "Food data not found" });
//         }

//         // ✅ Categories ke andar sirf related food items bhejne ke liye filtering
//         const categorizedFood = global.food_category.map((category) => {
//             return {
//                 CategoryName: category.CategoryName,
//                 items: global.food_items.filter((item) => item.category === category.CategoryName)
//             };
//         });

//         console.log("📢 Sending filtered foodData:", categorizedFood);

//         res.json({ food_data: categorizedFood });

//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;













// // const express = require("express");
// // const router = express.Router();

// // router.post('/foodData', (req, res) => {
// //     console.log("✅ /foodData route hit!");

// //     try {
// //         if (!global.food_items || !global.food_category) {
// //             return res.status(404).json({ error: "Food data not found" });
// //         }

// //         // ✅ Categories ke andar sirf related food items bhejne ke liye filtering
// //         const categorizedFood = global.food_category.map((category) => {
// //             return {
// //                 CategoryName: category.CategoryName,
// //                 items: global.food_items.filter((item) => item.category === category.CategoryName)
// //             };
// //         });

// //         console.log("📢 Sending filtered foodData:", categorizedFood);

// //         res.json({ food_data: categorizedFood });

// //     } catch (error) {
// //         console.error("Error:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // module.exports = router;









// // const express = require("express");
// // const router = express.Router();

// // router.post('/foodData', (req, res) => {
// //     console.log("✅ /foodData route hit!");
    
// //     try {
// //         // console.log("global.food_items:", global.food_items);
// //         // console.log("global.food_category:", global.food_category);

// //         // ✅ Dono collections zaroori hain, warna error
// //         if (!global.food_items && !global.food_category) { 
// //             return res.status(404).json({ error: "Food data not found" });
// //         }

// //         // ✅ Dono collections response me bhej do
// //         res.json({ 
// //             food_items: global.food_items, 
// //             food_category: global.food_category 
// //         });

// //     } catch (error) {
// //         console.error("Error:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // module.exports = router;











// // const express = require("express");
// // const router = express.Router();

// // router.post('/foodData', (req, res) => {
// //     console.log("✅ /foodData route hit!");
    
// //     try {
// //         console.log("global.food_items:", global.food_items, global.food_category);
        
// //         if (!global.food_items && global.food_category) {
// //             return res.status(404).json({ error: "Food data not found" });
// //         }
        
// //         res.json(global.food_items, global.food_category);
// //     } catch (error) {
// //         console.error("Error:", error);
// //         res.status(500).json({ error: "Internal Server Error" });
// //     }
// // });

// // module.exports = router; // ✅ Ensure ye `router` return ho raha hai





// // const express = require("express");
// // const router = express.Router();


// // router.post('/foodData' , (req, res) =>{
// //     try {
// //         console.log(global.food_items);
        
// //         res.send([global.food_items])
// //     } catch (error) {
        
// //     }
// // })