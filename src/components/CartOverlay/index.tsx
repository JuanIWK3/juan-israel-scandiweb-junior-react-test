import React, { Component } from "react";
import { CartItem } from "../../interfaces";
import { Container } from "./styles";

class CartOverlay extends Component<{ cartItems: CartItem[] }> {
  componentDidMount() {
    console.log(this.props.cartItems);
  }
  render() {
    return (
      <Container>
        <p className="title">
          <strong>My Bag</strong>, {this.props.cartItems.length}{" "}
          {this.props.cartItems.length == 1 ? "item" : "items"}{" "}
        </p>
        {this.props.cartItems.map((cartItem) => (
          <div className="cart-item" key={cartItem.product.id}>
            <div className="content">
              <p>{cartItem.product.name}</p>
              <p>
                {cartItem.product.prices[0].currency.symbol}
                {cartItem.product.prices[0].amount}
              </p>
            </div>
            {/* teste */}
            <div className="quantity">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V16"
                  stroke="#1D1F22"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 12H16"
                  stroke="#1D1F22"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <rect x="0.5" y="0.5" width="23" height="23" stroke="#1D1F22" />
              </svg>
              {cartItem.quantity}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 12H16"
                  stroke="#1D1F22"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <rect x="0.5" y="0.5" width="23" height="23" stroke="#1D1F22" />
              </svg>
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
      </Container>
    );
  }
}

export default CartOverlay;
