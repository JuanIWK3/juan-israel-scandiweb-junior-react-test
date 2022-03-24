import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { CartItem, Product, SelectedAttribute } from "../../interfaces";
import { client, PRODUCT_QUERY } from "../../queries";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../state/actions/actions";
import { AttrButton, Container } from "./styles";

class ProductPage extends Component<{
  currencyIndex: number;
  cart: { cartItems: CartItem[] };
  addCartItem: (product: Product, attributes?: SelectedAttribute[]) => void;
}> {
  state = {
    loading: true,
    error: false,
    product: {} as Product,
    overlayVisible: false,
    selectedImage: 0,
    selectedAttributes: [] as SelectedAttribute[],
  };

  changeSelectedAttr = (attr: number, item: number) => {
    const selectedAttributes = this.state.selectedAttributes;
    selectedAttributes[attr].item = item;
    this.setState({ selectedAttributes });
  };

  toggleCartOverlay = () => {
    this.setState({ overlayVisible: !this.state.overlayVisible });
  };

  componentDidMount() {
    const getProductData = async () => {
      const params = window.location.pathname.split("/")[2];
      try {
        const response = await client.query({
          query: PRODUCT_QUERY,
          variables: {
            productId: params,
          },
        });

        const defaultAttr = (product: Product) => {
          const selectedAttributes: SelectedAttribute[] = [];
          for (let i = 0; i < product.attributes.length; i++) {
            selectedAttributes.push({
              attribute: 0,
              item: 0,
            });
          }
          return selectedAttributes;
        };

        //* Before Loading */

        this.setState({ product: response.data.product as Product });
        this.setState({ selectedAttributes: defaultAttr(this.state.product) });
        this.setState({ selectedImage: this.state.product.gallery[0] });
        this.setState({});

        //* === */

        this.setState({ loading: response.loading });
      } catch (error) {
        this.setState({ error: true });
      }
    };
    getProductData();
  }

  render() {
    if (this.state.loading) {
      return <Container>Loading...</Container>;
    } else if (this.state.error) {
      return <Container>Loading Error</Container>;
    } else {
      return (
        <>
          <Header toggle={this.toggleCartOverlay as () => {}} />
          <Container>
            {this.state.overlayVisible && <div className="dim-overlay"></div>}
            <main>
              <div className="gallery">
                <div className="images-list">
                  {this.state.product.gallery.map((image, index) => {
                    return (
                      <figure key={index}>
                        <div
                          onClick={() => {
                            this.setState({ selectedImage: image });
                          }}
                          className="image"
                          style={{ backgroundImage: `url(${image})` }}
                        />
                      </figure>
                    );
                  })}
                </div>
                <div
                  className="selected-image"
                  style={{
                    backgroundImage: `url(${this.state.selectedImage})`,
                  }}
                />
              </div>
              <div className="content">
                <div className="brand">{this.state.product.brand}</div>
                <div className="name">{this.state.product.name}</div>
                <div className="options">
                  {this.state.product.attributes.map((attribute, attrIndex) => {
                    return (
                      <div
                        key={attribute.name}
                        className={"attr " + attribute.type}
                      >
                        <div className="attr-name">
                          <p>{attribute.name}</p>

                          <p className="selected-value">
                            {" "}
                            {`: ${
                              attribute.items[
                                this.state.selectedAttributes[attrIndex].item
                              ].displayValue
                            }`}
                          </p>
                        </div>
                        <div className="attr-values">
                          {attribute.items.map((item, itemIndex) => {
                            return (
                              <AttrButton
                                attrColor={item.value}
                                key={itemIndex}
                                onClick={() => {
                                  this.changeSelectedAttr(attrIndex, itemIndex);
                                }}
                                className={
                                  attribute.type == "swatch"
                                    ? "attr-value swatch"
                                    : "attr-value"
                                }
                              >
                                {attribute.type !== "swatch" && (
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
                      this.state.product.prices[this.props.currencyIndex]
                        .currency.symbol
                    }{" "}
                    {this.state.product.prices[this.props.currencyIndex].amount}
                  </div>
                </div>
                <button
                  onClick={() => {
                    this.props.addCartItem(
                      this.state.product,
                      this.state.selectedAttributes
                    );
                  }}
                  className={
                    this.state.product.inStock
                      ? "add-to-cart"
                      : "add-to-cart out-of-stock"
                  }
                >
                  {this.state.product.inStock ? "Add to Cart" : "OUT OF STOCK"}
                </button>
                <div className="description"></div>
              </div>
            </main>
          </Container>
        </>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
