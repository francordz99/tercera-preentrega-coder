import User from '../dao/models/userModel.js';
import Cart from '../dao/models/cartModel.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/dotenvConfig.js';
import { isValidPassword, createHash } from '../utils.js';

const authController = {
    register: async (req, res) => {
        try {
            const { nombre, apellido, sexo, edad, email, celular, password } = req.body;
            const hashedPassword = await createHash(password);
            const user = new User({
                nombre,
                apellido,
                sexo,
                edad,
                email,
                celular,
                password: hashedPassword,
            });
            await user.save();
            const newCart = new Cart({
                email: user.email,
                products: [],
            });
            await newCart.save();
            user.cart = newCart._id;
            await user.save();
            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al registrar: ' + error.message);
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (user && (await isValidPassword(user, password))) {
                const token = jwt.sign({ username: user.email, userId: user._id }, config.jwt.jwtSecret, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: false });
                res.redirect(`/?token=${token}`);
            } else {
                res.status(401).send('Correo o contraseña incorrectos');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al iniciar sesión: ' + error.message);
        }
    },

    logout: (req, res) => {
        res.cookie('token', '', { expires: new Date(0), httpOnly: true });
        res.redirect('/login');
    },

    getLogin: (req, res) => {
        res.render('login');
    },

    getRegister: (req, res) => {
        res.render('register');
    }
};

export default authController;

