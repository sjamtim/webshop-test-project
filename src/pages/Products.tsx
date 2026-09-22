import { products, type Product } from "../data/products";

type ProductsProps = {
  onAddToCart: (product: Product) => void;
};

function Products({ onAddToCart }: ProductsProps) {
  return (
    <main>
      <h2>Products</h2>

      <section>
        {products.map((product) => (
          <article key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} kr</p>

            <button onClick={() => onAddToCart(product)}>
              Add to cart
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Products;