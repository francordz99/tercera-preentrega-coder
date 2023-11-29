import Product from '../dao/models/productModel.js';

const productsController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.find();
            if (!products || products.length === 0) {
                return res.render('products', { errorMessage: 'No se encontraron productos.' });
            }
            res.render('products', { products });
        } catch (error) {
            console.error(error);
            res.render('products', { errorMessage: 'Error al obtener la lista de productos.' });
        }
    },
};

export default productsController;
