import express from "express";
import { authenticateToken } from "../middlewares/tokenValidity.js";
import { checkUserRole } from "../middlewares/checkRole.js";
import cartController from '../controllers/cartController.js'

const cartRoutes = express.Router();

cartRoutes.put('/cart/addProductToCart/:productId', authenticateToken, checkUserRole, cartController.addProductToCart);
cartRoutes.get('/cart', authenticateToken, checkUserRole, cartController.getCartProducts);

export default cartRoutes;
