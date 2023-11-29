import jwt from 'jsonwebtoken';
import { config } from '../config/dotenvConfig.js';
import User from '../dao/models/userModel.js';

const checkAdminRole = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send('Acceso no autorizado. Token no proporcionado.');
        }

        const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
        const user = await User.findOne({ email: decodedToken.username });

        if (!user) {
            return res.status(401).send('Usuario no encontrado.');
        }

        if (user.role === 'admin') {
            req.isAdmin = true;
            next();
        } else {
            res.status(403).send("Acceso No Autorizado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al verificar el rol del usuario: ' + error.message);
    }
};

const checkUserRole = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send('Acceso no autorizado. Token no proporcionado.');
        }

        const decodedToken = jwt.verify(token, config.jwt.jwtSecret);
        const user = await User.findOne({ email: decodedToken.username });

        if (!user) {
            return res.status(401).send('Usuario no encontrado.');
        }

        if (user.role === 'user') {
            req.isUser = true;
            next();
        } else {
            res.status(403).send("Acceso No Autorizado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al verificar el rol del usuario: ' + error.message);
    }
};

export { checkAdminRole, checkUserRole };

