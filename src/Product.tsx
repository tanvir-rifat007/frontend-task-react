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

  const [showModal, setShowModal] = useState(false);

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

            <section className="product-type-model">
              <div>
                <p>Type</p>
                <span>Watch</span>
              </div>

              <div>
                <p>Model Number</p>
                <span>Forerunner 290XT</span>
              </div>
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
                        <span>{sizeOption}</span>
                        <span>${PRICE[sizeOption as keyof typeof PRICE]}</span>
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
                  data-testid="quantity-input"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={increaseQuantity}
                  data-testid="increase-quantity"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="add-to-cart"
                onClick={() => {
                  const existingItemIndex = cart.findIndex(
                    (item) =>
                      item.name === PRODUCT.name &&
                      item.color === selectedColor.name &&
                      item.size === size,
                  );

                  // if already in cart, update the quantity

                  if (existingItemIndex !== -1) {
                    const updatedCart = [...cart];
                    const existingItem = updatedCart[existingItemIndex];
                    updatedCart[existingItemIndex] = {
                      ...existingItem,
                      quantity: existingItem.quantity + quantity,
                      price:
                        existingItem.price +
                        PRICE[size as keyof typeof PRICE] * quantity,
                    };
                    setCart(updatedCart);
                  } else {
                    // Add a new item to the cart
                    setCart([
                      ...cart,
                      {
                        name: PRODUCT.name,
                        color: selectedColor.name,
                        quantity,
                        price: PRICE[size as keyof typeof PRICE] * quantity,
                        size: size as "S" | "M" | "L" | "XL",
                      },
                    ]);
                  }
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
        <button
          onClick={() => setShowModal(true)}
          type="button"
          disabled={cart.length === 0}
          style={{
            cursor: cart.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Checkout{" "}
          <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
        </button>
      </footer>

      {showModal && (
        <div id="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <section className="cart">
              <h2>Your Cart</h2>

              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Qnt</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.name + item.color + item.size}>
                      <td>
                        <img
                          src={
                            item.color === "Purple"
                              ? "/assets/images/img1.jpeg"
                              : item.color === "Black"
                                ? "/assets/images/img2.jpeg"
                                : item.color === "Blue"
                                  ? "/assets/images/img3.jpeg"
                                  : "/assets/images/img4.jpeg"
                          }
                          alt="Classy Modern Smart Watch"
                        />
                        Classy Modern Smart Watch
                      </td>
                      <td>{item.color}</td>
                      <td>
                        <strong>{item.size}</strong>
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        <strong>${item.price.toFixed(2)}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3}>Total</td>
                    <td>
                      <strong>
                        {cart.reduce((acc, item) => acc + item.quantity, 0)}
                      </strong>
                    </td>
                    <td>
                      <strong>
                        $
                        {cart
                          .reduce((acc, item) => acc + item.price, 0)
                          .toFixed(2)}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>

              <div className="cart-actions">
                <button type="button">Continue Shopping</button>
                <button type="button" className="checkout">
                  Checkout
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
