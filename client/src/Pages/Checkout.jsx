import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { Button } from "@mui/material";

const Checkout = ({ onCheckout }) => {
    const { state } = useAppContext();
    const data = state.basket;

    // Calculate total price
    const totalPrice = data.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
    }, 0);

    return (
        <div>
            <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
            <Button variant="contained" color="primary" onClick={onCheckout}>
                Checkout
            </Button>
        </div>
    );
};

export default Checkout;









// import { useState } from "react";
// import { Box, Typography, Card, Avatar, Divider } from "@mui/material";
// import { useAppContext } from "../context/AppContext";

// const Orders = () => {
//   const { state, dispatch } = useAppContext();
//   const [orders , setOrders] =useState("")

//   return (
//     <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
//       <Typography variant="h5" fontWeight="bold" mb={2}>
//         Your Orders
//       </Typography>

//       {orders.length > 0 ? (
//         orders.map((order, index) => (
//           <Card key={index} sx={{ mb: 2, p: 2 }}>
//             {order.items.map((item) => (
//               <Box key={item._id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Avatar
//                   src={item.imageUrl}
//                   alt={item.name}
//                   sx={{ width: 60, height: 60, borderRadius: 1 }}
//                 />
//                 <Box sx={{ flexGrow: 1 }}>
//                   <Typography variant="body1" fontWeight="bold">{item.name}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     ${item.price.toFixed(2)} x {item.quantity}
//                   </Typography>
//                 </Box>
//                 <Typography variant="h6" fontWeight="bold">
//                   ${ (item.price * item.quantity).toFixed(2) }
//                 </Typography>
//               </Box>
//             ))}
//             <Divider sx={{ my: 2 }} />
//             <Typography variant="body1" fontWeight="medium">
//               Order Date: {new Date(order.date).toLocaleString()}
//             </Typography>
//             <Typography variant="h6" fontWeight="bold" mt={1}>
//               Grand Total: ${order.total.toFixed(2)}
//             </Typography>
//           </Card>
//         ))
//       ) : (
//         <Typography sx={{ textAlign: "center", mt: 4 }}>No orders yet!</Typography>
//       )}
//     </Box>
//   );
// };

// export default Orders;
