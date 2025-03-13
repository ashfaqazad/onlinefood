import { useState, useEffect } from "react";
import axios from "axios";
// import Slider from "./Slider";
import Cards from "./Cards";
import Footer from "./Footer";

const MenuPage = () => {
    const [foodCategory, setFoodCategory] = useState([]);
    const [foodItems, setFoodItems] = useState([]);



    const getData = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/foodData");
    
            console.clear();
            console.log("✅ API Response:", response.data);
    
            if (response.data) {
                setFoodCategory(response.data.foodCategory || []);
                setFoodItems(response.data.foodItems || []);
            }
        } catch (error) {
            console.error("❌ Error fetching data:", error);
        }
    };
    

    useEffect(() => {
        getData();
    }, []); // 🔴 Empty dependency array se sirf ek baar chalega

    return (
        <>
            {/* <Slider /> */}
            {/* <Cards foodItems={foodItems} foodCategory={foodCategory} /> */}

            <div style={{ padding: "20px" }}>
                {foodCategory.map((category) => (
                    <div key={category._id}>
                        <h2 style={{ textAlign: "left", margin: "20px 0px" }}>{category.CategoryName}</h2>
                        <Cards foodItems={foodItems} categoryName={category.CategoryName} />
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
};

export default MenuPage;












// import { useState, useEffect } from "react";
// import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
// import axios from "axios"; // API call ke liye

// function MenuPage() {
//   const [foodItems, setFoodItems] = useState([]);

//   useEffect(() => {
//     // API se food items fetch karo
//     axios
//       .get("http://localhost:5000/api/foodData") // Apni backend API ka endpoint
//       .then((response) => {
//         setFoodItems(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching food items:", error);
//       });
//   }, []);

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "20px",
//         flexWrap: "wrap",
//         marginTop: "50px",
//         padding: "10px",
//       }}
//     >
//       {foodItems.map((item) => (
//         <Card
//           key={item._id}
//           style={{
//             width: "100%",
//             maxWidth: 300,
//             border: "1px solid #1976d2",
//             borderRadius: "10px",
//           }}
//         >
//           <CardMedia component="img" height="140" image={item.imageUrl} alt={item.name} referrerPolicy="no-referrer" />
//           <CardContent>
//             <Typography variant="h6">{item.name}</Typography>
//             <Typography variant="body2" color="textSecondary">
//               {item.description}
//             </Typography>
//             <Typography variant="h6" style={{ marginTop: "10px" }}>${item.price}</Typography>
//             <Button variant="contained" color="error" style={{ marginTop: "10px", width: "100%" }}>
//               Add to Cart
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default MenuPage;







// // import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
// // import cardItems from "../Components/cardItems"; // Assuming cardItems is in the same directory

// // function MenuPage() {
// //   return (
// //     <div
// //       style={{
// //         display: "flex", // Cards ko row me lane ke liye
// //         justifyContent: "center", // Center align karne ke liye
// //         alignItems: "center", // Cards ko vertical center karne ke liye
// //         gap: "20px", // Cards ke darmiyan gap dene ke liye
// //         flexWrap: "wrap", // Agar jagah kam ho to neeche move ho sake
// //         marginTop: "50px",
// //         padding: "10px", // Mobile view ke liye spacing dene ke liye
// //       }}
// //     >
// //       {cardItems.map((item) => (
// //         <Card
// //           key={item.id}
// //           style={{
// //             width: "100%", // Mobile ke liye full width
// //             maxWidth: 300, // Desktop par max 300px tak rahe
// //             border: "1px solid #1976d2",
// //             borderRadius: "10px",
// //           }}
// //         >
// //           <CardMedia component="img" height="140" image={item.imageUrl} alt={item.name}   referrerPolicy="no-referrer"
// //  />
// //           <CardContent>
// //             <Typography variant="h6">{item.name}</Typography>
// //             <Typography variant="body2" color="textSecondary">
// //               {item.description}
// //             </Typography>
// //             <Typography variant="h6" style={{ marginTop: "10px" }}>${item.price}</Typography>
// //             <Button variant="contained" color="error" style={{ marginTop: "10px", width: "100%" }}>
// //               Add to Cart
// //             </Button>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // }


// // export default MenuPage;






// // // import { useState, useEffect } from "react";
// // // import Cards from "./Cards";
// // // import cardItems from "../Components/cardItems"; // Import local data

// // // function MenuPage() {
// // //   const [foodItems, setFoodItems] = useState([]);

// // //   useEffect(() => {
// // //     setFoodItems(cardItems); // Ensure ke sirf ek dafa data load ho
// // //   }, []); // Empty dependency array means only run once

// // //   return (
// // //     <div style={{ padding: "20px" }}>
// // //       <h2>Menu</h2>
// // //       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
// // //         {foodItems.map((item, index) => (
// // //           <Cards
// // //             key={item.id || index} // Ensure unique key
// // //             name={item.name}
// // //             description={item.description}
// // //             price={item.price}
// // //             imgSrc={item.imageUrl}
// // //           />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default MenuPage;
