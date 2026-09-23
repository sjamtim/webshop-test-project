# TestShop

TestShop is a small full-stack webshop project built as a learning project.

The goal of the project was to learn how a modern web application works from frontend to backend and database, including API communication, PostgreSQL, order handling, transactions, error handling, and Git workflows.

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* `localStorage`

### Backend

* Node.js
* Express
* TypeScript
* `pg`
* CORS
* dotenv

### Database

* PostgreSQL

### Development

* Git
* Git branches
* Firefox DevTools

## Features

* Browse products loaded from the backend API
* Add products to a shopping cart
* Increase and decrease product quantities
* Shopping cart persists after page refresh
* Checkout form
* Create orders through the REST API
* Store orders and order items in PostgreSQL
* Backend calculates the order total from database prices
* Database transactions using `BEGIN`, `COMMIT`, and `ROLLBACK`
* Backend validation of order data
* Frontend error handling for failed requests
* Successful orders clear the shopping cart
* Order confirmation after successful checkout

## Architecture

The application is split into three main parts:

```text
React frontend
      |
      | HTTP / REST API
      ↓
Express backend
      |
      | SQL
      ↓
PostgreSQL database
```

The frontend is responsible for the user interface and shopping cart state.

The backend is responsible for the API, validation, order processing, and calculating the correct order total.

PostgreSQL stores the products, orders, and order items.

## Database Structure

The database contains three main tables:

```text
products
   |
   | 1
   |
   | *
order_items
   |
   | *
   |
   | 1
orders
```

### `products`

Stores the products available in the webshop.

### `orders`

Stores customer information and the total price of each order.

### `order_items`

Connects products to orders and stores the quantity and price used for each order item.

The price is stored on `order_items` so that an order keeps the price that was used when the order was placed.

## Order Processing

When a customer places an order, the backend starts a database transaction:

```text
BEGIN
  ↓
Create order
  ↓
Validate products
  ↓
Create order items
  ↓
Calculate total from database prices
  ↓
Update order total
  ↓
COMMIT
```

If something goes wrong:

```text
BEGIN
  ↓
Something fails
  ↓
ROLLBACK
  ↓
No partial order is saved
```

This was tested by sending an invalid product ID and verifying that neither the order nor its order items were persisted.

## Running the Project

### Prerequisites

You need:

* Node.js
* pnpm
* PostgreSQL

### Backend

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
pnpm install
```

Create a `.env` file containing the PostgreSQL connection settings:

```env
DB_USER=your_user
DB_HOST=localhost
DB_NAME=testshop
DB_PASSWORD=your_password
DB_PORT=5432
```

Compile the TypeScript:

```bash
pnpm exec tsc
```

Start the backend:

```bash
node dist/server.js
```

The API runs on:

```text
http://localhost:3000
```

### Frontend

From the project root:

```bash
pnpm install
```

Start the Vite development server:

```bash
pnpm dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

## API

### Get products

```http
GET /api/products
```

Returns the products stored in PostgreSQL.

### Create order

```http
POST /api/orders
```

Creates an order and its order items.

The backend does not trust the total sent by the frontend. Instead, it retrieves the product prices from PostgreSQL and calculates the total itself.

## What I Learned

This project helped me understand the complete flow of a full-stack application:

```text
User
 ↓
React
 ↓
HTTP request
 ↓
Express API
 ↓
PostgreSQL
 ↓
HTTP response
 ↓
React
 ↓
User
```

I also learned about:

* React state and effects
* TypeScript types
* REST APIs
* HTTP status codes
* JSON requests and responses
* PostgreSQL relationships
* Foreign keys
* Database transactions
* Backend validation
* Error handling
* Environment variables
* CORS
* Git feature branches and commits
* Persisting frontend state with `localStorage`

## Project Status

TestShop is a completed learning project.

The project was intentionally kept relatively small so that the focus could remain on understanding the full-stack development workflow rather than building a production-scale webshop.
