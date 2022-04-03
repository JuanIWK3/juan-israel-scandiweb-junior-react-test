import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emptyCartImg, minusImg, plusImg } from '../../assets';
import { CartItem } from '../../interfaces';
import Header from '../../components/Header';

import { Container } from './styles';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../../state/actions/actions';

interface myState {
  overlayVisible: boolean;
}

class Cart extends Component<{
  currencyIndex: number;
  cart: { cartItems: CartItem[] };
  incrementCartItem: (index: number) => void;
  decrementCartItem: (index: number) => void;
}> {
  state: myState = {
    overlayVisible: false,
  };

  increment = (index: number) => {
    this.props.incrementCartItem(index);
  };

  decrement = (index: number) => {
    this.props.decrementCartItem(index);
  };

  toggleCartOverlay = () => {
    this.setState((prevState: myState) => ({
      overlayVisible: !prevState.overlayVisible,
    }));
  };

  render() {
    return (
      <>
        <Header toggle={this.toggleCartOverlay} />
        <Container>
          <div className="title">
            <p>Cart</p>
          </div>
          {!this.props.cart.cartItems.length && (
            <img src={emptyCartImg} alt="empty cart" />
          )}
          {this.props.cart.cartItems.map((cartItem, itemIndex) => (
            <div className="cart-item-wrapper" key={itemIndex}>
              <div className="divider" />
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
                  {cartItem.product.attributes.map((attribute, attrIndex) => {
                    return (
                      <div className="attr" key={attribute.id}>
                        <div className="attr-name">
                          {cartItem.product.attributes[attrIndex].name}:
                        </div>
                        <div className="attr-value">
                          {
                            cartItem.product.attributes[attrIndex].items[
                              cartItem.selectedAttributes[attrIndex].item
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
                        this.increment(itemIndex);
                      }}
                      src={plusImg}
                      alt=""
                    />
                    <p>{cartItem.quantity}</p>
                    <img
                      onClick={() => {
                        this.decrement(itemIndex);
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
                    />
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
