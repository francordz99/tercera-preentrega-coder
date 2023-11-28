import express from 'express';
import adminController from '../controllers/adminController.js';
import { authenticateToken } from "../middlewares/tokenValidity.js";
import { checkAdminRole } from '../middlewares/checkRole.js';

const adminRoutes = express.Router();

adminRoutes.get('/admin', authenticateToken, checkAdminRole, adminController.getAdmin);
adminRoutes.get('/admin/getProduct', authenticateToken, checkAdminRole, adminController.getProduct);
adminRoutes.post('/admin/addProduct', authenticateToken, checkAdminRole, adminController.postProduct);
adminRoutes.put('/admin/editProduct', authenticateToken, checkAdminRole, adminController.putProduct);
adminRoutes.delete('/admin/deleteProduct', authenticateToken, checkAdminRole, adminController.deleteProduct);

export default adminRoutes;
