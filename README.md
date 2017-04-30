# gBay_2 web API server REST

WebApi based on NodeJS + Express + MongoDB + Mongoose for GBay

## NPM Dependency

- mongoose : `4.7.2
- express: `4.15.2`
- body-parser: `1.17.1`
- jsonwebtoken: `7.3.0`

## Installation

1. Clone the repository `https://github.com/morty9/gBay_2.git`
2. Run `npm install`
3. Run database with : mongod --config $PATH
4. Run nodemon index.js

## Usage

### Endpoints

#### Users

##### Route: `localhost:$PORT/users`

HTTP Method | Route | Description | Need to be authenticated
--- | --- | --- | --- | ---
[GET] | `/users` | Getting all users | No
[GET] | `/users/:id` | Getting one user by id | No
[GET] | `/users/average/:id` | Getting average mark of a seller by id | No
[GET] | `/users/seller` | Getting all seller | No
[POST] | `/users` | Create a user with the request body (JSON Format) | No
[PUT] | `/users` | Update a user with the request body (JSON Format) | Yes 
[PUT] | `/users/:id/credit` | Update the credit of the user with the request body (JSON Format) | Yes
[DELETE] | `/users/:id` | Delete a user by id | Yes

#### Auth

##### Route: `localhost:$PORT/auth`

HTTP Method | Route | Description | Need to be authenticated
--- | --- | --- | --- | ---
[POST] | `/auth/login` | Authorize log the user in and return an authorization token in the request body (JSON Format) | No
[POST] | `/auth/logout` | Logout the user and delete the token if unexpired | Yes

#### Products

##### Route: `localhost:$PORT/products`

HTTP Method | Route | Description | Need to be authenticated
--- | --- | --- | --- | ---
[GET] | `/products` | Getting all products | No
[GET] | `/products/descprice` | Getting all products order by descending price | No
[GET] | `/products/ascprice` | Getting all products order by ascending price | No
[GET] | `/products/descdate` | Getting all products order by descending date | No
[GET] | `/products/ascdate` | Getting all products order by ascending date | No
[GET] | `/products/:id` | Getting the product by id | No
[GET] | `/products/categories/:id` | Getting all product by category | No
[GET] | `/products/seller/:id` | Getting all product by seller | No
[POST] | `/products` | Create a product with the request body (JSON Format) | Yes
[PUT] | `/products/:id` | Update a product with the request body (JSON Format) | Yes
[DELETE] | `/products/:id` | Delete a product by id | No

#### Orders

##### Route: `localhost:$PORT/orders`

HTTP Method | Route | Description | Need to be authenticated
--- | --- | --- | --- | ---
[GET] | `/orders` | Getting all orders | No
[GET] | `/orders/:id` | Getting the order by id | No
[GET] | `/orders/seller/:id` | Getting all order with the seller id | Yes
[POST] | `/orders` | Create a order with the request body (JSON Format) | Yes
[PUT] | `/orders/:id` | Update a order with the request body (JSON Format) | Yes
[DELETE] | `/orders/:id` | Delete a order by id | No

#### Opinions

##### Route: `localhost:$PORT/opinion`

HTTP Method | Route | Description | Need to be authenticated
--- | --- | --- | --- | ---
[GET] | `/opinion` | Getting all opinions | No
[GET] | `/opinion/:id` | Getting the opinion by id | No
[POST] | `/opinion` | Create a opinion with the request body (JSON Format) | Yes
[PUT] | `/opinion/:id` | Update a opinion with the request body (JSON Format) | Yes
[DELETE] | `/opinion/:id` | Delete a opinion by id | Yes

#### Category

##### Route: `localhost:$PORT/categories`

HTTP Method | Route | Description | Need to be authenticated
--- | --- | --- | --- | ---
[GET] | `/categories` | Getting all categories | No
[GET] | `/categories/:id` | Getting the category by id | No
[POST] | `/categories` | Create a category with the request body (JSON Format) | No
[PUT] | `/categories/:id` | Update a category with the request body (JSON Format) | No
[DELETE] | `/categories/:id` | Delete a category by id | No

#### Bid

##### Route: `localHost:$PORT/bids`

HTTP Method | Route | Description | Need to be authenticated
--- | --- | --- | --- | ---
[GET] | `/bids` | Getting all bids | No
[GET] | `/bids/:id` | Getting the bid by id | No
[GET] | `/bids/seller/:id` | Getting all bids by seller id | No
[POST] | `/bids` | Create a bid with the request body (JSON Format) | Yes
[PUT] | `/bids/:id` | Update a bid with information in the request body (JSON Format) | Yes
[PUT] | `/bids/bidding/:id` | Update the price for the bid with the request body (JSON Format) | Yes
[PUT] | `/bids/availability/:id` | Check if the date of the bid | No
[DELETE] | `/bids/:id` | Delete a bid by id | Yes

## Technical documentation

### Middlewares

Name | Description
--- | --- | ---
encryptUserData| Check the user data
ensureUserAuthenticated | jsonwebtoken | Ensure user is authenticated
ensureBidData | Check the bid data
ensureCategoryData | Check category data
ensureOpinionData | Check opinion data
ensureProductData | Check product data
ensureOrderData | | Check order data

## Contributing

## History

## Credits

- Bérangère LA TOUCHE
- Thomas PAIN-SURGET
- Hoang-Nam NGUYEN

## License

TODO: Write license

