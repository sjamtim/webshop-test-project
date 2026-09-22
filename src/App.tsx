import "./App.css";

import { type Product } from "./data/products";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
    [],
  );
  function addToCart(product: Product) {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  }

  function decreaseQuantity(productId: number) {
    setCart(
      cart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
  function increaseQuantity(productId: number) {
    setCart(
      cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }

  return (
    <BrowserRouter>
      <div>
        <header>
          <h1>TestShop</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">
              Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
            </Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/products"
            element={<Products onAddToCart={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
            }
          />
          <Route path="/checkout" element={<Checkout cart={cart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
