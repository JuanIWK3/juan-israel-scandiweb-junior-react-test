import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  arrowLeftImg,
  arrowRightImg,
  emptyCartImg,
  minusImg,
  plusImg,
} from '../../assets';
import { CartItem } from '../../interfaces';
import Header from '../../components/Header';

import { AttrButton, Container, Image } from './styles';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../../state/actions/actions';

interface myState {
  overlayVisible: boolean;
  selectedImage: number;
}

class Cart extends Component<{
  currencyIndex: number;
  cart: { cartItems: CartItem[] };
  incrementCartItem: (index: number) => void;
  decrementCartItem: (index: number) => void;
}> {
  state: myState = {
    overlayVisible: false,
    selectedImage: 0,
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
    const { selectedImage } = this.state;
    const { overlayVisible } = this.state;
    const { cart } = this.props;
    const { currencyIndex } = this.props;
    return (
      <>
        <Header toggle={this.toggleCartOverlay} />
        {overlayVisible && <div className="dim-overlay" />}
        <Container>
          <div className="title">
            <p>Cart</p>
          </div>
          {!cart.cartItems.length && (
            <img src={emptyCartImg} alt="empty cart" />
          )}
          {cart.cartItems.map((cartItem, itemIndex) => (
            <div className="cart-item-wrapper" key={itemIndex}>
              <div className="divider" />
              <div className="cart-item" key={cartItem.product.id}>
                <div className="content">
                  <p className="brand">{cartItem.product.brand}</p>
                  <p className="name">{cartItem.product.name}</p>
                  <p className="price">
                    {cartItem.product.prices[currencyIndex].currency.symbol}
                    {cartItem.product.prices[currencyIndex].amount}
                  </p>
                  <div className="attributes">
                    {cartItem.product.attributes.map((attribute, attrIndex) => {
                      return (
                        <div className="attr" key={attribute.id}>
                          <div className="attr-name">
                            {cartItem.product.attributes[attrIndex].name}:
                          </div>
                          <AttrButton
                            className={
                              attribute.type === 'swatch' ? 'swatch' : ''
                            }
                            attrColor={
                              cartItem.product.attributes[attrIndex].items[
                                cartItem.selectedAttributes[attrIndex].item
                              ].value
                            }
                          >
                            {attribute.type !== 'swatch' && (
                              <p>
                                {
                                  cartItem.product.attributes[attrIndex].items[
                                    cartItem.selectedAttributes[attrIndex].item
                                  ].displayValue
                                }
                              </p>
                            )}
                          </AttrButton>
                        </div>
                      );
                    })}
                  </div>
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

                  <Image image={cartItem.product.gallery[selectedImage]}>
                    <div className="image" />
                    <div
                      className="left"
                      onClick={() => {
                        if (cartItem.product.gallery[selectedImage - 1]) {
                          this.setState({ selectedImage: selectedImage - 1 });
                        }
                      }}
                    >
                      <img src={arrowLeftImg} alt="left" />
                    </div>
                    <div
                      className="right"
                      onClick={() => {
                        if (cartItem.product.gallery[selectedImage + 1]) {
                          this.setState({ selectedImage: selectedImage + 1 });
                        }
                      }}
                    >
                      <img src={arrowRightImg} alt="right" />
                    </div>
                  </Image>
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
