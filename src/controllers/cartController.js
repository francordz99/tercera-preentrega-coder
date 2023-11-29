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
            const productDetails = await Promise.all(cart.products.map(async (item) => {
                const product = await Product.findById(item.product);
                return {
                    product: {
                        _id: product._id,
                        title: product.title,
                        thumbnail: product.thumbnail,
                        price: product.price,
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
    deleteProductFromCart: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const productId = req.params.productId;
            const userCart = await Cart.findOne({ email: userEmail });
            if (!userCart) {
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }

            const productIndex = userCart.products.findIndex(product => product.product.toString() === productId);
            if (productIndex === -1) {
                return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
            }
            userCart.products.splice(productIndex, 1);
            await userCart.save();

            res.status(200).json({ message: 'Producto eliminado del carrito con éxito' });
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
    editProductQuantity: async (req, res) => {
        try {
            const token = req.cookies.token;
            const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
            const userEmail = decodedToken.username;
            const productId = req.params.productId;
            const newQuantity = req.body.quantity;

            // Obtener el carrito del usuario
            const userCart = await Cart.findOne({ email: userEmail });

            if (!userCart) {
                return res.status(404).json({ error: 'Carrito no encontrado' });
            }

            // Buscar el producto en el carrito
            const productInCart = userCart.products.find(product => product.product.toString() === productId);

            if (!productInCart) {
                return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
            }

            // Actualizar la cantidad
            productInCart.quantity = newQuantity;
            await userCart.save();

            // Devolver la respuesta actualizada
            res.status(200).json({ success: true, message: 'Cantidad del producto actualizada correctamente' });
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },
};

export default cartController;
