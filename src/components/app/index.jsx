import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../header";
import { Logo } from "../logo";
import { Search } from "../search";
import { Footer } from "../footer";
import api from "../../utils/api";
import { useDebounce } from "../../hooks/useDebounce";
import { ProductPage } from "../../pages/product-page";
import { CatalogPage } from "../../pages/catalog-page";

import { NotFoundPage } from "../../pages/not-found-page";
import { FavoritesPage } from "../../pages/favorite-page";
import { ThemeContext } from "../../contexts/theme-context";
import { themes } from "../../contexts/theme-context";
import { Modal } from "../modal";
import { Register } from "../register";
import { Login } from "../login";
import { ResetPassword } from "../reset-password";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../storage/products/products-slice";
import { fetchUser } from "../../storage/user/user-slice";


export function App() {
  const cards = useSelector((state) => state.products.data);
  const currentUser = useSelector((state) => state.user.data);
  const isLoadingUser = useSelector((state) => state.user.loading);
  const isLoading = useSelector((state) => state.products.loading);
  const [searchQuery, setSearchQuery] = useState("");

  const [theme, setTheme] = useState(themes.light);
  const [currentSort, setCurrentSort] = useState("");
  const dispatch = useDispatch();

  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const navigate = useNavigate();

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath;

  // const onCloseModalForm = () => {
  //   setModalFormStatus(false)
  // }

  const onCloseRoutingModal = () => {
    navigate(initialPath || "/", { replace: true });
  };

  function handleRequest() {
    // const filterCards = dataCard.filter(item => item.name.includes(searchQuery))
    // setCards(filterCards)

    api.search(debounceSearchQuery).then((dataSearch) => {
      // setCards(dataSearch)
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
  }

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate).then((updateUser) => {
      // setcurrentUser(updateUser)
    });
  }
  
  useEffect(() => {
    handleRequest();
  }, [debounceSearchQuery]);

  useEffect(() => {
    dispatch(fetchUser()).then(() => {
      dispatch(fetchProducts());
    });
  }, []);

  function toggleTheme() {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  }

  const cbSubmitFormRegister = (dataForm) => {
    console.log("cbSubmitFormRegister", dataForm);
  };
  const cbSubmitFormLogin = (dataForm) => {
    console.log("cbSubmitFormLogin", dataForm);
  };
  const cbSubmitFormResetPassword = (dataForm) => {
    console.log("cbSubmitFormResetPassword", dataForm);
  };

  const handleClickButtonLogin = (e) => {
    e.preventDefault();
    navigate("/login", {
      replace: true,
      state: { backgroundLocation: { ...location, state: null }, initialPath },
    });
  };
  const handleClickButtonReset = (e) => {
    e.preventDefault();
    navigate("/reset-password", {
      replace: true,
      state: { backgroundLocation: { ...location, state: null }, initialPath },
    });
  };
  const handleClickButtonRegister = (e) => {
    e.preventDefault();
    navigate("/register", {
      replace: true,
      state: { backgroundLocation: { ...location, state: null }, initialPath },
    });
  };
  const handleClickButtonResetPage = (e) => {
    e.preventDefault();
    navigate("/reset-password");
  };
  const handleClickButtonRegisterPage = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  const handleClickButtonLoginPage = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <ThemeContext.Provider value={{ theme: themes.light, toggleTheme }}>
      <Header user={currentUser}>
        <Routes
          location={
            (backgroundLocation && {
              ...backgroundLocation,
              pathname: initialPath,
            }) ||
            location
          }
        >
          <Route
            path="/"
            element={
              <>
                <Logo href="/" />
                <Search
                  handleFormSubmit={handleFormSubmit}
                  handleInputChange={handleInputChange}
                />
              </>
            }
          />
          <Route path="*" element={<Logo href="/" />} />
        </Routes>
      </Header>
      <main
        className="content container"
        style={{ backgroundColor: theme.background }}
      >
        <Routes
          location={
            (backgroundLocation && {
              ...backgroundLocation,
              pathname: initialPath,
            }) ||
            location
          }
        >
          <Route path="/" element={ <CatalogPage /> } />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/faq" element={<FavoritesPage />} />
          <Route path="/product/:productID" element={<ProductPage />} />
          <Route
            path="/register"
            element={
              <Register
                onSubmit={cbSubmitFormRegister}
                onNavigateLogin={handleClickButtonLoginPage}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                onSubmit={cbSubmitFormLogin}
                onNavigateRegister={handleClickButtonRegisterPage}
                onNavigateReset={handleClickButtonResetPage}
              />
            }
          />
          <Route
            path="/reset-password"
            element={<ResetPassword onSubmit={cbSubmitFormResetPassword} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      {backgroundLocation && (
        <Routes>
          <Route
            path="/register"
            element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <Register
                  onSubmit={cbSubmitFormRegister}
                  onNavigateLogin={handleClickButtonLogin}
                />
              </Modal>
            }
          />
          <Route
            path="/login"
            element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <Login
                  onSubmit={cbSubmitFormLogin}
                  onNavigateRegister={handleClickButtonRegister}
                  onNavigateReset={handleClickButtonReset}
                />
              </Modal>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Modal isOpen onClose={onCloseRoutingModal}>
                <ResetPassword onSubmit={cbSubmitFormResetPassword} />
              </Modal>
            }
          />
        </Routes>
      )}
    </ThemeContext.Provider>
  );
}
