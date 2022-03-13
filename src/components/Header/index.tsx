import React, { Component } from "react";
import { CartItem } from "../../interfaces";
import CartOverlay from "../CartOverlay";

import { Container } from "./styles";

import { logoImg, cartImg, currencyImg } from "../../assets";

class index extends Component<{ cartItems: CartItem[]; toggle: () => {} }> {
  state = {
    cartItems: this.props.cartItems,
  };

  componentDidMount() {}

  render() {
    return (
      <Container>
        <div className="wrapper">
          <div className="filters">
            <button className="active">WOMEN</button>
            <button>MEN</button>
            <button>KIDS</button>
          </div>

          <div className="logo">
            <img src={logoImg} alt="" />
          </div>

          <div className="currency-cart">
            <div className="currency">
              <img src={currencyImg} alt="" />
            </div>

            <div className="cart">
              <CartOverlay
                toggle={this.props.toggle}
                cartItems={this.state.cartItems}
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default index;
