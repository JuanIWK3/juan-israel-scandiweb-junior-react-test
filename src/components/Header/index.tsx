import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CartItem, CategoryElement, Currency } from '../../interfaces';
import CartOverlay from '../CartOverlay';

import { Container } from './styles';

import {
  logoImg,
  currencyOpenImg,
  currencyCloseImg,
  hamImg,
} from '../../assets';
import { CATEGORY_QUERY, client, CURRENCY_QUERY } from '../../queries';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../../state/actions/actions';

class index extends Component<{
  toggle: () => void;
  cart: { cartItems: CartItem[] };
  currencyIndex: number;
  categoryIndex: number;
  changeCurrency: (currIndex: number) => void;
  changeCategory: (catIndex: number) => void;
}> {
  currencyItemRef = React.createRef<HTMLDivElement>();

  state = {
    loading: true,
    error: false,
    currencies: [] as Currency[],
    currencyMenuShow: false,
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

    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    const { currencyMenuShow } = this.state;
    if (currencyMenuShow) {
      if (
        event.target !== this.currencyItemRef.current &&
        event.target !== this.currencyItemRef.current?.parentElement
      ) {
        this.toggleCurrencyMenu();
      }
    }
  };

  toggleCurrencyMenu = () => {
    const { currencyMenuShow } = this.state;
    this.setState({ currencyMenuShow: !currencyMenuShow });
  };

  toggleCategoryMenu = () => {
    const { showCategories } = this.state;
    this.setState({ showCategories });
  };

  render() {
    const { loading } = this.state;
    const { error } = this.state;
    const { categories } = this.state;
    const { changeCategory } = this.props;
    const { changeCurrency } = this.props;
    const { categoryIndex } = this.props;
    const { currencyIndex } = this.props;
    const { showCategories } = this.state;
    const { currencies } = this.state;
    const { currencyMenuShow } = this.state;
    const { toggle } = this.props;

    if (loading) {
      return <Container>Loading...</Container>;
    }
    if (error) {
      return <Container>Loading Error</Container>;
    }

    return (
      <Container>
        <div className="wrapper">
          <div className="filters">
            {categories.map((category, catIndex) => {
              return (
                <button
                  type="button"
                  onClick={() => {
                    changeCategory(catIndex);
                  }}
                  key={catIndex}
                  className={categoryIndex === catIndex ? 'active' : ''}
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="category-button"
            onClick={this.toggleCategoryMenu}
          >
            <img src={hamImg} alt="ham" />
            {showCategories && (
              <div className="categories-menu">
                {categories.map((category, catIndex) => {
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        changeCategory(catIndex);
                      }}
                      key={catIndex}
                      className="category-option"
                    >
                      <p>
                        {category.name.charAt(0).toUpperCase() +
                          category.name.slice(1)}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </button>

          <div className="logo">
            <Link to="/">
              <img src={logoImg} alt="" />
            </Link>
          </div>

          <div className="currency-cart">
            <div
              className="currency-button"
              onClick={() => {
                this.toggleCurrencyMenu();
              }}
            >
              {currencies[currencyIndex].symbol}
              {currencyMenuShow ? (
                <img src={currencyOpenImg} alt="" />
              ) : (
                <img src={currencyCloseImg} alt="" />
              )}
              {currencyMenuShow && (
                <div ref={this.currencyItemRef} className="currency-menu">
                  {currencies.map((currency, curIndex) => {
                    return (
                      <div
                        onClick={() => {
                          changeCurrency(curIndex);
                        }}
                        className="currency"
                        key={curIndex}
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
              <CartOverlay currencyOpen={currencyMenuShow} toggleDim={toggle} />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);
