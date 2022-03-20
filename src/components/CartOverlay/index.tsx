import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { cartImg, minusImg, plusImg } from "../../assets";
import { CartItem } from "../../interfaces";
import { mapDispatchToProps, mapStateToProps } from "../../state/actions";

import { Badge, Container, Icon } from "./styles";

class CartOverlay extends Component<{
  cartItems: CartItem[];
  toggleDim: () => {};
  currencyOpen: boolean;
  toggleCurrencyMenu: () => void;
  currencyIndex: number;
}> {
  state = {
    total: "",
    overlayVisible: false,
  };

  calculateTotal = () => {
    let sum = 0;
    if (this.props.cartItems) {
      if (!this.props.cartItems.length) {
        return;
      }
      for (let i = 0; i < this.props.cartItems.length; i++) {
        sum += this.props.cartItems[i].product.prices[0].amount;
      }
      return `${this.props.cartItems[0].product.prices[0].currency.symbol} ${sum}`;
    }
    return;
  };

  increment = (index: number) => {
    this.setState({
      cartItem: [this.props.cartItems[index].quantity++],
    });
    localStorage.setItem("cartItems", JSON.stringify(this.props.cartItems));
  };

  toggleCartOverlay = () => {
    if (!this.state.overlayVisible && this.props.currencyOpen) {
      this.props.toggleCurrencyMenu();
    }
    this.setState({ overlayVisible: !this.state.overlayVisible });
  };

  decrement = (index: number) => {
    let tempCartItems = this.props.cartItems;

    if (tempCartItems[index].quantity === 1) {
      tempCartItems.splice(index, 1);
      this.setState({ cartItems: tempCartItems });
      localStorage.setItem("cartItems", JSON.stringify(this.props.cartItems));

      return;
    }

    tempCartItems[index].quantity--;

    this.setState({ cartItems: tempCartItems });
    localStorage.setItem("cartItems", JSON.stringify(this.props.cartItems));
  };

  componentDidMount() {
    this.setState({ total: this.calculateTotal() });
  }

  componentDidUpdate() {
    if (this.state.overlayVisible && this.props.currencyOpen) {
      this.toggleCartOverlay();
      this.props.toggleDim();
    }
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <Icon>
          <Badge>
            <div>{this.props.cartItems.length}</div>
          </Badge>
          <img
            style={{ cursor: "pointer", padding: "5px 11px", zIndex: 2 }}
            onClick={() => {
              this.props.toggleDim();
              this.toggleCartOverlay();
            }}
            src={cartImg}
            alt=""
          />
        </Icon>
        {this.state.overlayVisible && (
          <>
            <Container>
              <p className="title">
                <strong>My Bag</strong>, {this.props.cartItems.length}{" "}
                {this.props.cartItems.length == 1 ? "item" : "items"}{" "}
              </p>
              {this.props.cartItems.map((cartItem, index) => (
                <div className="cart-item" key={cartItem.product.id}>
                  <div className="content">
                    <p>{cartItem.product.name}</p>
                    <p>
                      {
                        cartItem.product.prices[this.props.currencyIndex]
                          .currency.symbol
                      }
                      {cartItem.product.prices[this.props.currencyIndex].amount}
                    </p>
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.0687 17.168C11.4247 17.168 10.8274 17.0467 10.2767 16.804C9.72608 16.5613 9.25008 16.23 8.84874 15.81L9.54874 14.998C9.87541 15.3433 10.2581 15.6233 10.6967 15.838C11.1447 16.0433 11.6067 16.146 12.0827 16.146C12.6894 16.146 13.1607 16.0107 13.4967 15.74C13.8327 15.46 14.0007 15.096 14.0007 14.648C14.0007 14.4147 13.9587 14.2187 13.8747 14.06C13.8001 13.892 13.6927 13.752 13.5527 13.64C13.4221 13.5187 13.2634 13.4113 13.0767 13.318C12.8901 13.2247 12.6894 13.1267 12.4747 13.024L11.1587 12.45C10.9441 12.3567 10.7247 12.2447 10.5007 12.114C10.2767 11.9833 10.0761 11.8247 9.89874 11.638C9.72141 11.4513 9.57674 11.232 9.46474 10.98C9.35274 10.7187 9.29674 10.42 9.29674 10.084C9.29674 9.73867 9.36674 9.41667 9.50674 9.118C9.65608 8.81933 9.85674 8.56267 10.1087 8.348C10.3701 8.124 10.6734 7.95133 11.0187 7.83C11.3734 7.70867 11.7607 7.648 12.1807 7.648C12.7314 7.648 13.2401 7.75533 13.7067 7.97C14.1734 8.17533 14.5701 8.446 14.8967 8.782L14.2667 9.538C13.9867 9.26733 13.6741 9.05733 13.3287 8.908C12.9927 8.74933 12.6101 8.67 12.1807 8.67C11.6674 8.67 11.2521 8.79133 10.9347 9.034C10.6267 9.26733 10.4727 9.594 10.4727 10.014C10.4727 10.238 10.5147 10.4293 10.5987 10.588C10.6921 10.7373 10.8134 10.8727 10.9627 10.994C11.1121 11.106 11.2754 11.2087 11.4527 11.302C11.6301 11.386 11.8121 11.4653 11.9987 11.54L13.3007 12.1C13.5621 12.212 13.8094 12.3427 14.0427 12.492C14.2761 12.632 14.4767 12.8 14.6447 12.996C14.8127 13.1827 14.9434 13.4067 15.0367 13.668C15.1394 13.92 15.1907 14.214 15.1907 14.55C15.1907 14.914 15.1161 15.2547 14.9667 15.572C14.8267 15.8893 14.6214 16.1693 14.3507 16.412C14.0801 16.6453 13.7534 16.832 13.3707 16.972C12.9881 17.1027 12.5541 17.168 12.0687 17.168Z"
                          fill="#1D1F22"
                        />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="23"
                          height="23"
                          stroke="#1D1F22"
                        />
                      </svg>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="23"
                          height="23"
                          fill="#A6A6A6"
                          fillOpacity="0.2"
                          stroke="#A6A6A6"
                        />
                        <path
                          d="M8.17406 17V7.816H9.57406L11.3381 12.716C11.4501 13.0333 11.5574 13.3553 11.6601 13.682C11.7721 13.9993 11.8841 14.3167 11.9961 14.634H12.0521C12.1641 14.3167 12.2667 13.9993 12.3601 13.682C12.4627 13.3553 12.5701 13.0333 12.6821 12.716L14.4181 7.816H15.8321V17H14.7401V11.946C14.7401 11.5353 14.7587 11.0827 14.7961 10.588C14.8334 10.0933 14.8661 9.64067 14.8941 9.23H14.8381L14.1101 11.316L12.3741 16.076H11.6041L9.86806 11.316L9.14006 9.23H9.08406C9.11206 9.64067 9.14006 10.0933 9.16806 10.588C9.2054 11.0827 9.22406 11.5353 9.22406 11.946V17H8.17406Z"
                          fill="#A6A6A6"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="quantity">
                    <img
                      onClick={() => {
                        this.increment(index);
                      }}
                      src={plusImg}
                      alt=""
                    />

                    {cartItem.quantity}
                    <img
                      onClick={() => {
                        this.decrement(index);
                      }}
                      src={minusImg}
                      alt=""
                    />
                  </div>
                  <figure>
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${cartItem.product.gallery[0]})`,
                      }}
                    ></div>
                  </figure>
                </div>
              ))}
              <div className="total">
                <p>Total</p>
                <p>{this.state.total}</p>
              </div>
              <div className="buttons">
                <Link to="cart">
                  <button className="bag">VIEW BAG</button>
                </Link>
                <button className="check-out">CHECK OUT</button>
              </div>
            </Container>
          </>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(CartOverlay);
