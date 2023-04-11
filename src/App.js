import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import styles from "./App.module.css";
function App() {
  return (
    <>
      <Header />
      <main className={styles.main_app}>
        {" "}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
