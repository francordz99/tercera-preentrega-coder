const mainController = {
    getIndex: (req, res) => {
        res.render('index');
    },
    getProductInfo: (req, res) => {
        res.render('productinfo');
    },
    getSupport: (req, res) => {
        res.render('support');
    },
    getCart: async (req, res) => {
        res.render('cart');
    },
    getContact: async (req, res) => {
        res.render('contact');
    },
    getAbout: (req, res) => {
        res.render('about');
    }
};

export default mainController;

