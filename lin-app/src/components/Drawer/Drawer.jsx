import React from "react";
import axios from "axios";

import styles from "./Drawer.module.scss";

import Info from "../Info/Info";
import { useCart } from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOoredId] = React.useState(null);
  const [isOrderCompete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6368f2a128cd16bba710a546.mockapi.io/orders",
        { items: cartItems }
      );
      setOoredId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://6368f2a128cd16bba710a546.mockapi.io/cart/` + item.id
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(item.id))
        );
        await delay(1000);
      }
    } catch (error) {
      console.log("Error creating order :((");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.draver}>
        <div className="d-flex justify-between">
          <h2 className="cu-p mb-30">Cart</h2>
          <img
            onClick={onClose}
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </div>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className={`${styles.cartItem} d-flex align-center mb-20`}
                >
                  <div
                    style={{
                      backgroundImage: `url(${obj.imageUrl})`,
                    }}
                    className={styles.cartItemImg}
                  ></div>

                  <div className="mb-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>
                      {obj.price}
                      rub.
                    </b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className={styles.removeBtn}
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>
                    {totalPrice}
                    rub.
                  </b>
                </li>
                <li>
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>
                    {(totalPrice / 100) * 5}
                    rub.
                  </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className={styles.greenButton}
              >
                Checkout
                <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderCompete ? "Order is processed" : "Cart is empty"}
            description={
              isOrderCompete
                ? `Your order #${orderId} will be delivered to courier soon`
                : "Add an item to your cart to place an order"
            }
            image={
              isOrderCompete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
