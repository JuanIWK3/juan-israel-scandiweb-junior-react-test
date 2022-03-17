import React from "react";
import { Link } from "react-router-dom";

import { cartLightImg } from "../../assets";
import Header from "../../components/Header";
import { Product, CartItem, CategoryElement } from "../../interfaces";
import { CATEGORY_QUERY, client } from "../../queries";
import { Container } from "./styles";

export default class Category extends React.Component {
  state = {
    loading: true,
    error: false,
    categories: [] as CategoryElement[],
    cartItems:
      (JSON.parse(localStorage.getItem("cartItems")!) as CartItem[]) ||
      ([] as CartItem[]),
    overlayVisible: false,
    toggleCartOverlay: () => {
      this.setState({ overlayVisible: !this.state.overlayVisible });
    },
    addToCart: (product: Product) => {
      let tempCartItems = this.state.cartItems;

      if (tempCartItems.length === 0) {
        tempCartItems.push({ product: product, quantity: 1 });
        this.setState({ cartItems: tempCartItems });
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));

        return;
      }

      for (let i = 0; i < tempCartItems.length; i++) {
        if (tempCartItems[i].product.id === product.id) {
          tempCartItems[i].quantity += 1;
          this.setState({ cartItems: tempCartItems });
          localStorage.setItem(
            "cartItems",
            JSON.stringify(this.state.cartItems)
          );

          return;
        }
      }

      tempCartItems.push({ product: product, quantity: 1 });
      this.setState({ cartItems: tempCartItems });
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));

      return;
    },
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
          <Header
            toggle={this.state.toggleCartOverlay as () => {}}
            cartItems={this.state.cartItems}
          />
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
                                this.state.addToCart(product);
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
                              {product.prices[0].currency.symbol}
                              {product.prices[0].amount}
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
