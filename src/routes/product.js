const express = require('express');
const router = express.Router();

const productControllers = require('../controllers/product');

//POST
router.post('/add', productControllers.addProduct);
router.post('/addprocus', productControllers.addProductCostumer);

//PATCH
router.patch('/edirev/:pid', productControllers.editReview);
router.patch('/addrev/:pid', productControllers.addReview);
router.patch('/edipro/:pid', productControllers.editProduct);
router.patch('/stock/:pid/:amount', productControllers.stockLeft);

//DELETE
router.delete('/delerev/:uid/:pid', productControllers.deleteReview);
router.delete(`/delepro/:pid`, productControllers.deleteMyProduct);

//GET
router.get('/getmine/:uid', productControllers.getMyProduct);
router.get('/get', productControllers.getAllProduct);
router.get('/getcos', productControllers.getCosmetics);
router.get('/getdec', productControllers.getDecors);
router.get('/getdri', productControllers.getDrinks);
router.get('/getele', productControllers.getElectronics);
router.get('/getfas', productControllers.getFashions);
router.get('/getfoo', productControllers.getFoods);
router.get('/getfur', productControllers.getFurnitures);
router.get('/gethea', productControllers.getHealths);
router.get('/getspo', productControllers.getSports);
router.get('/getbyid/:pid', productControllers.getProductById);
router.get('/seaname/:name', productControllers.searchProductByName);
router.get('/seatag/:tag', productControllers.searchProductByTag);

module.exports = router;