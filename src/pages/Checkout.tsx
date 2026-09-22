import { type SubmitEvent } from "react";
import { type Product } from "../data/products";

type CartItem = {
  product: Product;
  quantity: number;
};

type CheckoutProps = {
  cart: CartItem[];
};

function Checkout({ cart }: CheckoutProps) {
  const total = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

function handleSubmit(event: SubmitEvent) {
  event.preventDefault();

  console.log("Order submitted!");
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

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Customer information</h3>

            <label>
              Name
              <input type="text" />
            </label>

            <label>
              Email
              <input type="email" />
            </label>

            <label>
              Address
              <input type="text" />
            </label>

            <label>
              Postal code
              <input type="text" />
            </label>

            <label>
              City
              <input type="text" />
            </label>

            <button type="submit">Place order</button>
          </form>
        </>
      )}
    </main>
  );
}

export default Checkout;
