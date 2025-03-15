const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');  // Checkout model ko import karna




router.post('/orders', async (req, res) => {
    try {
        console.log('📩 Received Data:', req.body); // Debugging log

        const { email, orders_data } = req.body;

        // ✅ Validation: Ensure `email` exists and `orders_data` is a valid array
        if (!email || !Array.isArray(orders_data) || orders_data.length === 0) { 
            return res.status(400).json({ error: 'Email and valid order data are required.' });
        }


        // ✅ Ensure quantity is saved
        const newOrder = new Orders({
            email: email,
            orders_data: orders_data.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image,
                quantity: item.quantity,  // ✅ Ensure quantity is stored
                order_date: new Date(), // ✅ Automatically add order date
                total: item.total,
            })),
        });

        const savedOrder = await newOrder.save();




        console.log('✅ Order Saved Successfully:', savedOrder); // Debugging log
        return res.status(200).json({ 
            message: 'Order placed successfully!', 
            order: savedOrder 
        });

    } catch (error) {
        console.error('❌ Error during checkout:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
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

