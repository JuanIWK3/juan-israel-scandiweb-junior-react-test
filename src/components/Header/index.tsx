import React, { Component } from "react";
import {
  Attribute,
  CartItem,
  CategoryElement,
  Currency,
  Product,
} from "../../interfaces";
import CartOverlay from "../CartOverlay";

import { Container } from "./styles";

import {
  logoImg,
  cartImg,
  currencyOpenImg,
  currencyCloseImg,
  hamImg,
} from "../../assets";
import { Link } from "react-router-dom";
import { CATEGORY_QUERY, client, CURRENCY_QUERY } from "../../queries";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../state/actions/actions";

class index extends Component<{
  toggle: () => {};
  cart: { cartItems: CartItem[] };
  currencyIndex: number;
  categoryIndex: number;
  changeCurrency: any;
  changeCategory: (index: number) => void;
}> {
  toggleCurrencyMenu = () => {
    this.setState({ currencyMenuShow: !this.state.currencyMenuShow });
  };
  toggleCategoryMenu = () => {
    this.setState({ showCategories: !this.state.showCategories });
  };

  selectCurrency = (currency: Currency) => {
    this.setState({
      selectedCurrency: {
        label: currency.label,
        symbol: currency.symbol,
      },
    });
  };

  state = {
    loading: true,
    error: false,
    currencies: [] as Currency[],
    selectedCurrency: {} as Currency,
    currencyMenuShow: false,
    closeCart: false,
    selectedFilter: this.props.categoryIndex,
    categories: [] as CategoryElement[],
    showCategories: false,
  };

  componentDidMount() {
    const getCategoryData = async () => {
      try {
        const response = await client.query({
          query: CATEGORY_QUERY,
        });

        this.setState({
          categories: response.data.categories as CategoryElement,
        });
        console.log(this.state.categories);
      } catch (error) {
        this.setState({ error: true });
      }
    };
    const getCurrencyData = async () => {
      try {
        const response = await client.query({
          query: CURRENCY_QUERY,
        });

        this.setState({
          currencies: response.data.currencies as Currency[],
        });
        this.setState({ loading: response.loading });
      } catch (error) {
        this.setState({ error: true });
      }
    };
    getCategoryData();
    getCurrencyData();
  }

  selectFilter = (value: string) => {
    this.setState({ selectedFilter: value });
  };

  render() {
    if (this.state.loading) {
      return <Container>Loading...</Container>;
    } else if (this.state.error) {
      return <Container>Loading Error</Container>;
    } else {
      return (
        <Container>
          <div className="wrapper">
            <div className="filters">
              {this.state.categories.map((category, index) => {
                return (
                  <button
                    onClick={() => {
                      this.props.changeCategory(index);
                    }}
                    key={index}
                    className={
                      this.props.categoryIndex === index ? "active" : ""
                    }
                  >
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </button>
                );
              })}
            </div>

            <div className="category-button" onClick={this.toggleCategoryMenu}>
              <img src={hamImg} alt="ham" />
              {this.state.showCategories && (
                <div className="categories-menu">
                  {this.state.categories.map((category, index) => {
                    return (
                      <div
                        onClick={() => {
                          this.props.changeCategory(index);
                        }}
                        key={index}
                        className="category-option"
                      >
                        <p>
                          {category.name.charAt(0).toUpperCase() +
                            category.name.slice(1)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="logo">
              <Link to="/">
                <img src={logoImg} alt="" />
              </Link>
            </div>

            <div className="currency-cart">
              <div
                className="currency-button"
                onClick={this.toggleCurrencyMenu}
              >
                {this.state.currencies[this.props.currencyIndex].symbol}
                {this.state.currencyMenuShow ? (
                  <img src={currencyOpenImg} alt="" />
                ) : (
                  <img src={currencyCloseImg} alt="" />
                )}
                {this.state.currencyMenuShow && (
                  <div className="currency-menu">
                    {this.state.currencies.map((currency, index) => {
                      return (
                        <div
                          onClick={() => {
                            this.props.changeCurrency(index);
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
                  currencyOpen={this.state.currencyMenuShow}
                  toggleCurrencyMenu={this.toggleCurrencyMenu}
                  toggleDim={this.props.toggle}
                />
              </div>
            </div>
          </div>
        </Container>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
