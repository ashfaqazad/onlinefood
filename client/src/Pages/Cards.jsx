import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useAppContext } from "../context/AppContext"; // Import context

const Cards = ({ foodItems, categoryName }) => {
    const { dispatch } = useAppContext(); // Use global state

    // Filter items based on category
    const filteredItems = foodItems.filter(item => item.CategoryName === categoryName);

    const handleAddToCart = (item) => {
        dispatch({ type: "ADD_TO_BASKET", payload: item });
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
                marginTop: "20px",
                marginRight: "15px",
            }}
        >
            {filteredItems.map((item) => (
                <Card
                    key={item._id}
                    style={{
                        width: "100%",
                        maxWidth: 300,
                        border: "1px solid #1976d2",
                        borderRadius: "10px",
                        margin: "5px"
                    }}
                >
                    <CardMedia
                        component="img"
                        height="140"
                        image={item.imageUrl}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                    />
                    <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {item.description}
                        </Typography>
                        <Typography variant="h6" style={{ marginTop: "10px" }}>${item.price}</Typography>
                        <Button 
                            variant="contained" 
                            color="error" 
                            style={{ marginTop: "10px", width: "100%" }} 
                            onClick={() => handleAddToCart(item)}
                        >
                            Add to Cart
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Cards;


























// import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

// const Cards = ({ foodItems, categoryName }) => {
//     // Sirf wahi food items jo selected category ke hain
//     const filteredItems = foodItems.filter(item => item.CategoryName === categoryName);

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 justifyContent: "left",
//                 alignItems: "center",
//                 gap: "20px",
//                 flexWrap: "wrap",
//                 marginTop: "20px",
//                 marginRight: "15px",
//             }}
//         >
//             {filteredItems.map((item) => (
//                 <Card
//                     key={item._id}
//                     style={{
//                         width: "100%",
//                         maxWidth: 300,
//                         border: "1px solid #1976d2",
//                         borderRadius: "10px",
//                         margin: "5px"
//                     }}
//                 >
//                     <CardMedia
//                         component="img"
//                         height="140"
//                         image={item.imageUrl}
//                         alt={item.name}
//                         referrerPolicy="no-referrer"
//                     />
//                     <CardContent>
//                         <Typography variant="h6">{item.name}</Typography>
//                         <Typography variant="body2" color="textSecondary">
//                             {item.description}
//                         </Typography>
//                         <Typography variant="h6" style={{ marginTop: "10px" }}>${item.price}</Typography>
//                         <Button variant="contained" color="error" style={{ marginTop: "10px", width: "100%" }}>
//                             Add to Cart
//                         </Button>
//                     </CardContent>
//                 </Card>
//             ))}
//         </div>
//     );
// };

// export default Cards;









// import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

// function Cards() {
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
//       <Card
//         key="some-id" // Placeholder ID, change it as needed
//         style={{
//           width: "100%",
//           maxWidth: 300,
//           border: "1px solid #1976d2",
//           borderRadius: "10px",
//         }}
//       >
//         <CardMedia
//           component="img"
//           height="140"
//           image="https://via.placeholder.com/300" // Placeholder image
//           alt="Food Item"
//           referrerPolicy="no-referrer"
//         />
//         <CardContent>
//           <Typography variant="h6">Food Item Name</Typography>
//           <Typography variant="body2" color="textSecondary">
//             Food Item Description
//           </Typography>
//           <Typography variant="h6" style={{ marginTop: "10px" }}>
//             $00.00
//           </Typography>
//           <Button variant="contained" color="error" style={{ marginTop: "10px", width: "100%" }}>
//             Add to Cart
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Cards;



















// import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

// function Cards({ foodItems }) {
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
//       {foodItems.length === 0 ? (
//         <Typography variant="h6">No Food Items Available</Typography>
//       ) : (
//         foodItems.map((item) => (
//           <Card
//             key={item._id} // Backend se aane wale data me `id` ki jagah `_id` ho sakta hai
//             style={{
//               width: "100%",
//               maxWidth: 300,
//               border: "1px solid #1976d2",
//               borderRadius: "10px",7
//             }}
//           >
//             <CardMedia
//               component="img"
//               height="140"
//               image={item.imageUrl || "https://via.placeholder.com/300"} // Placeholder agar image na ho
//               alt={item.name}
//               referrerPolicy="no-referrer"
//             />
//             <CardContent>
//               <Typography variant="h6">{item.name}</Typography>
//               <Typography variant="body2" color="textSecondary">
//                 {item.description || "No description available"}
//               </Typography>
//               <Typography variant="h6" style={{ marginTop: "10px" }}>
//                 ${item.price || "N/A"}
//               </Typography>
//               <Button variant="contained" color="error" style={{ marginTop: "10px", width: "100%" }}>
//                 Add to Cart
//               </Button>
//             </CardContent>
//           </Card>
//         ))
//       )}
//     </div>
//   );
// }

// export default Cards;













// // import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
// // import cardItems from "../Components/cardItems"; // Assuming cardItems is in the same directory

// // function Cards() {
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


// // export default Cards;





















// // import { useState, useEffect } from "react";
// // import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
// // import axios from "axios";

// // function Cards() {
// //   const [foodItems, setFoodItems] = useState([]); // ✅ API se data store karne ke liye state

// //   useEffect(() => {
// //     axios
// //       .post("http://localhost:5000/api/foodData") // ✅ API Call
// //       .then((response) => {
// //         if (response.data.food_items) {
// //           setFoodItems(response.data.food_items);
// //           console.log("✅ MongoDB Food Items:", response.data.food_items); // ✅ Console me data check karne ke liye
// //         } else {
// //           console.error("⚠️ Data structure incorrect:", response.data);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("🚨 Error fetching data:", error);
// //       });
// //   }, []);

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         gap: "20px",
// //         flexWrap: "wrap",
// //         marginTop: "50px",
// //         padding: "10px",
// //       }}
// //     >
// //       {foodItems.map((item) => (
        
// //         <Card
// //           key={item._id}
// //           style={{
// //             width: "100%",
// //             maxWidth: 300,
// //             border: "1px solid #1976d2",
// //             borderRadius: "10px",
// //           }}
// //         >
// //           <CardMedia
// //             component="img"
// //             height="140"
// //             image={item.imageUrl} // ✅ MongoDB se image URL lena
// //             alt={item.name}
// //             referrerPolicy="no-referrer"
// //           />
// //           <CardContent>
// //             <Typography variant="h6">{item.name}</Typography>
// //             <Typography variant="body2" color="textSecondary">
// //               {item.description || "No description available"}
// //             </Typography>
// //             {/* <Typography variant="h6" style={{ marginTop: "10px" }}>
// //               {item.options ? `$${item.options[0].price}` : "Price not available"}
// //             </Typography> */}
// //             <Typography variant="h6" style={{ marginTop: "10px" }}>
// //               {item.price ? `$${item.price}` : "Price not available"}
// //             </Typography>

// //             {/* <Typography variant="h6" style={{ marginTop: "10px" }}>
// //               {item.options && item.options.length > 0 
// //                 ? `$${item.options[0].price}` 
// //                 : item.price ? `$${item.price}` : "Price not available"}
// //             </Typography> */}


// //             <Button variant="contained" color="error" style={{ marginTop: "10px", width: "100%" }}>
// //               Add to Cart
// //             </Button>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // }

// // export default Cards;


















// // import { useState, useEffect } from "react";
// // import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
// // import axios from "axios";

// // function Cards() {
// //   const [cardItems, setCardItems] = useState([]);

// //   useEffect(() => {
// //     axios.get("http://localhost:5000/api/food/categories") // Backend API call
// //       .then(response => {
// //         setCardItems(response.data); // MongoDB se data store karna
// //       })
// //       .catch(error => {
// //         console.error("Error fetching data:", error);
// //       });
// //   }, []);

// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         justifyContent: "center",
// //         alignItems: "center",
// //         gap: "20px",
// //         flexWrap: "wrap",
// //         marginTop: "50px",
// //         padding: "10px",
// //       }}
// //     >
// //       {cardItems.map((item) => (
// //         <Card
// //           key={item._id}
// //           style={{
// //             width: "100%",
// //             maxWidth: 300,
// //             border: "1px solid #1976d2",
// //             borderRadius: "10px",
// //           }}
// //         >
// //           <CardMedia
// //             component="img"
// //             height="140"
// //             image={item.imageUrl} // MongoDB se URL fetch hoga
// //             alt={item.name}
// //             referrerPolicy="no-referrer"
// //           />
// //           <CardContent>
// //             <Typography variant="h6">{item.name}</Typography>
// //             <Typography variant="body2" color="textSecondary">
// //               {item.description}
// //             </Typography>
// //             <Typography variant="h6" style={{ marginTop: "10px" }}>
// //               ${item.price}
// //             </Typography>
// //             <Button variant="contained" color="error" style={{ marginTop: "10px", width: "100%" }}>
// //               Add to Cart
// //             </Button>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // }

// // export default Cards;











// // // import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

// // // function Cards() {
// // //   return (
// // //     <div style={{
// // //       display: "flex",        // Cards ko row me lane ke liye
// // //       justifyContent: "center", // Center align karne ke liye
// // //       alignItems: "center",   // Cards ko vertical center karne ke liye
// // //       gap: "20px",            // Cards ke darmiyan gap dene ke liye
// // //       flexWrap: "wrap",       // Agar jagah kam ho to neeche move ho sake
// // //       marginTop: "50px",
// // //       padding: "10px"          // Mobile view ke liye spacing dene ke liye
// // //     }}>
      
// // //       {Array.from({ length: 12}).map((_,index) => (
// // //         <Card key={index} style={{
// // //           width: "100%",         // Mobile ke liye full width
// // //           maxWidth: 300,          // Desktop par max 300px tak rahe
// // //           border: "1px solid #1976d2",
// // //           borderRadius: "10px"
// // //         }}>
// // //           <CardMedia
// // //             component="img"
// // //             height="140"
// // //             image="/VegPizza.webp"
// // //             alt="Random Image"
// // //           />
// // //           <CardContent>
// // //             <Typography variant="h6">MUI Card Example</Typography>
// // //             <Typography variant="body2" color="textSecondary">
// // //               This is a sample card description using Material-UI.
// // //             </Typography>
// // //             <Button variant="contained" color="primary" style={{ marginTop: "10px", width: "100%" }}>
// // //               Learn More
// // //             </Button>
// // //           </CardContent>
// // //         </Card>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // // export default Cards;
