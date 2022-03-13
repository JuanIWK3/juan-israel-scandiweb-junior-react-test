import React from "react";
import { cartLightImg } from "../../assets";
import Header from "../../components/Header";
import { Product, CartItem } from "../../interfaces";
import { CATEGORY_QUERY } from "../../queries";
import { Container } from "./styles";

export default class Category extends React.Component {
  state = {
    categories: [] as Array<{ name: string; products: Product[] }>,
    cartItems: [] as CartItem[],
    overlayVisible: false,
    toggleCartOverlay: () => {
      this.setState({ overlayVisible: !this.state.overlayVisible });
    },
    addToCart: (product: Product) => {
      let tempCartItems = this.state.cartItems;

      if (tempCartItems.length === 0) {
        tempCartItems.push({ product: product, quantity: 1 });
        this.setState({ cartItems: tempCartItems });

        return;
      }

      for (let i = 0; i < tempCartItems.length; i++) {
        if (tempCartItems[i].product.id === product.id) {
          tempCartItems[i].quantity += 1;
          this.setState({ cartItems: tempCartItems });

          return;
        }
      }

      tempCartItems.push({ product: product, quantity: 1 });
      this.setState({ cartItems: tempCartItems });

      return;
    },
  };

  componentDidMount() {
    fetch(
      "http://localhost:4000?" + new URLSearchParams({ query: CATEGORY_QUERY })
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({ categories: res.data.categories });
      });
  }

  render() {
    return (
      <Container>
        <Header
          toggle={this.state.toggleCartOverlay as () => {}}
          cartItems={this.state.cartItems}
        />
        {this.state.overlayVisible && <div className="dim-overlay"></div>}
        {this.state.categories.map((category) => {
          return (
            <div className="category" key={category.name}>
              <h1 className="category-name">
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </h1>
              <div className="products">
                {category.products.map((product) => {
                  return (
                    <div className="product" key={product.id}>
                      <figure>
                        {!product.inStock && (
                          <div className="out-of-stock">OUT OF STOCK</div>
                        )}
                        <div
                          className="circle"
                          onClick={() => {
                            this.state.addToCart(product);
                          }}
                        >
                          <img src={cartLightImg} alt="" />
                        </div>
                        <div
                          className="product-image"
                          style={{
                            backgroundImage: `url(${product.gallery[0]}`,
                          }}
                        ></div>
                      </figure>
                      <div className="content">
                        <p>{product.name}</p>
                        {product.id}
                        <p>
                          {product.prices[0].currency.symbol}
                          {product.prices[0].amount}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Container>
    );
  }
}
