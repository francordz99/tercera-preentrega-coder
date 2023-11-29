import jwt from 'jsonwebtoken';
import { config } from '../config/dotenvConfig.js';

export const authenticateToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const tokenCookie = cookies && cookies.split(';').find(cookie => cookie.trim().startsWith('token='));
    const token = tokenCookie && tokenCookie.split('=')[1];
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, config.jwt.jwtSecret, { ignoreExpiration: false }, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.redirect('/login');
            } else {
                return res.status(403).send('Acceso no autorizado. Token inválido.');
            }
        }
        req.user = user;
        next();
    });
};

export const checkAuthenticated = (req, res, next) => {
    const cookies = req.headers.cookie;
    const tokenCookie = cookies && cookies.split(';').find(cookie => cookie.trim().startsWith('token='));
    const token = tokenCookie && tokenCookie.split('=')[1];

    if (token) {
        jwt.verify(token, config.jwt.jwtSecret, { ignoreExpiration: false }, (err) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    next();
                } else {
                    return res.status(403).send('Acceso no autorizado. Token inválido.');
                }
            } else {
                return res.redirect('/');
            }
        });
    } else {
        next();
    }
};

