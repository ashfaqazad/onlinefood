const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Item schema
const ItemSchema = new Schema({
    id: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    image: { 
        type: String, 
        default: null  // Default value if image is not provided
    },
    total: { 
        type: Number, 
        required: true 
    },
}, { _id: false });

// Checkout Schema (Using ItemSchema for checkout_data)
const OrdersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    orders_data: [ItemSchema],  // Using ItemSchema here for items
    
     // Default empty array for orderHistory
});

const Orders = mongoose.model('Orders', OrdersSchema);

module.exports = Orders;









// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       name: String,
//       quantity: Number,
//       price: Number
//     }
//   ],
//   totalAmount: { type: Number, required: true },
//   status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
//   createdAt: { type: Date, default: Date.now }
// });

// export default mongoose.model('Order', orderSchema);
