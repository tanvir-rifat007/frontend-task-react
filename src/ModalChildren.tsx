import { PropsWithChildren } from "react";
import Modal from "./Modal";
import { Cart } from "./cart";

const ModalChildren = ({
  setShowModal,
  cart,
}: PropsWithChildren<{
  setShowModal: (showModal: boolean) => void;
  cart: Cart[];
}>) => {
  return (
    <Modal>
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
    </Modal>
  );
};

export default ModalChildren;
