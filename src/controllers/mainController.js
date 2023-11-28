const mainController = {
    getIndex: (req, res) => {
        res.render('index');
    },
    getLogin: (req, res) => {
        res.render('login');
    },
    getRegister: (req, res) => {
        res.render('register');
    },
    getProducts: (req, res) => {
        res.render('products');
    },
    getProductInfo: (req, res) => {
        res.render('productinfo');
    },
    getProfile: (req, res) => {
        res.render('profile');
    },
    getSupport: (req, res) => {
        res.render('support');
    },
    getCart: async (req, res) => {
        try {
            if (req.isUser) {
                res.render('cart');
            } else {
                res.status(403).send("Acceso No Autorizado");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al verificar el rol del usuario: ' + error.message);
        }
    },
    getContact: async (req, res) => {
        try {
            if (req.isUser) {
                res.render('contact');
            } else {
                res.status(403).send("Acceso No Autorizado");
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al verificar el rol del usuario: ' + error.message);
        }
    },
    getAbout: (req, res) => {
        res.render('about');
    }
};

export default mainController;
