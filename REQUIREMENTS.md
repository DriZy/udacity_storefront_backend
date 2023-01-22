# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index `'/products' [GET]`
- Show `'/products/:id' [GET]`
- Create [token secret required] `'/products' [POST] (token)`
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category `'/products/category/:category' [GET]`
- [ADDED] Delete [token secret required]: `'/products/:id'  [DELETE] (token)`


#### Users
- Index [token required] `'/users' [GET] (token)`
- Show [token required] `'/users/:id' [GET] (token)`
- Create [token required] `'/users' [POST] (token)`
- [ADDED] Delete [token required]: `'/users/:id' [DELETE] (token)`

#### Orders
- [ADDED] Index [token secret required] `'/orders' [GET] (token)`
- [ADDED] Show [token secret required] `'/orders/:id' [GET] (token)`
- [ADDED] Create [token secret required] `'/orders' [POST] (token)`
- Current Order by user (args: user id)[token required] `'/orders/current/:user_id' [GET] (token)`
- Completed Orders by user (args: user id)[token required]: `'/orders/completed/:user_id' [GET] (token)`
- [ADDED] Orders by user (args: user id)[token required]: `'/orders/user/:user_id/' [GET] (token)`
- [ADDED] Update order's status [token required]: `'/orders?status=<status>&orderId=<order id>' [PUT] (token)`
- [ADDED] Delete [token required]: `'/orders/:id' [DELETE] (token)`
- [ADDED] Add Product to order (args: order id) [token required]: `'/orders/:id/products' [POST] (token)`


## Data Shapes
#### Product
-  id
- name
- price
- category

`Table: products (id:serial[primary key], name:varchar(50)[not null], price:numeric[not null], category:varchar(50))`

#### User
- id
- firstName
- lastName
- password

`Table: users (id:serial[primary key], firstName:varchar(50)[not null], lastName:varchar(50)[not null], password:varchar(60)[not null])`

#### Order
- id
- user_id
- status of order (active or complete)

`Table: orders (id:serial[primary key], user_id:integer(foreign key to products table), status:enum(active, complete)[not null])`


#### Order_product
- id
- quantity_id
- order_id (id of the user crating the order)
- product_id (id of the product in an order)

`Table: order_products (id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer[default 1], user_id:integer(foreign key to users table)`

