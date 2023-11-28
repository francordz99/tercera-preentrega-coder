import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import jwt from "jsonwebtoken";
import { config } from "../config/dotenvConfig.js";

const cartController = {
    addProductToCart: async (req, res) => {
        try {
            const productId = req.params.productId;
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const cart = await Cart.findOne({ email: userEmail });
            const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            await cart.save();
            res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar el producto al carrito' });
        }
    },
    getCartProducts: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const cart = await Cart.findOne({ email: userEmail });
            if (!cart || !cart.products || cart.products.length === 0) {
                return res.status(404).json({ message: 'El carrito está vacío' });
            }

            // Obtén los detalles de los productos en el carrito
            const productDetails = await Promise.all(cart.products.map(async (item) => {
                const product = await Product.findById(item.product);

                // Retorna un objeto con detalles del producto y la cantidad en el carrito
                return {
                    product: {
                        _id: product._id,
                        title: product.title,
                        thumbnail: product.thumbnail,
                        price: product.price,
                        // Agrega más campos según sea necesario
                    },
                    quantity: item.quantity,
                };
            }));

            res.render('cart', { products: productDetails });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los productos del carrito' });
        }
    },
};

export default cartController;
