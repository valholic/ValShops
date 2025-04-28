const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

//Image location
app.use('/public/profilePictures', express.static(path.join(__dirname, '/public/profilePictures')));
app.use('/public/productImages', express.static(path.join(__dirname, '/public/productImages')));
app.use('/public/reviewImages', express.static(path.join(__dirname, '/public/reviewImages')));

// Set-up multer for image
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'profile_picture') {
            cb(null, 'public/profilePictures');
        } else if(file.fieldname === 'review_image') {
            cb(null, 'public/reviewImages');
        } else if(file.fieldname === 'product_images') {
            switch(req.body.type) {
                case "Cosmetic":
                    cb(null, 'public/productImages/cosmetics')
                    break;
                case "Decor":
                    cb(null, 'public/productImages/decors')
                    break;
                case "Drink":
                    cb(null, 'public/productImages/drinks')
                    break;
                case "Electronic":
                    cb(null, 'public/productImages/electronics')
                    break;
                case "Fashion":
                    cb(null, 'public/productImages/fashions')
                    break;
                case "Food":
                    cb(null, 'public/productImages/foods')
                    break;
                case "Furniture":
                    cb(null, 'public/productImages/furnitures')
                    break;
                case "Health":
                    cb(null, 'public/productImages/healths')
                    break;
                case "Sport":
                    cb(null, 'public/productImages/sports')
                    break;
            }
        }
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
})

app.use(
    multer(
        {
            storage: fileStorage,
            fileFilter
        }
    )
    .fields(
        [
            {
                name: 'profile_picture',
                maxCount: 1
            },
            {
                name: 'product_images',
                maxCount: 10
            },
            {
                name: 'review_image',
                maxCount: 1
            }
        ]
    )
)

// Import routes
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/product');
const chatRoutes = require('./src/routes/chat');

// Set-up body-parser
app.use(bodyParser.json());

// CORS Origin Error Handle
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Config routes
app.use('/v1/auth', authRoutes);
app.use('/v1/product', productRoutes);
app.use('/v1/chat', chatRoutes);

// Error handle
app.use((err, req, res, next) => {
    const status = err.errorStatus || 500;
    const message = err.message;
    const data = err.data;

    res.status(status).json({
        message,
        data
    })
});

mongoose.connect('mongodb+srv://valholic_123:vGyYrsl1rsw5Iilz@cluster0.sgw83pg.mongodb.net/valShop?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    app.listen(port, () => {
        console.log(`Listening at port ${port}`)
    })
})
.catch(err => {
    console.log(err);
});