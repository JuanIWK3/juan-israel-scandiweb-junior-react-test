import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartImg, minusImg, plusImg } from '../../assets';
import { CartItem } from '../../interfaces';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../../state/actions/actions';

import {
  AttrButton,
  Badge,
  Container,
  Icon,
  Image,
  OverlayContainer,
} from './styles';

interface IProps {
  cart: { cartItems: CartItem[] };
  toggleDim: () => void;
  currencyOpen: boolean;
  currencyIndex: number;
  incrementCartItem: (index: number) => void;
  decrementCartItem: (index: number) => void;
}

class CartOverlay extends Component<IProps> {
  cartButtonRef = createRef<HTMLImageElement>();

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
    const element = event.target as HTMLElement;

    if (overlayVisible) {
      if (!element.classList.contains('cart-element')) {
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
      <OverlayContainer>
        <Icon>
          <Badge>
            <div>{cart.cartItems.length}</div>
          </Badge>
          <img
            className=" cart-element"
            ref={this.cartButtonRef}
            onClick={() => {
              toggleDim();
              this.toggleCartOverlay();
            }}
            src={cartImg}
            alt=""
          />
        </Icon>
        {overlayVisible && (
          <Container className="cart-element">
            <p className="title cart-element">
              <strong className="cart-element">My Bag</strong>,{' '}
              {cart.cartItems.length}{' '}
              {cart.cartItems.length === 1 ? 'item' : 'items'}{' '}
            </p>
            {cart.cartItems.map((cartItem, index) => (
              <div className="cart-item cart-element" key={index}>
                <div className="content cart-element">
                  <div className="brand-name cart-element">
                    <p>{cartItem.product.brand}</p>
                    <p>{cartItem.product.name}</p>
                  </div>
                  <p className="price cart-element">
                    {cartItem.product.prices[currencyIndex].currency.symbol}
                    {cartItem.product.prices[currencyIndex].amount}
                  </p>
                  {cartItem.product.attributes.map((attribute, attrIndex) => {
                    return (
                      <div className="attr" key={attrIndex}>
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
                <div className="quantity cart-element">
                  <img
                    className="cart-element"
                    onClick={() => {
                      incrementCartItem(index);
                      this.calculateTotal();
                    }}
                    src={plusImg}
                    alt=""
                  />

                  {cartItem.quantity}
                  <img
                    className="cart-element"
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
                  <Image
                    image={cartItem.product.gallery[0]}
                    className="image cart-element"
                  />
                </figure>
              </div>
            ))}
            {cart.cartItems.length > 0 && (
              <div className="total cart-element">
                <p>Total</p>
                <p>{total}</p>
              </div>
            )}
            <div className="buttons cart-element">
              <Link to="/cart">
                <button type="button" className="bag cart-element">
                  VIEW BAG
                </button>
              </Link>
              <button type="button" className="check-out cart-element">
                CHECK OUT
              </button>
            </div>
          </Container>
        )}
      </OverlayContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
