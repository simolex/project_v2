import { Suspense, useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { OrderPageAsync } from "./pages/OrderPage/OrderPage.async";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { OrderPageDetailsAsync } from "./pages/OrderPageDetails/OrderPageDetails.async";
import "./styles/index.scss";
import { AppContext, Theme } from "./theme/ThemeContext";
import { CarModal } from "./shared/ui/CarModal/CarModal";

const App = () => {
    const [theme, setTheme] = useState<Theme>("light");
    const { isCarModal, setIsCarModal } = useContext(AppContext);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const onCloseModal = useCallback(() => {
        setIsCarModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsCarModal(true);
    }, []);

    return (
        <div className={`app ${theme}`}>
            <button onClick={toggleTheme}>Тема</button>
            {/* <button onClick={onShowModal}>Окно</button> */}

            <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                    <Route path={"/order"} element={<OrderPageAsync />} />
                    <Route path={"/order/:id"} element={<OrderPageDetailsAsync />} />
                    <Route path={"/"} element={<MainPageAsync />} />
                </Routes>
            </Suspense>
            {isCarModal && <CarModal isOpen={isCarModal} onClose={onCloseModal} />}
        </div>
    );
};

export default App;
