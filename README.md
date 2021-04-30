# Large-File-Processor

Aim is to build a system which is able to handle long running processes in a distributed fashion.

---
## Steps to run Large File Processor

  1. Install Docker on your system, ignore if it is already installed
  2. Clone the Project in any diretory on your local machine
  3. Open terminal and go to the directory where project is cloned
  4. Run below commands to build and run the project
      - `docker build -t large-file-processor .`
      - `docker run -it -p 8080:3000 -d large-file-processor`

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
## API END-POINTS

  Server runs on PORT: 8080
      - API Link: `localhost/8080`
### Following are the API Links for performing different task in Large File Prcessor system
1. Import `products.csv` file to into `products` collection of MongoDB
    - API Link: `localhot/8080/api/products/import`
    - METHOD: **GET**
  
2. Get all the products from the database
    - API Link: `localhot/8080/api/products/fetchdata`
    - METHOD: **GET**
  
3. Update a product by `sku` field as primary key
    - API Link: `localhot/8080/api/products/:sku/update`
    - METHOD: **PUT**
  
4. Aggregate products by `no. of products` based on rows with same `name`
    - API Link: `localhot/8080/api/products/aggregate`
    - METHOD: **GET**
    ```javascript
    {
    "success": "Products aggregated",
    "status": 200,
    "data": [
        {
            "_id": "Kevin Brennan",
            "total": 1
        },
        {
            "_id": "Angela Thompson",
            "total": 1
        },
        {
            "_id": "Sarah Edwards",
            "total": 1
        },
        .
        .
        .
        ]
    }
    ```
  
5. Get product by id
    - API Link: `localhot/8080/api/products/:id`
    - METHOD: **GET**
  
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
  

  
