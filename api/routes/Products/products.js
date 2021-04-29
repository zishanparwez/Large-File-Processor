const express = require('express');
const router = express.Router();
const { 
    importCSV, 
    getProducts, 
    updateProduct, 
    aggregateProducts,
    getProduct 
} = require('../../controllers/product-ctrl');


/* 
import CSV file (public/files/products.csv) to products collection of 
mongoDB database (mongodb://localhost:27017/large-file-processing)
END-POINT - localhost/3000/api/products/import
METHOD - GET
*/
router.get('/import', importCSV);

/*
fetch all products from the databasee
END-POINT - localhost/3000/api/products/fetchdata
METHOD - GET
*/
router.get('/fetchdata', getProducts);

/*
aggregate the products on the basis of number of product by same name
END-POINT - localhost/3000/api/products/aggregate
METHOD - GET
*/
router.get('/aggregate', aggregateProducts);

/*
get product details of Products
END-POINT - localhost/3000/api/products/:id
METHOD - GET
*/
router.get('/:id', getProduct);

/*
update product by sku field
END-POINT - localhost/3000/api/products/:query/update
METHOD - PUT
*/
router.put('/:query/update', updateProduct);

module.exports = router;
