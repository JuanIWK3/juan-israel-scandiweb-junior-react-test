import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartImg, minusImg, plusImg } from '../../assets';
import { CartItem } from '../../interfaces';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../../state/actions/actions';

import { Badge, Container, Icon } from './styles';

interface IProps {
  cart: { cartItems: CartItem[] };
  toggleDim: () => {};
  currencyOpen: boolean;
  toggleCurrencyMenu: () => void;
  currencyIndex: number;
  incrementCartItem: (index: number) => void;
  decrementCartItem: (index: number) => void;
}

class CartOverlay extends Component<IProps> {
  state = {
    total: '',
    overlayVisible: false,
  };

  cartRef = createRef<HTMLDivElement>();

  handleClickOutside = (event: MouseEvent) => {
    if (this.state.overlayVisible) {
      if (event.target !== this.cartRef.current) {
        this.toggleCartOverlay();
        this.props.toggleDim();
      }
    }
  };

  calculateTotal = () => {
    this.setState({ total: '' });

    let sum = 0;
    if (!this.props.cart.cartItems || !this.props.cart.cartItems.length) {
      return;
    }

    for (let i = 0; i < this.props.cart.cartItems.length; i++) {
      sum +=
        this.props.cart.cartItems[i].product.prices[this.props.currencyIndex]
          .amount * this.props.cart.cartItems[i].quantity;
    }

    const symbol: string = this.props.cart.cartItems[0].product.prices[this.props.currencyIndex].currency.symbol.toString()
    
    this.setState({
      total: `${symbol} ${sum.toFixed(2)}`,
    });
  };

  toggleCartOverlay = () => {
    if (!this.state.overlayVisible && this.props.currencyOpen) {
      this.props.toggleCurrencyMenu();
    }
    if (!this.state.overlayVisible) {
      this.calculateTotal();
    }
    this.setState({
      overlayVisible: !this.state.overlayVisible,
    });
  };

  componentDidMount() {
    this.calculateTotal();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate() {
    if (this.state.overlayVisible && this.props.currencyOpen) {
      this.toggleCartOverlay();
      this.props.toggleDim();
    }
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Icon>
          <Badge>
            <div>{this.props.cart.cartItems.length}</div>
          </Badge>
          <img
            style={{ cursor: 'pointer', padding: '5px 11px', zIndex: 2 }}
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
            <Container ref={this.cartRef}>
              <p className="title">
                <strong>My Bag</strong>, {this.props.cart.cartItems.length}{' '}
                {this.props.cart.cartItems.length === 1 ? 'item' : 'items'}{' '}
              </p>
              {this.props.cart.cartItems.map((cartItem, index) => (
                <div className="cart-item" key={index}>
                  <div className="content">
                    <div className="brand-name">
                      <p>{cartItem.product.brand}</p>
                      <p>{cartItem.product.name}</p>
                    </div>
                    <p className="price">
                      {
                        cartItem.product.prices[this.props.currencyIndex]
                          .currency.symbol
                      }
                      {cartItem.product.prices[this.props.currencyIndex].amount}
                    </p>
                    {cartItem.product.attributes.map((attribute, index) => {
                      return (
                        <div className="attr" key={attribute.id}>
                          <div className="attr-name">
                            {`${cartItem.product.attributes[index].name}:
                            ${
                              cartItem.product.attributes[index].items[
                                cartItem.selectedAttributes[index].item
                              ].displayValue
                            }`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="quantity">
                    <img
                      onClick={() => {
                        this.props.incrementCartItem(index);
                        this.calculateTotal();
                      }}
                      src={plusImg}
                      alt=""
                    />

                    {cartItem.quantity}
                    <img
                      onClick={() => {
                        this.props.decrementCartItem(index);
                        setTimeout(() => {
                          this.calculateTotal();
                        });
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
              {this.props.cart.cartItems.length > 0 && (
                <div className="total">
                  <p>Total</p>
                  <p>{this.state.total}</p>
                </div>
              )}
              <div className="buttons">
                <Link to="/cart">
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

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
