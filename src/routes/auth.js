const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth');

// POST
router.post('/add', authControllers.createAccount);
router.post('/addcart', authControllers.addCart);
router.post('/cheout', authControllers.checkOut);

// GET
router.get('/geteandpw/:email/:password', authControllers.findAccountByPasswordAndEmail);
router.get('/fabid/:uid', authControllers.findAccountById);

// PATCH
router.patch('/addfav/:uid', authControllers.addFavorites);
router.patch('/addpp/:uid', authControllers.addProfile);
router.patch('/chamon/:uid', authControllers.changeAmountCart);

// DELETE
router.delete('/delitem/:uid/:pid', authControllers.deleteItemFromCart);
router.delete('/delfav/:uid/:pid', authControllers.deleteFavorites);

module.exports = router;