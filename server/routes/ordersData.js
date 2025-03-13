const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');  // Checkout model ko import karna




router.post('/orders', async (req, res) => {
    console.log('Received data:', req.body);

    const { email, orders_data } = req.body;

    // Check if required fields are missing
    if (!email || !orders_data) { 
        return res.status(400).json({ error: 'Email and checkout data are required.' });
    }

    try {
        // Create a new checkout document
        const newOrder = new Order({
            email: email,
            
            orders_data: orders_data,
            


        });

        // Save the checkout data to MongoDB
        await newOrder.save();

        res.status(200).json({ message: 'Order placed successfully!' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});







router.post('/myOrderData', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const userOrders = await Orders.find({ email }); // Email ke basis par orders fetch karein
        res.status(200).json({ orderdata: userOrders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});


module.exports = router;

