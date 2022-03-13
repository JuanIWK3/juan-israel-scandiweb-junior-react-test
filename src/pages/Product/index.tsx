import React from "react";
import { cartLightImg } from "../../assets";
import Header from "../../components/Header";
import { Product, CartItem } from "../../interfaces";
import { CATEGORY_QUERY, productQuery } from "../../queries";
import { Container } from "./styles";

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
  };

  async componentDidMount() {
    const params = window.location.pathname.split("/")[2];
    await fetch(
      "http://localhost:4000?" +
        new URLSearchParams({ query: productQuery(params) })
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ product: res.data.product });
      });
    console.log(this.state.product);
  }

  render() {
    const description = this.state.product.description
      ?.replace("<p>", "")
      .replace("</p>", "");

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
                  <div className={"attr " + attribute.type}>
                    <div className="attr-name">{attribute.name}:</div>
                    <div className="attr-values">
                      {attribute.items.map((item) => {
                        return (
                          <div className="attr-value">{item.displayValue}</div>
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
            <button className="add-to-cart">ADD TO CART</button>
            <div className="description">{description}</div>
          </div>
        </main>
      </Container>
    );
  }
}
