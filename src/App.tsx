import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './queries';

import Category from './pages/Category';
import Cart from './pages/Cart';
import ProductPage from './pages/Product';

import GlobalStyle from './styles/global';
import { Test } from './pages/test';

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <GlobalStyle />
          <Router>
            <Routes>
              <Route path="products">
                <Route path=":productId" element={<ProductPage />} />
              </Route>
              <Route path="/" element={<Category />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/test" element={<Test />} />
              <Route
                path="*"
                element={
                  <div className="empty-page">
                    <p>There is nothing here!</p>
                  </div>
                }
              />
            </Routes>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
