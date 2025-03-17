import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useAppContext } from "../context/AppContext";


const MyOrders = () => {
    const [orders, setOrders] = useState([]);
      const { mode } = useAppContext();
    

    useEffect(() => {
        const fetchOrders = async () => {
            const storedUser = localStorage.getItem("user");
            const userEmail = storedUser ? JSON.parse(storedUser).email : null;
    
            if (!userEmail) {
                console.error("User email missing");
                return;
            }
    
            try {
                const response = await axios.post("http://localhost:5000/api/myOrderData", { email: userEmail });
                setOrders(response.data.orderdata);  // Ensure state is updating
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
    
        fetchOrders();
    }, []);
    

    return (

<Container sx={{ padding: 4 }}>
    <Typography variant="h4" gutterBottom>My Orders</Typography>
    {orders.length > 0 ? (
        orders.map((order, index) => (

<Card 
    key={order._id} 
    sx={{ 
        marginBottom: 3, 
        boxShadow: 3, 
        bgcolor: mode === "dark" ? "#1e1e1e" : "#ffffff", 
        color: mode === "dark" ? "#ffffff" : "#000000", 
        border: mode === "dark" ? "1px solid #444" : "1px solid #ddd",
    }}
>
    <CardContent>
        <Typography variant="h6">Order {index + 1}</Typography>
        <Typography variant="subtitle1">Email: {order.email}</Typography>

        <Typography variant="subtitle2" color="textSecondary">
            <strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}
        </Typography>

        <Typography variant="h6" mt={2}>Checkout Data:</Typography>
        <Grid container spacing={2} mt={1}>
            {order.orders_data.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        padding: 2, 
                        bgcolor: mode === "dark" ? "#2a2a2a" : "#ffffff", 
                        color: mode === "dark" ? "#ffffff" : "#000000",
                    }}>
                        <CardMedia
                            component="img"
                            height="100"
                            image={item.image}
                            alt={item.title}
                            sx={{ objectFit: 'contain' }}
                        />
                        <CardContent>
                            <Typography variant="body1"><strong>Title:</strong> {item.title}</Typography>
                            <Typography variant="body2"><strong>Price:</strong> Rs. {item.price}</Typography>
                            <Typography variant="body2"><strong>Total:</strong> Rs. {item.total}</Typography>
                            <Typography variant="body2"><strong>Quantity:</strong> {item.quantity}</Typography>
                        </CardContent>
                    </Card> {/* ✅ Closing for Inner Card */}
                </Grid>
            ))}
        </Grid>
    </CardContent>
</Card> 

        ))
    ) : (
        <Typography>No orders found.</Typography>
    )}
</Container>
);
};

export default MyOrders;









            // <Card key={order._id} sx={{ marginBottom: 3, boxShadow: 3, bgcolor: "#ffffff" }}>


            //     <CardContent>
            //         <Typography variant="h6">Order {index + 1}</Typography>
            //         <Typography variant="subtitle1">Email: {order.email}</Typography>

            //         {/* ✅ Order Date Added Here */}
            //         <Typography variant="subtitle2" color="textSecondary">
            //             <strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}
            //         </Typography>

            //         <Typography variant="h6" mt={2}>Checkout Data:</Typography>
            //         <Grid container spacing={2} mt={1}>
            //             {order.orders_data.map((item) => (
            //                 <Grid item xs={12} sm={6} md={4} key={item.id}>
            //                     <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
            //                         <CardMedia
            //                             component="img"
            //                             height="100"
            //                             image={item.image}
            //                             alt={item.title}
            //                             sx={{ objectFit: 'contain' }}
            //                         />
            //                         <CardContent>
            //                             <Typography variant="body1"><strong>Title:</strong> {item.title}</Typography>
            //                             <Typography variant="body2"><strong>Price:</strong> Rs. {item.price}</Typography>
            //                             <Typography variant="body2"><strong>Total:</strong> Rs. {item.total}</Typography>
            //                             <Typography variant="body2"><strong>Quantity:</strong> {item.quantity}</Typography>
            //                         </CardContent>
            //                     </Card>
            //                 </Grid>
            //             ))}
            //         </Grid>
            //     </CardContent>
            // </Card>






// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const MyOrders = () => {
//     const [orders, setOrders] = useState([]);


    

//     useEffect(() => {
//         const fetchOrders = async () => {
//             const email = localStorage.getItem('userEmail'); // User email localStorage se fetch karein

//             try {
//                 const response = await axios.post('http://localhost:4000/api/myOrderData', { 
//                 email});

//                 console.log('Response Data:', response.data);
//                 setOrders(response.data.orderdata || []);
//             } catch (error) {
//                 console.error('Failed to fetch orders:', error);
//             }
//         };
//         fetchOrders();
//     }, []);

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>My Orders</h2>
//             {orders.length > 0 ? (
//                 orders.map((order, index) => (
//                     <div key={order._id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
//                         <h3>Order {index + 1}</h3>
//                         <h4>Email: {order.email}</h4>
//                         <h4>Checkout Data:</h4>
//                         {order.orders_data.map((item) => (
//                             <div key={item.id} style={{ marginBottom: '10px' }}>
//                                 <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px' }} />
//                                 <p>Title: {item.title}</p>
//                                 <p>Price: Rs. {item.price}</p>
//                                 <p>Rating: {item.rating}</p>
//                                 <p>Total: Rs. {item.total}</p>
//                             </div>
//                         ))}
//                         {/* <h4>Order History:</h4>
//                         {order.orderHistory.map((item) => (
//                             <div key={item.id} style={{ marginBottom: '10px' }}>
//                                 <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px' }} />
//                                 <p>Title: {item.title}</p>
//                                 <p>Price: Rs. {item.price}</p>
//                                 <p>Rating: {item.rating}</p>
//                                 <p>Total: Rs. {item.total}</p>
//                             </div>
//                         ))} */}
//                     </div>
//                 ))
//             ) : (
//                 <p>No orders found.</p>
//             )}
//         </div>
//     );
// };

// export default MyOrders;




