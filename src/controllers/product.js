const products = require('../models/product');

exports.addProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const stock = req.body.stock;
    const type = req.body.type;
    const tag = req.body.tag;
    const sid = req.body.seller_id;
    const sname = req.body.seller_name;
    const image = req.files.product_images.map(img => {
        return img.path;
    });

    const product = new products({
        name,
        price,
        description,
        stock,
        tag,
        seller: {
            seller_id: sid,
            seller_name: sname,
        },
        type,
        image
    })

    product.save()
    .then(result => {
        res.status(201).json({
            message: "Product added",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
};

exports.editProduct = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const stock = req.body.stock;
    const type = req.body.type;
    const tag = req.body.tag;
    const pid = req.params.pid;
    const image = req.files.product_images.map(img => {
        return img.path;
    });

    products.findById(pid)
    .then(result => {
        const product = result;

        result.name = name;
        result.price = price;
        result.description = description;
        result.stock = stock;
        result.type = type;
        result.tag = tag;
        result.image = image;

        product.save()
        .then(result => {
            res.status(201).json({
                message: "Product data updated",
                data: result
            })
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.addReview = (req, res, next) => {
    const rating = req.body.rating;
    const comment = req.body.comment;
    const username = req.body.username;
    const uid = req.body.uid;
    const image = req.files.review_image[0].path;
    const pid = req.params.pid;
    
    products.findById(pid)
    .then(result => {
        const product = result;
        product.review.push({
            rating,
            comment,
            image,
            by: {
                username,
                uid
            }
        });

        product.save()
        .then(result => {
            res.status(201).json({
                message: "Review added",
                data: result,
            })
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.editReview = (req, res, next) => {
    const rating = req.body.rating;
    const comment = req.body.comment;
    const pid = req.params.pid;
    const uid = req.body.uid;
    const image = req.files.review_image[0].path;

    products.findById(pid)
    .then(result => {
        const product = result;
        const newReview = product.review.map(rev => {
            if(rev.by.uid === uid) {
                rev.comment = comment;
                rev.rating = rating;
                rev.image = image;
            }

            return rev;
        })

        product.markModified('review');

        product.review = newReview;

        product.save()
        .then(result => {
            res.status(201).json({
                message: "Review changed",
                data: result
            })
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteReview = (req, res, next) => {
    const uid = req.params.uid;
    const pid = req.params.pid;

    products.findById(pid)
    .then(result => {
        const product = result;

        product.review = product.review.filter(rev => {
            return rev.by.uid !== uid; 
        })

        product.save()
        .then(result => {
            res.status(201).json({
                message: "Review deleted",
                data: result
            })
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getAllProduct = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    let totalItems;

    products.find()
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getCosmetics = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    let totalItems;

    products.find({
        type: 'Cosmetic'
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            type: 'Cosmetic'
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getDecors = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    let totalItems;

    products.find({
        type: 'Decor'
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            type: 'Decor'
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getDrinks = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    let totalItems;

    products.find({
        type: 'Drink'
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            type: 'Drink'
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getElectronics = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    let totalItems;

    products.find({
        type: 'Electronic'
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            type: 'Electronic'
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getFashions = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    let totalItems;

    products.find({
        type: 'Fashion'
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            type: 'Fashion'
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getFoods = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    let totalItems;

    products.find({
        type: 'Food'
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            type: 'Food'
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getFurnitures = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    let totalItems;

    products.find({
        type: 'Furniture'
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            type: 'Furniture'
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getHealths = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    let totalItems;

    products.find({
        type: 'Health'
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            type: 'Health'
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getSports = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    let totalItems;

    products.find({
        type: 'Sport'
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            type: 'Sport'
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.getProductById = (req, res, next) => {
    const pid = req.params.pid;

    products.findById(pid)
    .then(result => {
        res.status(201).json({
            message: "Product found",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.addProductCostumer = (req, res, next) => {
    const customer_name = req.body.customer_name;
    const customer_id = req.body.customer_id;
    const boughtAmount = req.body.amount;
    const pid = req.body.pid;
    const date = new Date;
    const option ={
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const readableDate = date.toLocaleDateString('en-US', option);

    const customer = {
        customer_name,
        customer_id,
        boughtAmount,
        date: readableDate,
    }

    products.findById(pid)
    .then(result => {
        const product = result;

        product.customer.push(customer);

        product.save()
        .then(result => {
            res.status(201).json({
                message: "We got a new customer",
                data: result
            })
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getMyProduct = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    const seller_id = req.params.uid;
    let totalItems;
    
    products.find({
        "seller.seller_id": seller_id
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            "seller.seller_id": seller_id
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        next(err);
    })
}

exports.deleteMyProduct =(req, res, next) => {
    const pid = req.params.pid;

    products.findByIdAndDelete(pid)
    .then(result => {
        res.status(201).json({
            message: "Product deleted",
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.searchProductByName = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    const inputName = req.params.name;
    let totalItems;
    
    products.find({
        name: {
            $regex: inputName,
            $option: i
        }
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            name: {
                $regex: inputName,
            }
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        console.log(err);
    })
}

exports.searchProductByTag = (req, res, next) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    const inputTag = req.params.tag;
    let totalItems;

    products.find({
        tag: {
            $regex: inputTag,
        }
    })
    .countDocuments()
    .then(items => {
        totalItems = items;
        return products.find({
            tag: {
                $regex: inputTag,
            }
        })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
    })
    .then(result => {
        res.status(201).json({
            message: "Products found",
            data: result,
            total_items: totalItems,
            current_page: currentPage,
            per_page: perPage,
        });
    })
    .catch(err => {
        console.log(err)
    })
}

exports.stockLeft = (req, res, next) => {
    const boughtAmount = req.params.amount;
    const pid = req.params.pid;

    products.findByIdAndUpdate(pid, {
        $inc: { stock: -boughtAmount }
    }, { 
        new: true 
    })
    .then(result => {
        res.status(201).json({
            message: "Stock updated",
            data: result,
        })
    })
    .catch(err => {
        next(err)
    })
}