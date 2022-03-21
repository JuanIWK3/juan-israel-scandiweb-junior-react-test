import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { cartLightImg } from "../../assets";
import Header from "../../components/Header";
import { IProduct, CartItem, CategoryElement } from "../../interfaces";
import { CATEGORY_QUERY, client } from "../../queries";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../state/actions/actions";
import { Container } from "./styles";

class Category extends Component<{
  currencyIndex: number;
  cart: { cartItems: CartItem[] };
  addCartItem: (product: IProduct) => void;
}> {
  state = {
    loading: true,
    error: false,
    categories: [] as CategoryElement[],

    overlayVisible: false,
  };

  toggleCartOverlay = () => {
    this.setState({ overlayVisible: !this.state.overlayVisible });
  };

  componentDidMount() {
    const getProductData = async () => {
      try {
        const response = await client.query({
          query: CATEGORY_QUERY,
        });

        this.setState({
          categories: response.data.categories as CategoryElement,
        });
        this.setState({ loading: response.loading });
      } catch (error) {
        this.setState({ error: true });
      }
    };
    getProductData();
  }

  render() {
    if (this.state.loading) {
      return <Container>Loading...</Container>;
    } else if (this.state.error) {
      return <Container>Loading Error</Container>;
    } else {
      return (
        <Container>
          <Header toggle={this.toggleCartOverlay as () => {}} />
          <Link to="/cart">GO TO CART</Link>
          {this.state.overlayVisible && <div className="dim-overlay"></div>}
          {this.state.categories.map((category) => {
            return (
              <div className="category" key={category.name}>
                <h1 className="category-name">
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </h1>
                <div className="products">
                  {category.products.map((product) => {
                    return (
                      <div className="product" key={product.id}>
                        <figure
                          className={!product.inStock ? "out-of-stock" : ""}
                        >
                          {!product.inStock && (
                            <Link to={`/products/${product.id}`}>
                              <div className="out-of-stock">OUT OF STOCK</div>
                            </Link>
                          )}
                          <div
                            className="circle"
                            onClick={() => {
                              if (product.inStock) {
                                this.props.addCartItem(product);
                              }
                            }}
                          >
                            <img src={cartLightImg} alt="" />
                          </div>
                          <Link to={`/products/${product.id}`}>
                            <div
                              className="product-image"
                              style={{
                                backgroundImage: `url(${product.gallery[0]}`,
                              }}
                            ></div>
                          </Link>
                        </figure>
                        <Link to={`/products/${product.id}`}>
                          <div className="content">
                            <p className="name">{product.name}</p>

                            <p className="price">
                              {
                                product.prices[this.props.currencyIndex]
                                  .currency.symbol
                              }
                              {product.prices[this.props.currencyIndex].amount}
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Container>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
