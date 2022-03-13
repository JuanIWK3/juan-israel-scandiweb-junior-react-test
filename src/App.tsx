import React from "react";
import Category from "./pages/Category";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/global";
import { CartItem } from "./interfaces";
import ProductPage from "./pages/Product";

class App extends React.Component {
  state = {
    cartItems: [] as CartItem[],
  };
  render() {
    return (
      <div className="App">
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="products">
              <Route path=":productId" element={<ProductPage />}></Route>
            </Route>
            <Route path="/" element={<Category />}></Route>
            <Route
              path="*"
              element={
                <main
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                  }}
                >
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
