const auths = require('../models/auth');

exports.createAccount = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const Auth = new auths({
        name,
        email,
        password,
    })

    Auth.save()
    .then(result => {
        res.status(201).json({
            message: "Account Created",
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
};

exports.addProfile = (req, res, next) => {
    const profile = req.files.profile_picture[0].path;
    const uid = req.params.uid;

    auths.findById(uid)
    .then(result => {
        const account = result;
        account.profile_picture = profile;

        account.save()
        .then(result => {
            res.status(201).json({
                message: "Profile Added",
                data: result,
            })
        })
    })
    .catch(err => {
        next(err);
    })
};

exports.addCart = (req, res, next) => {
    const uid = req.body.uid;
    const pid = req.body.pid;
    const price = req.body.price;
    const image = req.body.image;
    const pname = req.body.pname;
    const amount = req.body.amount;
    
    auths.findById(uid)
    .then(result => {
        const account = result;
        account.cart.push({
            product_id: pid,
            product_name: pname,
            amount,
            price,
            image,
        })

        account.save()
        .then(result => {
            res.status(201).json({
                message: "Product added to user cart",
                data: result
            })
        })
    })
    .catch(err => {
        next(err);
    })
};

exports.findAccountById = (req, res, next) => {
    const uid = req.params.uid;
    
    auths.findById(uid)
    .then(result => {
        res.status(201).json({
            message: "Account found",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.findAccountByPasswordAndEmail = (req, res, next) => {
    const email = req.params.email;
    const password = req.params.password;

    auths.find({
        email,
        password
    })
    .then(result => {
        res.status(201).json({
            message: "Account found",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.checkOut = (req, res, next) => {
    const uid = req.body.uid;
    const pid = req.body.pid;
    const price = req.body.price;
    const image = req.body.image;
    const pname = req.body.pname;
    const amount = req.body.amount;
    const date = new Date;
    const option ={
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const readableDate = date.toLocaleDateString('en-US', option);
    
    auths.findById(uid)
    .then(result => {
        const account = result;
        account.bought.push({
            product_id: pid,
            product_name: pname,
            amount,
            price,
            image,
            date: readableDate
        })

        account.save()
        .then(result => {
            res.status(201).json({
                message: "Product paid",
                data: result
            })
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteItemFromCart = (req, res, next) => {
    const pid = req.params.pid;
    const uid = req.params.uid;

    auths.findById(uid)
    .then(result => {
        const account = result;
        account.cart = result.cart.filter(product => {
            return product.product_id !== pid;
        })
        
        account.save()
        .then(result => {
            res.status(201).json({
                message: "Item deleted",
                data: result
            })
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.changeAmountCart = (req, res, next) => {
    const uid = req.params.uid;
    const pid = req.body.pid;
    const amount = req.body.amount;

    auths.findById(uid)
    .then(result => {
        const account = result;
        const newCart = result.cart.map(product => {
            if(product.product_id === pid) {
                product.amount = amount;
            }
            return product;
        })

        account.markModified('cart');
        
        account.cart = newCart;

        account.save()
        .then(result => {
            res.status(201).json({
                message: "Amount changed",
                data: result
            })
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.addFavorites = (req, res, next) => {
    const uid = req.params.uid;
    const product_id = req.body.product_id;
    const price = req.body.price;
    const image = req.body.image;
    const product_name = req.body.product_name;
    const stock = req.body.stock;
    
    auths.findById(uid)
    .then(result => {
        const account = result;
        
        account.favorites.push({
            product_id,
            product_name,
            stock,
            price,
            image,
        })

        account.save()
        .then(result => {
            res.status(201).json({
                message: "Product added to user favorites",
                data: result
            })
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteFavorites = (req, res, next) => {
    const pid = req.params.pid;
    const uid = req.params.uid;

    auths.findById(uid)
    .then(result => {
        const account = result;

        account.favorites = account.favorites.filter(product => {
            return product.product_id !== pid;
        })

        account.save()
        .then(result => {
            res.status(201).json({
                message: "Product deleted from favorite",
                data: result
            })
        })
    })
    .catch(err => {
        next(err);
    })
}