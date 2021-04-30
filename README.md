# Large-File-Processor

Aim is to build a system which is able to handle long running processes in a distributed fashion.

---
## Steps to run Large File Processor

  1. `docker build -t large-file-processor .`
  2. `docker run -it -p 8080:3000 -d large-file-processor`

---
## Product Schema
  - name
  - sku (Primary Key)
  - desription

```javascript
const productSchema = new Schema({

  name: { type: String, required: 'Product name cannot be left blank.' },

  sku:    { type: String, required: 'Product sku cannot be left blank.', unique: true },

  description: { type: String, required: 'Product description cannot be left blank.' }
});

module.exports = mongoose.model('Products', productSchema);

```
---
## Points to achieve

1. OOPs:
    - Used separate files for routes, models, controllers and coupled code together satisfying OOPs concept.


2. Regular non-blocking parallel ingestion of the given file into a table:
    - Used NodeJS as it provides non-blocking I/O operation in asynchronous manner.
    - Create a MongoDB database
    - Generate an application, to import CSV file using NodeJS
    - Install `Mongoose` module to connect and process data using mongoose application
    - Install `Fast-CSV` module to import CSV file using NodeJS into MongoDB collection


3. Updating existing products in the Products table based on `sku` as the primary key:
    - Made `sku` as primary key for the `product` schema
    - Find the product by `sku` field and update it


4. All product details are to be ingested into a single table
    - Importing `products.csv` file to a single table named as `products`


5. An aggregated table on above rows with `name` and `no. of products` as the columns
    - Aggregating table by `no. of products` based on rows with same `name`

---
## API Routes

Server runs on PORT: 8080
    - API Link: `localhost/8080`
Following are the API Links for performing different task in Large File Prcessor system
1. Import `products.csv` file to into `products` collection of MongoDB
    - API Link: `localhot/8080/api/products/import`
    - METHOD: **GET**
  ```javascript
    const importCSV = async (req, res) => {
      try {
          let  products  = []
          let csvStream = await fastcsv
          .parse()
          .on("data", function(data) {
              products.push({
              name: data[0],
              sku: data[1],
              description: data[2]
              });
          })
          .on("end", function() {
              // remove the first line: header
              products.shift();
              Product.insertMany(products, (err, res) => { if (err) throw err; });
          });
          stream.pipe(csvStream);
          success({
              message: `Data imported successfully.`,
              badge: true,
          });
          res.send({success : "Data imported successfully.", status : 200});
      } catch(err) {
          error({
              message: `Getting error on importing CSV`,
              badge: true,
          });
          res.send({error: "Getting error on importing CSV", status : 403});
      }
  }
  ```
2. Get all the products from the database
    - API Link: `localhot/8080/api/products/fetchdata`
    - METHOD: **GET**
  ```javascript
  const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        success({
            message: `Products fetched successfully`,
            badge: true,
        });
        res.send({success : "Products fetched successfully", status : 200, data: products});
    } catch(err) {
        error({
            message: `Error on getting products`,
            badge: true,
        });
        res.send({error: "Error on getting products", status : 403});
      }
  }
  ```
3. Update a product by `sku` field as primary key
    - API Link: `localhot/8080/api/products/:sku/update`
    - METHOD: **PUT**
  ```javascript
  const updateProduct = async (req, res) => {
    try {
        const productDets = req.body;
        const product = { sku: req.params.query };
        const updateTo = { $set: { name: productDets.name, sku: productDets.sku, description: productDets.description }};
        await Product.updateOne(product, updateTo);
        success({
            message: `Updated product detail successfully`,
            badge: true,
        });
        res.send({ success: "Updated product detail successfully", status: 200 });
    } catch(err) {
        error({
            message: `Error on updatig produt`,
            badge: true,
        });
        res.send({ error: "Error on updatig produt", status: 403});
      }
  }
  ```
4. Aggregate products by `no. of products` based on rows with same `name`
    - API Link: `localhot/8080/api/products/aggregate`
    - METHOD: **GET**
  ```javascript
  const aggregateProducts = async (req, res) => {
    try {
        const aggregatedProducts = await Product.aggregate([
            { $group: { _id: "$name", total: { $sum: 1 }}}
        ]);
        success({
            message: `Products aggregated`,
            badge: true,
        });
        res.send({success: "Products aggregated", status: 200, data: aggregatedProducts});
    } catch(err) {
        error({
            message: `Error on aggregating product`,
            badge: true,
        });
        res.send({ error: "Error on aggregating products", status: 403 });
      }
  }
  ```
5. Get product by id
    - API Link: `localhot/8080/api/products/:id`
    - METHOD: **GET**
  ```javascript
  const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById({_id: id});
        success({
            message: `Product fetched successfully`,
            badge: true,
        });
        res.send({success : "Product fetched successfully", status : 200, data: product});
    } catch(err) {
        error({
            message: `Error on getting product`,
            badge: true,
        });
        res.send({error: "Error on getting product", status : 403});
      }
  }
  ```
---
## Products table

|S.N.|NAME|SKU|DESCRIPTION|
|---|---|---|---|
|1|Bryce Jones|lay-raise-best-end|Art community floor adult your single type. Per back community former ...|
|2|John Robinson|cup-return-guess|Produce successful hot tree past action young song. Himself then tax e...|
|3|Theresa Taylor|step-onto|Choice should lead budget task. Author best mention.Often stuff profe...|
|4|Roger Huerta|citizen-some-middle|Important fight wrong position fine. Friend song interview glass pay. ...|
|5|John Buckley|term-important|Alone maybe education risk despite way. Want benefit manage financial ...|
|6|Tiffany Johnson|do-many-avoid|Born tree wind. Boy marriage begin value. Record health laugh ask unde...|
|7|Roy Golden DDS|help-return-art|Pm daughter thousand. Process eat employee have they example past. Inc...|
|8|David Wright|listen-enough-check|Under its near. Necessary education game everybody. Hospital upon suff...|
|9|Anthony Burch|anyone-executive|I lose positive manage reason option. Crime structure space both tradi...|
|10|Lauren Smith|grow-we-decide-job|Smile yet fear society theory help. Rather thing language skill since ...|

---
  

  
