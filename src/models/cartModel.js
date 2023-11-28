import mongoose from 'mongoose';
import Product from './productModel';
import User from './userModel';

const { Schema } = mongoose;

const cartSchema = new Schema({
    email: {
        type: String,
        ref: User.email,
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Product,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
