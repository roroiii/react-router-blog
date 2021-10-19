import { useState, useEffect } from "react";
import styled from "styled-components";
import LoginPage from "../../pages/LoginPage";
import AboutPage from "../../pages/AboutPage";
import HomePage from "../../pages/HomePage";
import ArticlesPage from "../../pages/ArticlesPage";
import ArticlePage from "../../pages/ArticlePage";
import NewPostPage from "../../pages/NewPostPage";
import RegisterPage from "../../pages/RegisterPage";
import Header from "../Header";
import Footer from "../Footer";
import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthContext } from "../../contexts";
import { getMe } from "../../api/WebAPI";
import { getAuthToken } from "../../utils";

const Root = styled.div`
  padding-top: 64px;
  margin: 0 auto;
`;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (getAuthToken() !== "") {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <ScrollToTop />
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/new-post">
              <NewPostPage />
            </Route>
            <Route path="/articles">
              <ArticlesPage />
            </Route>
            <Route path="/article/:id" children={<ArticlePage />} />
          </Switch>
          <Footer />
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
