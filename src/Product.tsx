import { useState } from "react";

import "./Product.css";

import Img1 from "./assets/images/img1.jpeg";

function Product() {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(0, quantity - 1));

  return (
    <>
      <main>
        <section className="product-container">
          <figure className="product-image">
            <img src={Img1} alt="Classy Modern Smart Watch" />
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

            {/* Product Specifications */}
            <section className="product-options">
              {/* Band Color */}
              <div>
                <h3>Band Color</h3>
                <ul className="color-options">
                  <li>
                    <button
                      style={{ backgroundColor: "#8e44ad" }}
                      aria-label="Purple Band"
                    ></button>
                  </li>
                  <li>
                    <button
                      style={{ backgroundColor: "#2c3e50" }}
                      aria-label="Black Band"
                    ></button>
                  </li>
                  <li>
                    <button
                      style={{ backgroundColor: "#1abc9c" }}
                      aria-label="Teal Band"
                    ></button>
                  </li>
                  <li>
                    <button
                      style={{ backgroundColor: "#4c97d3" }}
                      aria-label="Blue Band"
                    ></button>
                  </li>
                </ul>
              </div>

              {/* Wrist Size */}
              <div>
                <h3>Wrist Size</h3>
                <ul className="size-options">
                  <li>
                    <button>
                      <span>S</span> $69
                    </button>
                  </li>
                  <li>
                    <button>
                      <span>M</span> $79
                    </button>
                  </li>
                  <li>
                    <button>
                      <span>L</span> $89
                    </button>
                  </li>
                  <li>
                    <button>
                      <span>XL</span> $99
                    </button>
                  </li>
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
              <button type="button" className="add-to-cart">
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
          Checkout <span>2</span>
        </button>
      </footer>
    </>
  );
}

export default Product;
