import React, { Component } from 'react';
import { emptyCartImg, minusImg, plusImg } from '../../assets';
import { CartItem } from '../../interfaces';
import Header from '../../components/Header';

import { Container } from './styles';
import { connect } from 'react-redux';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../../state/actions/actions';

class Cart extends Component<{
  currencyIndex: number;
  cart: { cartItems: CartItem[] };
  incrementCartItem: (index: number) => void;
  decrementCartItem: (index: number) => void;
}> {
  state = {
    overlayVisible: false,
  };

  increment = (index: number) => {
    this.props.incrementCartItem(index);
  };

  decrement = (index: number) => {
    this.props.decrementCartItem(index);
  };

  toggleCartOverlay = () => {
    this.setState({ overlayVisible: !this.state.overlayVisible });
  };

  render() {
    return (
      <>
        <Header toggle={this.toggleCartOverlay as () => {}} />
        <Container>
          <div className="title">
            <p>Cart</p>
          </div>
          {!this.props.cart.cartItems.length && (
            <img src={emptyCartImg} alt="empty cart" />
          )}
          {this.props.cart.cartItems.map((cartItem, index) => (
            <div className="cart-item-wrapper" key={index}>
              <div className="divider"></div>
              <div className="cart-item" key={cartItem.product.id}>
                <div className="content">
                  <p className="brand">{cartItem.product.brand}</p>
                  <p className="name">{cartItem.product.name}</p>
                  <p className="price">
                    {
                      cartItem.product.prices[this.props.currencyIndex].currency
                        .symbol
                    }
                    {cartItem.product.prices[this.props.currencyIndex].amount}
                  </p>
                  {cartItem.product.attributes.map((attribute, index) => {
                    return (
                      <div className="attr" key={attribute.id}>
                        <div className="attr-name">
                          {cartItem.product.attributes[index].name}:
                        </div>
                        <div className="attr-value">
                          {
                            cartItem.product.attributes[index].items[
                              cartItem.selectedAttributes[index].item
                            ].displayValue
                          }
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="wrapper">
                  <div className="quantity">
                    <img
                      onClick={() => {
                        this.increment(index);
                      }}
                      src={plusImg}
                      alt=""
                    />
                    <p>{cartItem.quantity}</p>
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
              </div>
            </div>
          ))}
        </Container>
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
