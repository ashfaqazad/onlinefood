import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "./Slider";
import Cards from "./Cards";
import Footer from "./Footer";

const Home = () => {
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
    
    // const getData = async () => {
    //     try {
    //         const response = await axios.post("http://localhost:5000/api/foodData");

    //         console.clear(); // 🔴 Console clear karega taake repeat na ho
    //         console.log("✅ API Response:", response.data);

    //         if (response.data) {
    //             // setFoodCategory(response.data.foodCategory || []);
    //             setFoodItems(response.data.foodItems || []);
    //         }
    //     } catch (error) {
    //         console.error("❌ Error fetching data:", error);
    //     }
    // };

    useEffect(() => {
        getData();
    }, []); // 🔴 Empty dependency array se sirf ek baar chalega

    return (
        <>
            <Slider />
            {/* <Cards foodItems={foodItems} foodCategory={foodCategory} /> */}

            <div style={{ padding: "20px" }}>
                {foodCategory.map((category) => (
                    <div key={category._id}>
                        <h2 style={{ textAlign: "left", margin: "20px 0" }}>{category.CategoryName}</h2>
                        <Cards foodItems={foodItems} categoryName={category.CategoryName} />
                    </div>
                ))}
            </div>

            <Footer />
        </>
    );
};

export default Home;







// import Slider from "./Slider";
// import Cards from "./Cards";
// import Footer from "./Footer";
// import { useState, useEffect } from "react";
// import axios from "axios";


// const Home = () => {

//     const [foodCategory, setFoodCategory] = useState([]);
//     const [foodItems, setFoodItems] = useState([]);

//     const getData = async () => {
//         try {
//             const response = await axios.post("http://localhost:5000/api/foodData");
//             setFoodCategory(response.data.foodCategory);
//             setFoodItems(response.data.foodItems);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         getData();
//     }, []);

//     console.log(response.data.foodCategory);
//     console.log(response.data.foodItems);


    
//   return (
//     <>
//       <Slider />
//       {/* <Cards /> */}
//       <Footer />
//     </>
//   );
// };

// export default Home;









// // import { useState, useEffect } from "react";
// // import axios from "axios";
// // import Cards from "./Cards";

// // function Home() {
// //   const [foodData, setFoodData] = useState([]);

// //   useEffect(() => {
// //     axios
// //       .post("http://localhost:5000/api/foodData")
// //       .then((response) => {
// //         if (response.data.food_data) {
// //           setFoodData(response.data.food_data);
// //           console.log("✅ Filtered Food Data:", response.data.food_data);
// //         } else {
// //           console.error("⚠️ Incorrect data structure:", response.data);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("🚨 Error fetching food data:", error);
// //       });
// //   }, []);

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       {foodData.map((category) => (
// //         <div key={category.CategoryName}>
// //           <h2>{category.CategoryName}</h2>
// //           <Cards foodItems={category.items} /> {/* ✅ Sirf related items bhej rahe hain */}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// // export default Home;





// import { useState, useEffect } from "react";
// import Slider from "./Slider";
// import Cards from "./Cards";

// const Home = () => {
//   const [foodCategory, setFoodCategory] = useState([]);
//   const [foodItems, setFoodItems] = useState([]);

//   // ✅ Data Fetching Function
//   const getData = async () => {
//     try {
//       let response = await fetch("http://localhost:5000/api/foodData", {
        
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       let data = await response.json(); // ✅ JSON response ko parse karo
//       console.log("📦 Fetched Data:", data);

//       if (Array.isArray(data.food_items) && Array.isArray(data.food_category)) {
//         console.log("Backend Response:", response.data); // Sirf ek dafa print hoga

//         setFoodItems(data.food_items);
//         setFoodCategory(data.food_category);

//         // ✅ Console Logs to Verify Data
//       } else {
//         console.error("⚠️ Invalid response structure:", data);
//       }
//     } catch (error) {
//       console.error("🚨 Error fetching data:", error);
//     }
//   };

//   // ✅ useEffect to fetch data on component mount
//   useEffect(() => {
    
//     getData();
//   }, [foodItems, foodCategory]);

//   return (
//     <>
//       <Slider />
//       {/* ✅ Console logs inside JSX */}
//       {console.log("🔄 Rendering: foodItems =", foodItems)}
//       {console.log("🔄 Rendering: foodCategory =", foodCategory)}

//       {foodCategory.map((category, index) => (
//         <div key={index}>
//           <h2>{category.CategoryName}</h2>
//           <div style={{ display: "flex", flexWrap: "wrap" }}>
//             {foodItems
//               .filter((item) => item.CategoryName === category.CategoryName)
//               .map((item) => (
//                 <Cards
//                   key={item._id}
//                   foodName={item.name}
//                   options={item.options}
//                   imgSrc={item.img}
//                 />
//               ))}
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default Home;







// import { useState, useEffect } from 'react';
// import Slider from './Slider';
// import Cards from './Cards';
// import Footer from './Footer';

// const Home = () => {
//   const [foodCategory, setFoodCategory] = useState([]);
//   const [foodItems, setFoodItems] = useState([]);

//   const getData = async () => {
//     try {
//       let response = await fetch("http://localhost:5000/api/foodData", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       let data = await response.json();
//       // console.log("Response Data:", data);

//       // ✅ Assuming response is an array with foodItems and foodCategory
//       setFoodItems(data[0]); // First element food_items
//       setFoodCategory(data[1]); // Second element food_category

//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []); // ✅ Runs only once when component mounts

//   return (
//     <>
//       <Slider />
//       <Cards foodItems={foodItems} foodCategory={foodCategory} />
//       <Footer />
//     </>
//   );
// };

// export default Home;
