import React, { Component } from "react";
import { CartItem, Currency } from "../../interfaces";
import CartOverlay from "../CartOverlay";

import { Container } from "./styles";

import {
  logoImg,
  cartImg,
  currencyOpenImg,
  currencyCloseImg,
} from "../../assets";
import { Link } from "react-router-dom";
import { CURRENCY_QUERY } from "../../queries";

class index extends Component<{ cartItems: CartItem[]; toggle: () => {} }> {
  state = {
    cartItems: this.props.cartItems,
    currencies: [] as Currency[],
    selectedCurrency: {} as Currency,
    currencyMenuShow: false,
    toggleCurrency: () => {
      this.setState({ currencyMenuShow: !this.state.currencyMenuShow });
    },
    selectCurrency: (currency: Currency) => {
      this.setState({
        selectedCurrency: {
          label: currency.label,
          symbol: currency.symbol,
        },
      });
    },
  };

  componentDidMount() {
    fetch(
      "http://localhost:4000?" + new URLSearchParams({ query: CURRENCY_QUERY })
    )
      .then((res) => res.json())
      .then((res) => this.setState({ currencies: res.data.currencies }));
  }

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
            <Link to="/">
              <img src={logoImg} alt="" />
            </Link>
          </div>

          <div className="currency-cart">
            <div className="currency" onClick={this.state.toggleCurrency}>
              $
              {this.state.currencyMenuShow ? (
                <img src={currencyOpenImg} alt="" />
              ) : (
                <img src={currencyCloseImg} alt="" />
              )}
              {this.state.currencyMenuShow && (
                <div className="currency-menu">
                  {this.state.currencies.map((currency) => {
                    return (
                      <div
                        onClick={() => {
                          this.state.selectCurrency(currency);
                        }}
                        className="currency"
                        key={currency.symbol}
                      >
                        <p>{currency.symbol}</p>
                        <p>{currency.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
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
