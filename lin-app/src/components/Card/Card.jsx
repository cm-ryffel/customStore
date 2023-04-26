import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

import AppContext from "../../context";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  console.log(title);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 150 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="109" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="130" rx="5" ry="5" width="100" height="15" />
          <rect x="0" y="174" rx="5" ry="5" width="80" height="25" />
          <rect x="116" y="170" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {" "}
          <div className={styles.favorite} onClick={onClickFavorite}>
            {" "}
            <img
              src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
              alt="Unliked"
            />
          </div>
          <img width="100%" height={135} src={imageUrl} alt="odezda" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price:</span>
              <b>
                {price}
                rub.
              </b>
            </div>
            <img
              className={styles.plus}
              onClick={onClickPlus}
              src={
                isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
              }
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;