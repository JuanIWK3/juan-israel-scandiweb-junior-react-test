import React, { Component } from "react";
import { cartImg, minusImg, plusImg } from "../../assets";
import { CartItem } from "../../interfaces";
import Header from "../../components/Header";

import { Container } from "./styles";

export default class Cart extends Component<{}> {
  state = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")!) as CartItem[],
    increment: (index: number) => {
      this.setState({
        cartItem: [this.state.cartItems[index].quantity++],
      });
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
    },
    decrement: (index: number) => {
      let tempCartItems = this.state.cartItems;

      if (tempCartItems[index].quantity === 1) {
        tempCartItems.splice(index, 1);
        this.setState({ cartItems: tempCartItems });
        localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));

        return;
      }

      tempCartItems[index].quantity--;

      this.setState({ cartItems: tempCartItems });
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
    },
    overlayVisible: false,
    toggleCartOverlay: () => {
      this.setState({ overlayVisible: !this.state.overlayVisible });
    },
  };

  render() {
    return (
      <>
        <Header
          toggle={this.state.toggleCartOverlay as () => {}}
          cartItems={this.state.cartItems}
        />
        <Container>
          <div className="title">
            <p>Cart</p>
          </div>
          {this.state.cartItems.map((cartItem, index) => (
            <div className="cart-item-wrapper" key={index}>
              <div className="divider"></div>
              <div className="cart-item" key={cartItem.product.id}>
                <div className="content">
                  <p className="brand">{cartItem.product.brand}</p>
                  <p className="name">{cartItem.product.name}</p>
                  <p className="price">
                    {cartItem.product.prices[0].currency.symbol}
                    {cartItem.product.prices[0].amount}
                  </p>
                  <div>sm{/* //! attributes */}</div>
                </div>
                <div className="wrapper">
                  <div className="quantity">
                    <img
                      onClick={() => {
                        this.state.increment(index);
                      }}
                      src={plusImg}
                      alt=""
                    />
                    <p>{cartItem.quantity}</p>
                    <img
                      onClick={() => {
                        this.state.decrement(index);
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
              </div>
            </div>
          ))}
        </Container>
      </>
    );
  }
}
