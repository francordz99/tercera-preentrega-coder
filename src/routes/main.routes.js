import express from 'express';
import mainController from '../controllers/mainController.js';
import { authenticateToken, checkAuthenticated } from "../middlewares/tokenValidity.js";
import { checkAdminRole, checkUserRole } from '../middlewares/checkRole.js';

const mainRoutes = express.Router();

mainRoutes.get('/', authenticateToken, mainController.getIndex);
mainRoutes.get('/login', checkAuthenticated, mainController.getLogin);
mainRoutes.get('/register', checkAuthenticated, mainController.getRegister);
mainRoutes.get('/products', authenticateToken, mainController.getProducts);
mainRoutes.get('/productinfo', authenticateToken, mainController.getProductInfo);
mainRoutes.get('/profile', authenticateToken, mainController.getProfile); // Esta Es Mi Ruta /Current
mainRoutes.get('/cart', authenticateToken, checkUserRole, mainController.getCart);
mainRoutes.get('/contact', authenticateToken, checkUserRole, mainController.getContact);
mainRoutes.get('/about', authenticateToken, mainController.getAbout);
mainRoutes.get('/support', authenticateToken, checkUserRole, mainController.getSupport);
mainRoutes.get('/admin', authenticateToken, checkAdminRole, mainController.getAdmin);

export default mainRoutes;
