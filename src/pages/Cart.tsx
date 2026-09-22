import { Link } from "react-router";
import { type Product } from "../data/products";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartProps = {
  cart: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
};

function Cart({ cart, onIncrease, onDecrease }: CartProps) {
  return (
    <main>
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
                <button onClick={() => onDecrease(item.product.id)}>-</button>

                <span>{item.quantity}</span>

                <button onClick={() => onIncrease(item.product.id)}>+</button>
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
        {cart.length > 0 && <Link to="/checkout">Continue to checkout</Link>}
      </section>
    </main>
  );
}

export default Cart;
