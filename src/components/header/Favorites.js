import styles from "./Favorites.module.css";
const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favoriteCities"));
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Favorite Cities | Temperature today</h1>
      <div className={styles.cities_container}>
        {favorites &&
          favorites.map((city) => (
            <div className={styles.city}>
              <p className={styles.city__name}>{city.name}</p>
              <img src={city.imageUrl} alt={city.name} />
              <p className={styles.city__temperature}>{city.temperature}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Favorites;
