import { useEffect, useState } from "react";

import "./Product.css";

const PRODUCT = {
  name: "Classy Modern Smart Watch",
  colors: [
    {
      name: "Purple",
      hex: "#8e44ad",
      image: "/assets/images/img1.jpeg",
    },
    {
      name: "Black",
      hex: "#2c3e50",
      image: "/assets/images/img2.jpeg",
    },

    {
      name: "Blue",
      hex: "#4c97d3",
      image: "/assets/images/img3.jpeg",
    },

    {
      name: "Teal",
      hex: "#1abc9c",
      image: "/assets/images/img4.jpeg",
    },
  ],
};

type Cart = {
  name: string;
  color: string;
  quantity: number;
  price: number;
  size: "S" | "M" | "L" | "XL";
};

const PRICE = {
  S: 79.0,
  M: 89.0,
  L: 99.0,
  XL: 109.0,
};

function Product() {
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState<Cart[]>([]);

  const [size, setSize] = useState("S");

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(0, quantity - 1));

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <>
      <main>
        <section className="product-container">
          <figure className="product-image">
            <img
              src={selectedColor.image}
              alt={PRODUCT.name}
              style={{ borderColor: selectedColor.hex }}
            />
          </figure>

          {/* Product Details */}
          <article className="product-details">
            <h1>Classy Modern Smart Watch</h1>

            {/* Reviews */}
            <section className="reviews">
              <p>⭐⭐⭐⭐⭐ (2 Reviews)</p>
            </section>

            {/* Price */}
            <section className="price">
              <p>
                <del>$99.00</del>
                <strong>$79.00</strong>
              </p>
            </section>

            {/* Product Description */}
            <section className="description">
              <p>
                I must explain to you how all this mistaken idea of denouncing
                pleasure and praising pain was born, and I will give you a
                complete account of the system.
              </p>
            </section>

            <section className="product-options">
              {/* Band Color */}
              <div>
                <h3>Band Color</h3>
                <ul className="color-options">
                  {PRODUCT.colors.map((color) => (
                    <li key={color.name}>
                      <button
                        style={{ backgroundColor: color.hex }}
                        onClick={() => setSelectedColor(color)}
                      >
                        {selectedColor.name === color.name ? "✓" : ""}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Wrist Size */}
              <div>
                <h3>Wrist Size</h3>
                <ul className="size-options">
                  {Object.keys(PRICE).map((sizeOption) => (
                    <li key={sizeOption}>
                      <button
                        className={size === sizeOption ? "selected-size" : ""}
                        onClick={() => setSize(sizeOption)}
                      >
                        <span>{sizeOption}</span> $
                        {PRICE[sizeOption as keyof typeof PRICE]}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Cart Controls */}
            <section className="cart-controls">
              <div className="quantity-control">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="add-to-cart"
                onClick={() => {
                  setCart([
                    ...cart,
                    {
                      name: PRODUCT.name,
                      color: selectedColor.name,
                      quantity,
                      price: PRICE[size as keyof typeof PRICE],
                      size: size as "S" | "M" | "L" | "XL",
                    },
                  ]);
                }}
                disabled={quantity === 0}
                style={{
                  cursor: quantity === 0 ? "not-allowed" : "pointer",
                }}
              >
                Add to Cart
              </button>
              <button type="button" aria-label="Like Product">
                &#x2661;
              </button>
            </section>
          </article>
        </section>
      </main>
      {/* Checkout */}

      <footer>
        <button type="button">
          Checkout{" "}
          <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
        </button>
      </footer>
    </>
  );
}

export default Product;
