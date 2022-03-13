import React from "react";
import Category from "./pages/Category";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/global";
import { CartItem } from "./interfaces";

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
            <Route path="category" element={<Category />}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
