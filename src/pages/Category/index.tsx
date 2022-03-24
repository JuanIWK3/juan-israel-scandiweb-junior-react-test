import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { cartLightImg } from "../../assets";

import Header from "../../components/Header";

import {
  Product,
  CartItem,
  CategoryElement,
  Attribute,
  SelectedAttribute,
} from "../../interfaces";

import { ALL_ITEMS_QUERY, CATEGORY_QUERY, client } from "../../queries";

import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../state/actions/actions";

import { Container } from "./styles";

class Category extends Component<{
  currencyIndex: number;
  categoryIndex: number;
  cart: { cartItems: CartItem[] };
  addCartItem: (product: Product) => void;
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
          query: ALL_ITEMS_QUERY,
        });

        this.setState({
          categories: response.data.categories as CategoryElement,
        });
        console.log(this.state.categories);

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
          {this.state.overlayVisible && <div className="dim-overlay"></div>}

          <div
            className="category"
            key={this.state.categories[this.props.categoryIndex].name}
          >
            <h1 className="category-name">
              {this.state.categories[this.props.categoryIndex].name
                .charAt(0)
                .toUpperCase() +
                this.state.categories[this.props.categoryIndex].name.slice(1)}
            </h1>
            <div className="products">
              {this.state.categories[this.props.categoryIndex].products.map(
                (product) => {
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
                          <p className="name">{`${product.brand} ${product.name}`}</p>
                          {product.category}

                          <p className="price">
                            {
                              product.prices[this.props.currencyIndex].currency
                                .symbol
                            }
                            {product.prices[this.props.currencyIndex].amount}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </Container>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
