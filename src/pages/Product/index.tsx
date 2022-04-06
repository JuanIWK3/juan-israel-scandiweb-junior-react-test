/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { CartItem, Product, SelectedAttribute } from '../../interfaces';
import { client, PRODUCT_QUERY } from '../../queries';
import {
  mapDispatchToProps,
  mapStateToProps,
} from '../../state/actions/actions';
import {
  AttrButton,
  Container,
  ImageList,
  ListImage,
  SelectImage,
} from './styles';

interface MyState {
  loading: boolean;
  error: boolean;
  product: Product;
  overlayVisible: boolean;
  selectedImage: string;
  selectedAttributes: SelectedAttribute[];
}

class ProductPage extends Component<{
  currencyIndex: number;
  cart: { cartItems: CartItem[] };
  addCartItem: (product: Product, attributes?: SelectedAttribute[]) => void;
}> {
  descriptionRef = createRef<HTMLDivElement>();

  state: MyState = {
    loading: true,
    error: false,
    product: {} as Product,
    overlayVisible: false,
    selectedImage: '',
    selectedAttributes: [],
  };

  componentDidMount() {
    const getProductData = async () => {
      const params = window.location.pathname.split('/')[2];
      try {
        const response = await client.query({
          query: PRODUCT_QUERY,
          variables: {
            productId: params,
          },
        });

        const defaultAttr = (product: Product) => {
          const selectedAttributes: SelectedAttribute[] = [];
          for (let i = 0; i < product.attributes.length; i += 1) {
            selectedAttributes.push({
              attribute: 0,
              item: 0,
            });
          }
          return selectedAttributes;
        };

        //* Before Loading */

        this.setState({ product: response.data.product as Product });
        this.setState((prevState: MyState) => ({
          selectedAttributes: defaultAttr(prevState.product),
        }));
        this.setState((prevState: MyState) => ({
          selectedImage: prevState.product.gallery[0],
        }));

        //* After Loading */

        this.setState({ loading: response.loading });
      } catch (error) {
        this.setState({ error: true });
      }
    };
    getProductData();
  }

  changeSelectedAttr = (attr: number, item: number) => {
    const { selectedAttributes } = this.state;
    selectedAttributes[attr].item = item;
    this.setState({ selectedAttributes });
  };

  toggleCartOverlay = () => {
    this.setState((prevState: MyState) => ({
      overlayVisible: !prevState.overlayVisible,
    }));
  };

  render() {
    const { selectedAttributes } = this.state;

    if (this.state.loading) {
      return <Container>Loading...</Container>;
    }
    if (this.state.error) {
      return <Container>Loading Error</Container>;
    }

    setTimeout(() => {
      if (this.descriptionRef.current) {
        this.descriptionRef.current.innerHTML = this.state.product.description;
      }
    });

    return (
      <>
        <Header toggle={this.toggleCartOverlay} />
        <Container>
          {this.state.overlayVisible && <div className="dim-overlay" />}
          <main>
            <div className="gallery">
              <ImageList>
                {this.state.product.gallery.map((image, index) => {
                  return (
                    <ListImage
                      image={image}
                      key={index}
                      onClick={() => {
                        this.setState({ selectedImage: image });
                      }}
                    />
                  );
                })}
              </ImageList>
              <SelectImage image={this.state.selectedImage} />
            </div>
            <div className="content">
              <div className="brand">{this.state.product.brand}</div>
              <div className="name">{this.state.product.name}</div>
              <div className="options">
                {this.state.product.attributes.map((attribute, attrIndex) => {
                  return (
                    <div
                      key={attribute.name}
                      className={`attr ${attribute.type}`}
                    >
                      <div className="attr-name">
                        <p>{attribute.name}</p>
                      </div>
                      <div className="attr-values">
                        {attribute.items.map((item, itemIndex) => {
                          return (
                            <AttrButton
                              selected={
                                item.displayValue ===
                                attribute.items[
                                  selectedAttributes[attrIndex].item
                                ].displayValue
                              }
                              attrColor={item.value}
                              key={itemIndex}
                              onClick={() => {
                                this.changeSelectedAttr(attrIndex, itemIndex);
                              }}
                              className={
                                attribute.type === 'swatch'
                                  ? 'attr-value swatch'
                                  : 'attr-value'
                              }
                            >
                              {item.displayValue ===
                                attribute.items[
                                  selectedAttributes[attrIndex].item
                                ].displayValue && (
                                <div className="selected-border" />
                              )}
                              {attribute.type !== 'swatch' && (
                                <div>{item.value}</div>
                              )}
                            </AttrButton>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="price-wrapper">
                <div className="price">PRICE:</div>
                <div className="amount">
                  {
                    this.state.product.prices[this.props.currencyIndex].currency
                      .symbol
                  }{' '}
                  {this.state.product.prices[this.props.currencyIndex].amount}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  this.props.addCartItem(
                    this.state.product,
                    this.state.selectedAttributes,
                  );
                }}
                className={
                  this.state.product.inStock
                    ? 'add-to-cart'
                    : 'add-to-cart out-of-stock'
                }
              >
                {this.state.product.inStock ? 'Add to Cart' : 'OUT OF STOCK'}
              </button>
              <div ref={this.descriptionRef} className="description" />
            </div>
          </main>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
