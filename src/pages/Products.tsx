import { useEffect, useState } from "react";
import type { Product } from "../types/products";

type ProductsProps = {
  onAddToCart: (product: Product) => void;
};

function Products({ onAddToCart }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <main>
      <h2>Products</h2>

      <section>
        {products.map((product) => (
          <article key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price} kr</p>

            <button onClick={() => onAddToCart(product)}>Add to cart</button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Products;
