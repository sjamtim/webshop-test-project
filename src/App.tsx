import "./App.css";
import { products, type Product } from "./data/products";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>(
    [],
  );
  const [view, setView] = useState<"products" | "cart">("products");
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
    <div>
      <header>
        <h1>TestShop</h1>
        <nav>
          <button onClick={() => setView("products")}>Products</button>
          <button onClick={() => setView("cart")}>
            Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </button>
        </nav>
      </header>

      <main>
        {view === "products" && (
          <>
            <h2>Products</h2>

            <section>
              {products.map((product) => (
                <article key={product.id}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>{product.price} kr</p>
                  <button onClick={() => addToCart(product)}>
                    Add to cart
                  </button>
                </article>
              ))}
            </section>
          </>
        )}

        {view === "cart" && (
          <section className="cart">
            <h2>Cart</h2>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div className="cart-item" key={item.product.id}>
                  <div className="cart-item-info">
                    <h3>{item.product.name}</h3>
                    <p>{item.product.price} kr</p>
                  </div>

                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(item.product.id)}>
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.product.id)}>
                      +
                    </button>
                  </div>
                </div>
              ))
            )}

            <p>
              Total:{" "}
              {cart.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0,
              )}{" "}
              kr
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
