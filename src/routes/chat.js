const express = require('express');
const router = express.Router();

const chatControllers = require('../controllers/chat');

// POST
router.post('/addcon', chatControllers.AddConversation);

// GET
router.get('/fincon/:cid', chatControllers.FindConversation);
router.get('/fincha/:uid', chatControllers.FindChat);

// PATCH
router.patch('/docon/:cid', chatControllers.DoConversation);

// DELETE
router.delete('/delcon/:cid', chatControllers.DeleteConversation);

module.exports = router;