const chats = require('../models/chat');

exports.AddConversation = (req, res, next) => {
    const speaker_id = req.body.speaker_id;
    const product_id = req.body.product_id;
    const date = new Date;
    const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

    const conversation = {
        uid: req.body.username_id,
        msg: req.body.msg,
        time
    }

    const chat = new chats({
        speaker_id,
        product_id,
        conversation
    });

    chat.save()
    .then(result => {
        res.status(201).json({
            message: "Conversation created",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.FindConversation = (req, res, next) => {
    const cid = req.params.cid;

    chats.findById(cid)
    .then(result => {
        res.status(201).json({
            message: "Conversation found",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.DoConversation = (req, res, next) => {
    const msg = req.body.msg;
    const cid = req.params.cid;
    const uid = req.body.uid;
    const date = new Date;

    const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

    const newChat = {
        msg,
        uid,
        time
    }

    chats.findById(cid)
    .then(result => {
        const chat = result;
        
        chat.conversation.push(newChat);

        chat.save()
        .then(result => {
            res.status(201).json({
                message: "Message added",
                data: result
            })
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.FindChat = (req, res, next) => {
    const username_id = req.params.uid;

    chats.find({
        speaker_id: {
            $in: [username_id]
        }
    })
    .then(result => {
        res.status(201).json({
            message: "Conversation found",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.DeleteConversation = (req, res, next) => {
    const cid = req.params.cid;

    chats.findById(cid)
    .then(result => {
        res.status(201).json({
            message: "Conversation deleted",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}