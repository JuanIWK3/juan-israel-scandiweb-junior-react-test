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
  toggleDim: () => void;
  currencyOpen: boolean;
  toggleCurrencyMenu: () => void;
  currencyIndex: number;
  incrementCartItem: (index: number) => void;
  decrementCartItem: (index: number) => void;
}

class CartOverlay extends Component<IProps> {
  cartRef = createRef<HTMLDivElement>();

  state = {
    total: '',
    overlayVisible: false,
  };

  componentDidMount() {
    this.calculateTotal();
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate() {
    const { overlayVisible } = this.state;
    const { currencyOpen } = this.props;
    const { toggleDim } = this.props;
    if (overlayVisible && currencyOpen) {
      this.toggleCartOverlay();
      toggleDim();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    const { overlayVisible } = this.state;
    const { toggleDim } = this.props;
    if (overlayVisible) {
      if (event.target !== this.cartRef.current) {
        this.toggleCartOverlay();
        toggleDim();
      }
    }
  };

  calculateTotal = () => {
    const { cart } = this.props;
    const { currencyIndex } = this.props;
    this.setState({ total: '' });

    let sum = 0;
    if (!cart.cartItems || !cart.cartItems.length) {
      return;
    }

    for (let i = 0; i < cart.cartItems.length; i += 1) {
      sum +=
        cart.cartItems[i].product.prices[currencyIndex].amount *
        cart.cartItems[i].quantity;
    }

    const symbol: string =
      cart.cartItems[0].product.prices[
        currencyIndex
      ].currency.symbol.toString();

    this.setState({
      total: `${symbol} ${sum.toFixed(2)}`,
    });
  };

  toggleCartOverlay = () => {
    const { overlayVisible } = this.state;
    const { currencyOpen } = this.props;
    const { toggleCurrencyMenu } = this.props;
    if (!overlayVisible && currencyOpen) {
      toggleCurrencyMenu();
    }
    if (!overlayVisible) {
      this.calculateTotal();
    }
    this.setState({
      overlayVisible: !overlayVisible,
    });
  };

  render() {
    const { cart } = this.props;
    const { overlayVisible } = this.state;
    const { currencyIndex } = this.props;
    const { toggleDim } = this.props;
    const { total } = this.state;
    const { incrementCartItem } = this.props;
    const { decrementCartItem } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <Icon>
          <Badge>
            <div>{cart.cartItems.length}</div>
          </Badge>
          <img
            style={{ cursor: 'pointer', padding: '5px 11px', zIndex: 2 }}
            onClick={() => {
              toggleDim();
              this.toggleCartOverlay();
            }}
            src={cartImg}
            alt=""
          />
        </Icon>
        {overlayVisible && (
          <Container ref={this.cartRef}>
            <p className="title">
              <strong>My Bag</strong>, {cart.cartItems.length}{' '}
              {cart.cartItems.length === 1 ? 'item' : 'items'}{' '}
            </p>
            {cart.cartItems.map((cartItem, index) => (
              <div className="cart-item" key={index}>
                <div className="content">
                  <div className="brand-name">
                    <p>{cartItem.product.brand}</p>
                    <p>{cartItem.product.name}</p>
                  </div>
                  <p className="price">
                    {cartItem.product.prices[currencyIndex].currency.symbol}
                    {cartItem.product.prices[currencyIndex].amount}
                  </p>
                  {cartItem.product.attributes.map((attribute) => {
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
                      incrementCartItem(index);
                      this.calculateTotal();
                    }}
                    src={plusImg}
                    alt=""
                  />

                  {cartItem.quantity}
                  <img
                    onClick={() => {
                      decrementCartItem(index);
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
                  />
                </figure>
              </div>
            ))}
            {cart.cartItems.length > 0 && (
              <div className="total">
                <p>Total</p>
                <p>{total}</p>
              </div>
            )}
            <div className="buttons">
              <Link to="/cart">
                <button type="button" className="bag">
                  VIEW BAG
                </button>
              </Link>
              <button type="button" className="check-out">
                CHECK OUT
              </button>
            </div>
          </Container>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
