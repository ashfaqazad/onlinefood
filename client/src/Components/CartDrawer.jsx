import { 
  Drawer, List, ListItem, ListItemText, IconButton, 
  Typography, Button, Box, Avatar, Paper
} from "@mui/material";
import { useAppContext } from "../context/AppContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useEffect, useState } from "react";

const CartDrawer = ({ open, onClose }) => {
  const { state, dispatch } = useAppContext();
  const basket = state.basket; // Ensuring consistent reference
  const [userEmail, setUserEmail] = useState(null);

  const total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

  console.log("Basket Items in CartDrawer: ", basket);



  useEffect(() => {
    const storedUser = localStorage.getItem("userEmail");
  
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // ✅ String ko object me convert karo
      console.log("📩 Parsed User Email:", parsedUser.email);
      setUserEmail(parsedUser.email); // ✅ Sirf email ko store karo state me
    }
  }, [open]);

  



  const handleCheckout = async () => {
    console.log("Checkout button clicked!");

    // Fetch user email from localStorage
    const storedUser = localStorage.getItem("user");  // ✅ Fix: Correct key
    console.log("📩 LocalStorage Fetched:", storedUser);

    const userEmail = storedUser ? JSON.parse(storedUser).email : null;
    console.log("📧 Extracted Email:", userEmail);

    if (!userEmail) {
        alert("User email is missing. Please log in.");
        return;
    }




    try {

        const response = await axios.post("http://localhost:5000/api/orders", {
            email: userEmail,
            orders_data: basket.map(item => ({
                id: item._id,  // `_id` ko `id` mein convert kar diya
                title: item.name, // `name` ko `title` mein convert kar diya
                price: item.price,
                image: item.imageUrl,  // Ensure `image` matches schema
                quantity: item.quantity || 1,  // Ensure quantity is set
                total: item.price * (item.quantity || 1),
            })),
        });
        


        if (response.status === 200) {
            alert("Order placed successfully!");
            dispatch({ type: "CLEAR_BASKET" });
            onClose();
        } else {
            alert("Failed to place order. Please try again.");
        }
    } catch (error) {
        console.error("Error during checkout:", error);
        alert("An error occurred while placing the order. Please try again.");
    }
};



  return (
      <Drawer anchor="right" open={open} onClose={onClose}>
          <Box sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column" }}>
              
              {/* Cart Heading */}
              <Typography variant="h6" sx={{ p: 2 }}>Your Cart</Typography>

              {/* Cart Items - Scrollable */}
              <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                  <List>
                      {basket.length > 0 ? (
                          basket.map((item) => (
                              <ListItem key={item._id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                  <Avatar src={item.imageUrl} alt={item.name} sx={{ width: 80, height: 80, borderRadius: 2 }} />
                                  <Box sx={{ flexGrow: 1 }}>
                                      <Typography variant="body1" fontWeight="bold">{item.name}</Typography>
                                      <Typography variant="body2" color="text.secondary">
                                          ${item.price.toFixed(2)}
                                      </Typography>
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                          <IconButton onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: item._id })}>
                                              <RemoveIcon />
                                          </IconButton>
                                          <Typography variant="body1">{item.quantity}</Typography>
                                          <IconButton onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: item._id })}>
                                              <AddIcon />
                                          </IconButton>
                                          <IconButton onClick={() => dispatch({ type: "REMOVE_FROM_BASKET", payload: item._id })}>
                                              <DeleteIcon />
                                          </IconButton>
                                      </Box>
                                  </Box>
                              </ListItem>
                          ))
                      ) : (
                          <Typography sx={{ p: 2, textAlign: "center" }}>Cart is empty</Typography>
                      )}
                  </List>
              </Box>

              {/* Fixed Bottom Section */}
              {basket.length > 0 && (
                  <Box
                      sx={{
                          position: "sticky",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          p: 2,
                          borderTop: 1,
                          borderColor: "divider",
                          backgroundColor: "white",
                          zIndex: 10,
                          boxSizing: "border-box",
                      }}
                  >
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                          <Typography variant="body1" fontWeight="medium">Total</Typography>
                          <Typography variant="h6" fontWeight="bold">${total.toFixed(2)}</Typography>
                      </Box>

                      <Button variant="contained" color="error" fullWidth onClick={handleCheckout}>
                          Checkout
                      </Button> 


                  </Box>
              )}
          </Box>
      </Drawer>
  );
};

export default CartDrawer;























// // import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Button, Box, Avatar } from "@mui/material";
// // import { useAppContext } from "../context/AppContext";
// // import AddIcon from "@mui/icons-material/Add";
// // import RemoveIcon from "@mui/icons-material/Remove";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import axios from "axios";


// // const CartDrawer = ({ open, onClose }) => {
// //   const { state, dispatch } = useAppContext();
// //   const data = state.basket; // Assuming `basket` contains the cart items

  
// //   const total = state.basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
// //   console.log("Basket Items in CartDrawer: ", state.basket);

// //   // const total = state.basket.reduce((sum, item) => sum + item.price * item.quantity, 0);



// //   const handleCheckout = async () => {
// //     console.log("Checkout button clicked!"); // Debugging log

// //     // Check for incomplete items
// //     const incompleteItems = data.some(
// //         (item) =>
// //             !item._id || !item.name || !item.price || !item.imageUrl
// //     );

// //     if (incompleteItems) {
// //         alert("Some items in the cart are incomplete. Please review your cart.");
// //         return;
// //     }

// //     // Adding quantity and total to each item
// //     // const orderData = data.map((item)
// //     const checkoutData = data.map((item) => ({
      
// //         ...item,
// //         quantity: item.quantity || 1, // Default to 1 if no quantity is set
// //         total: item.price * (item.quantity || 1), // Calculating total price for each item
// //     }));

// //     // const userEmail = localStorage.getItem("userEmail");
// //     const userEmail = localStorage.getItem("userEmail");


// //     try {
// //         const response = await axios.post("http://localhost:5000/api/orders", {
// //             email: userEmail,  // Send the email here
// //             checkout_data: checkoutData,  

// //             // order_data: orderData,
// //             // email: userEmail,
// //             // order_date: new Date().toDateString(),
// //         });

// //         if (response.status === 200) {
// //             alert("Order placed successfully!");
// //             dispatch({ type: 'CLEAR_BASKET' });
// //         } else {
// //             alert("Failed to place order. Please try again.");
// //         }
// //     } catch (error) {
// //         console.error("Error during checkout:", error);
// //         alert("An error occurred while placing the order. Please try again.");
// //     }
// // };


// //   //   // Calculate total price of the basket
// //   //   const totalPrice = data.reduce((total, item) => {
// //   //     return total + item.price * (item.quantity || 1); // Include quantity in total price
// //   // }, 0);

// //   console.log("Cart Items for Checkout:", data);


// //   return (



// // <Drawer anchor="right" open={open} onClose={onClose}>
// //   <Box sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column" }}>
    
// //     {/* Cart Heading */}
// //     <Typography variant="h6" sx={{ p: 2 }}>Your Cart</Typography>

// //     {/* Cart Items - Scrollable */}
// //     <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
// //       <List>
// //         {state.basket.length > 0 ? (
// //           state.basket.map((item) => (
// //             <ListItem key={item._id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //               <Avatar src={item.imageUrl} alt={item.name} sx={{ width: 80, height: 80, borderRadius: 2 }} />
// //               <Box sx={{ flexGrow: 1 }}>
// //                 <Typography variant="body1" fontWeight="bold">{item.name}</Typography>
// //                 <Typography variant="body2" color="text.secondary">${item.price.toFixed(2)}</Typography>
// //                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
// //                   <IconButton onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: item._id })}>
// //                     <RemoveIcon />
// //                   </IconButton>
// //                   <Typography variant="body1">{item.quantity}</Typography>
// //                   <IconButton onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: item._id })}>
// //                     <AddIcon />
// //                   </IconButton>
// //                   <IconButton onClick={() => dispatch({ type: "REMOVE_FROM_BASKET", payload: item._id })}>
// //                     <DeleteIcon />
// //                   </IconButton>
// //                 </Box>
// //               </Box>
// //             </ListItem>
// //           ))
// //         ) : (
// //           <Typography sx={{ p: 2, textAlign: "center" }}>Cart is empty</Typography>
// //         )}
// //       </List>
// //     </Box>

// //     {/* Fixed Bottom Section */}
// //     {state.basket.length > 0 && (
// //       <Box
// //         sx={{
// //           position: "sticky",
// //           bottom: 0,
// //           left: 0,
// //           width: "100%",  // Ensure it fits within Drawer
// //           p: 2,
// //           borderTop: 1,
// //           borderColor: "divider",
// //           backgroundColor: "white",
// //           zIndex: 10,
// //           boxSizing: "border-box", // Prevents overflow issues
// //         }}
// //       >
// //         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
// //           <Typography variant="body1" fontWeight="medium">Total</Typography>
// //           <Typography variant="h6" fontWeight="bold">${total.toFixed(2)}</Typography>
// //         </Box>


// //         <Button variant="contained" color="error" fullWidth onClick={handleCheckout}>
// //           Checkout
// //         </Button>
// //       </Box>
// //     )}
// //   </Box>
// // </Drawer>



// //   );
// // };

// // export default CartDrawer;


















// // import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Button, Box } from "@mui/material";
// // import { useAppContext } from "../context/AppContext";
// // import AddIcon from "@mui/icons-material/Add";
// // import RemoveIcon from "@mui/icons-material/Remove";
// // import DeleteIcon from "@mui/icons-material/Delete";

// // const CartDrawer = ({ open, onClose }) => {
// //   const { state, dispatch } = useAppContext();

// //   return (


// //     <Drawer anchor="right" open={open} onClose={onClose}>
// //       <Typography variant="h6" style={{ width: "300px", padding: "10px" }}>Your Cart</Typography>
// //       <List>
// //         {state.basket.length > 0 ? (
// //           // {/* Cart Icon */}

// //           state.basket.map((item) => (
// //             <ListItem key={item.id} style={{ display: "flex", justifyContent: "space-between" }}>

// //               {/* <ListItemText primary={item.name} secondary={`$${item.price} x ${item.quantity}`} /> */}

// //               <IconButton onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item.id })}>
// //                 <AddIcon />
// //               </IconButton>
// //               <IconButton onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item.id })}>
// //                 <RemoveIcon />
// //               </IconButton>
// //               <IconButton onClick={() => dispatch({ type: "REMOVE_FROM_BASKET", payload: item.id })}>
// //                 <DeleteIcon />
// //               </IconButton>
// //             </ListItem>
// //           ))
// //         ) : (
// //           <Typography style={{ padding: "20px", textAlign: "center" }}>Cart is empty</Typography>
// //         )}
// //       </List>


// //       {/* <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
// //         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
// //           <Typography variant="body1" fontWeight="medium">Total</Typography>
// //           <Typography variant="h6" fontWeight="bold">${total.toFixed(2)}</Typography>
// //         </Box>
// //         <Button variant="contained" fullWidth>
// //           Checkout
// //         </Button>
// //       </Box> */}


// //       <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           sx={{ width: "150px" }}
// //           onClick={() => alert("Checkout clicked")}
// //         >
// //           Checkout
// //         </Button>
// //       </div>

// //     </Drawer>
// //   );
// // };

// // export default CartDrawer;









// // import { useState } from "react";
// // import {
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   IconButton,
// //   Typography,
// //   Button,
// // } from "@mui/material";
// // import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// // const CartDrawer = () => {
// //   const [open, setOpen] = useState(false);

// //   // Dummy Cart Items
// //   const cartItems = [
// //     { id: 1, name: "Chicken Biryani", price: 300 },
// //     { id: 2, name: "Zinger Burger", price: 450 },
// //   ];

// //   return (
// //     <>
// //       {/* Cart Icon */}
// //       <IconButton color="inherit" onClick={() => setOpen(true)}>
// //         <ShoppingCartIcon />
// //       </IconButton>

// //       {/* Drawer */}
// //       <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
// //         <div style={{ width: 300, padding: 20 }}>
// //           <Typography variant="h6">Your Cart</Typography>
// //           <List>
// //             {cartItems.map((item) => (
// //               <ListItem key={item.id}>
// //                 <ListItemText primary={item.name} secondary={`Rs ${item.price}`} />
// //               </ListItem>
// //             ))}
// //           </List>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             fullWidth
// //             onClick={() => alert("Checkout clicked")}
// //           >
// //             Checkout
// //           </Button>
// //         </div>
// //       </Drawer>
// //     </>
// //   );
// // };

// // export default CartDrawer;
