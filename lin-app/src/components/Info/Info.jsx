import React from "react";

import AppContext from "../../context";

import styles from "./Info.module.scss";

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className={`${styles.cartEmpty} d-flex align-center justyfy-center flex-column flex`}>
      <img className={`mb-20 ${styles.box}`} width={120} src={image} alt="emptyCart" />
      <h2> {title} </h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
        <img src="/img/arrow.svg" alt="arrow" />
        Return back
      </button>
    </div>
  );
};

export default Info;
