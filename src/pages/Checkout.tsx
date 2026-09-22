import { type SubmitEvent } from "react";
import { useState } from "react";
import { type Product } from "../data/products";

type CartItem = {
  product: Product;
  quantity: number;
};

type CheckoutProps = {
  cart: CartItem[];
};

function Checkout({ cart }: CheckoutProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    const order = {
      customer: {
        name: name,
        email: email,
        address: address,
        postalCode: postalCode,
        city: city,
      },
      items: cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      total: total,
    };

    console.log("Order:", order);

    setOrderPlaced(true);
  }

  return (
    <main>
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <section className="checkout">
            <h3>Your order</h3>

            <div className="checkout-items">
              {cart.map((item) => (
                <div className="checkout-item" key={item.product.id}>
                  <div>
                    <h4>{item.product.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>

                  <p>{item.product.price * item.quantity} kr</p>
                </div>
              ))}
            </div>

            <div className="checkout-total">
              <strong>Total</strong>
              <strong>{total} kr</strong>
            </div>
          </section>
          {orderPlaced ? (
            <h3>Order placed successfully!</h3>
          ) : (
            <form className="checkout-form" onSubmit={handleSubmit}>
              <h3>Customer information</h3>

              <label>
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              <label>
                Address
                <input
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
              </label>

              <label>
                Postal code
                <input
                  type="text"
                  value={postalCode}
                  onChange={(event) => setPostalCode(event.target.value)}
                  required
                />
              </label>

              <label>
                City
                <input
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  required
                />
              </label>

              <button type="submit">Place order</button>
            </form>
          )}
        </>
      )}
    </main>
  );
}

export default Checkout;
