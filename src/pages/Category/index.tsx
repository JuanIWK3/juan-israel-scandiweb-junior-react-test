import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { cartLightImg } from '../../assets';

import Header from '../../components/Header';

import { Product, CategoryElement } from '../../interfaces';

import { CATEGORY_PRODUCTS_QUERY, CATEGORY_QUERY, client } from '../../queries';

import {
  mapDispatchToProps,
  mapStateToProps,
} from '../../state/actions/actions';

import { Container, ProductImage } from './styles';

interface MyState {
  loading: boolean;
  error: boolean;
  category: CategoryElement;
  overlayVisible: boolean;
  categoriesName: CategoryElement[];
}

interface MyProps {
  currencyIndex: number;
  categoryIndex: number;
  addCartItem: (product: Product) => void;
}

class Category extends Component<MyProps> {
  state: MyState = {
    loading: true,
    error: false,
    category: {} as CategoryElement,
    overlayVisible: false,
    categoriesName: [],
  };

  async componentDidMount() {
    await this.getCategoriesData();
    setTimeout(() => {
      this.getCategoryProducts();
    });
  }

  componentDidUpdate(prevProps: MyProps) {
    if (prevProps.categoryIndex !== this.props.categoryIndex) {
      this.getCategoryProducts();
    }
  }

  getCategoriesData = async () => {
    try {
      const response = await client.query({
        query: CATEGORY_QUERY,
      });

      this.setState({
        categoriesName: response.data.categories,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  getCategoryProducts = async () => {
    const { categoriesName } = this.state;

    try {
      const response = await client.query({
        query: CATEGORY_PRODUCTS_QUERY,
        variables: {
          input: { title: categoriesName[this.props.categoryIndex].name },
        },
      });

      this.setState({
        category: response.data.category as CategoryElement,
      });

      this.setState({ loading: response.loading });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  toggleCartOverlay = () => {
    this.setState((prevState: MyState) => ({
      overlayVisible: !prevState.overlayVisible,
    }));
  };

  render() {
    if (this.state.loading) {
      return <Container>Loading...</Container>;
    }
    if (this.state.error) {
      return <Container>Loading Error</Container>;
    }
    return (
      <Container>
        <Header toggle={this.toggleCartOverlay} />
        {this.state.overlayVisible && <div className="dim-overlay" />}

        <div className="category" key={this.state.category.name}>
          <h1 className="category-name">
            {this.state.category.name.charAt(0).toUpperCase() +
              this.state.category.name.slice(1)}
          </h1>
          <div className="products">
            {this.state.category.products.map((product) => {
              return (
                <div className="product" key={product.id}>
                  <figure className={!product.inStock ? 'out-of-stock' : ''}>
                    {!product.inStock && (
                      <Link to={`/products/${product.id}`}>
                        <div className="out-of-stock">OUT OF STOCK</div>
                      </Link>
                    )}
                    <div
                      className="circle"
                      onClick={() => {
                        if (product.inStock) {
                          this.props.addCartItem(product);
                        }
                      }}
                    >
                      <img src={cartLightImg} alt="" />
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <ProductImage image={product.gallery[0]} />
                    </Link>
                  </figure>
                  <Link to={`/products/${product.id}`}>
                    <div className="content">
                      <p className="name">{`${product.brand} ${product.name}`}</p>
                      {product.category}

                      <p className="price">
                        {
                          product.prices[this.props.currencyIndex].currency
                            .symbol
                        }
                        {product.prices[this.props.currencyIndex].amount}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
