import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { CartItem, IProduct } from "../../interfaces";
import { client, PRODUCT_QUERY } from "../../queries";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../state/actions/actions";
import { AttrButton, Container } from "./styles";

class Product extends Component<{
  currencyIndex: number;
  cart: { cartItems: CartItem[] };
}> {
  state = {
    loading: true,
    error: false,
    product: {} as IProduct,
    overlayVisible: false,
    selectedImage: "",
    selectedColor: "Select",
    selectedCapacity: "Select",
  };

  toggleCartOverlay = () => {
    this.setState({ overlayVisible: !this.state.overlayVisible });
  };

  addToCart = (product: IProduct) => {
    let tempCartItems = this.props.cart.cartItems;

    if (tempCartItems.length === 0) {
      tempCartItems.push({ product: product, quantity: 1 });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(this.props.cart.cartItems)
      );

      return;
    }

    for (let i = 0; i < tempCartItems.length; i++) {
      if (tempCartItems[i].product.id === product.id) {
        tempCartItems[i].quantity += 1;

        localStorage.setItem(
          "cartItems",
          JSON.stringify(this.props.cart.cartItems)
        );

        return;
      }
    }

    tempCartItems.push({ product: product, quantity: 1 });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(this.props.cart.cartItems)
    );

    return;
  };

  componentDidMount() {
    const getProductData = async () => {
      const params = window.location.pathname.split("/")[2];
      try {
        const response = await client.query({
          query: PRODUCT_QUERY,
          variables: {
            productId: params,
          },
        });

        //* Before Loading */

        this.setState({ product: response.data.product as Product });
        this.setState({ selectedImage: this.state.product.gallery[0] });

        //* === */

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
        <>
          <Header toggle={this.toggleCartOverlay as () => {}} />
          <Container>
            {this.state.overlayVisible && <div className="dim-overlay"></div>}
            <main>
              <div className="gallery">
                <div className="images-list">
                  {this.state.product.gallery.map((image, index) => {
                    return (
                      <figure key={index}>
                        <div
                          className="image"
                          style={{ backgroundImage: `url(${image})` }}
                        />
                      </figure>
                    );
                  })}
                </div>
                <div
                  className="selected-image"
                  style={{
                    backgroundImage: `url(${this.state.selectedImage})`,
                  }}
                />
              </div>
              <div className="content">
                <div className="brand">{this.state.product.brand}</div>
                <div className="name">{this.state.product.name}</div>
                <div className="options">
                  {this.state.product.attributes.map((attribute) => {
                    return (
                      <div
                        key={attribute.name}
                        className={"attr " + attribute.type}
                      >
                        <div className="attr-name">
                          <p>{attribute.name}</p>
                          {attribute.name == "Color" && (
                            <p className="selected-value">
                              {" "}
                              {`: ${this.state.selectedColor}`}
                            </p>
                          )}
                          {attribute.name == "Capacity" && (
                            <p className="selected-value">
                              {" "}
                              {`: ${this.state.selectedCapacity}`}
                            </p>
                          )}
                        </div>
                        <div className="attr-values">
                          {attribute.items.map((item, index) => {
                            return (
                              <AttrButton
                                attrColor={item.value}
                                key={index}
                                onClick={() => {
                                  switch (attribute.name) {
                                    case "Color":
                                      this.setState({
                                        selectedColor: item.displayValue,
                                      });
                                      break;
                                    case "Capacity":
                                      this.setState({
                                        selectedCapacity: item.displayValue,
                                      });
                                      break;
                                  }
                                }}
                                className={
                                  attribute.type == "swatch"
                                    ? "attr-value swatch"
                                    : "attr-value"
                                }
                              >
                                {attribute.type !== "swatch" && (
                                  <div>{item.value}</div>
                                )}
                              </AttrButton>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="price-wrapper">
                  <div className="price">PRICE:</div>
                  <div className="amount">
                    {
                      this.state.product.prices[this.props.currencyIndex]
                        .currency.symbol
                    }{" "}
                    {this.state.product.prices[this.props.currencyIndex].amount}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (this.state.product) {
                      this.addToCart(this.state.product);
                    }
                  }}
                  className={
                    this.state.product.inStock
                      ? "add-to-cart"
                      : "add-to-cart out-of-stock"
                  }
                >
                  {this.state.product.inStock ? "Add to Cart" : "OUT OF STOCK"}
                </button>
                <div className="description"></div>
              </div>
            </main>
          </Container>
        </>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
