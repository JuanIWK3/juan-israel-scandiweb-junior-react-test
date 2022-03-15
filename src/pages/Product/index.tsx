import React from "react";
import Header from "../../components/Header";
import { CartItem } from "../../interfaces";
import { productQuery } from "../../queries";
import { AttrButton, Container } from "./styles";

export default class ProductPage extends React.Component {
  state = {
    product: {
      name: "",
      inStock: false,
      gallery: [""],
      description: "",
      category: "",
      attributes: [
        {
          id: "",
          name: "",
          type: "",
          items: [
            {
              displayValue: "",
              value: "",
              id: "",
            },
          ],
        },
      ],
      prices: [
        {
          currency: {
            label: "",
            symbol: "",
          },
          amount: 0,
        },
      ],
      brand: "",
      id: "",
    },
    cartItems: [] as CartItem[],
    overlayVisible: false,
    toggleCartOverlay: () => {
      this.setState({ overlayVisible: !this.state.overlayVisible });
    },
    selectedImage: "",
    selectedColor: "Select a color",
  };

  async componentDidMount() {
    const params = window.location.pathname.split("/")[2];
    const description = document.querySelector(".description");
    await fetch(
      "http://localhost:4000?" +
        new URLSearchParams({ query: productQuery(params) })
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ product: res.data.product });
        this.setState({ selectedImage: this.state.product.gallery[0] });
        if (description) {
          description.innerHTML = this.state.product.description;
        }
      });

    console.log(this.state.product);
  }

  render() {
    // const description = this.state.product.description
    //   ?.replace("<p>", "")
    //   .replace("</p>", "");

    return (
      <Container>
        <Header
          toggle={this.state.toggleCartOverlay as () => {}}
          cartItems={this.state.cartItems}
        />
        {this.state.overlayVisible && <div className="dim-overlay"></div>}
        <main>
          <div className="gallery">
            <div className="images-list">
              {this.state.product.gallery.map((image, index) => {
                return (
                  <div
                    className="image"
                    key={index}
                    style={{ backgroundImage: `url(${image})` }}
                  />
                );
              })}
            </div>
            <div
              className="selected-image"
              style={{
                backgroundImage: `url(${this.state.product.gallery[0]})`,
              }}
            />
          </div>
          <div className="content">
            <div className="brand">{this.state.product.brand}</div>
            <div className="name">{this.state.product.name}</div>
            <div className="options">
              {this.state.product.attributes.map((attribute) => {
                return (
                  <div
                    key={attribute.name}
                    className={"attr " + attribute.type}
                  >
                    <div className="attr-name">
                      <p>{attribute.name}</p>
                      {attribute.type == "swatch" && (
                        <p className="selected-value">
                          {" "}
                          {`: ${this.state.selectedColor}`}
                        </p>
                      )}
                    </div>
                    <div className="attr-values">
                      {attribute.items.map((item, index) => {
                        return (
                          <AttrButton
                            attrColor={item.value}
                            key={index}
                            onClick={() => {
                              this.setState({
                                selectedColor: item.displayValue,
                              });
                            }}
                            className={
                              attribute.type == "swatch"
                                ? "attr-value swatch"
                                : "attr-value"
                            }
                          >
                            {attribute.type !== "swatch" && (
                              <div>{item.displayValue}</div>
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
                {this.state.product.prices[0].currency.symbol}{" "}
                {this.state.product.prices[0].amount}
              </div>
            </div>
            <button
              className={
                this.state.product.inStock
                  ? "add-to-cart"
                  : "add-to-cart out-of-stock"
              }
            >
              {this.state.product.inStock ? "Add to Cart" : "OUT OF STOCK"}
            </button>
            <div className="description">{this.state.product.description}</div>
          </div>
        </main>
      </Container>
    );
  }
}
