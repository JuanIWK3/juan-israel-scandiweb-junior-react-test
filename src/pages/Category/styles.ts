import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .category {
    margin-top: 80px;
    margin-bottom: 100px;
  }

  .category-name {
    font-size: 42px;
    font-weight: 400;
  }

  .dim-overlay {
    background: rgba(57, 55, 72, 0.22);
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .products {
    margin-top: 100px;
    display: grid;
    grid-template-columns: 386px;

    gap: 40px;

    transition: all 0.2s ease-in-out;

    @media (min-width: 1000px) {
      grid-template-columns: 386px 386px;
    }
    @media (min-width: 1400px) {
      grid-template-columns: 386px 386px 386px;
    }
    @media (min-width: 1800px) {
      grid-template-columns: 386px 386px 386px 386px;
    }
    .product {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 386px;
      height: 444px;
      transition: all 0.2s ease-in-out;
      color: #000;

      &:hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);

        figure {
          .circle {
            display: flex;
          }
        }
      }

      figure {
        height: 338px;
        width: 356px;
        display: flex;

        text-align: center;
        margin-bottom: 0;
        position: relative;

        &.out-of-stock {
          .circle {
            cursor: default;
            display: none;
          }
        }

        .out-of-stock {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 255, 255, 0.3);
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          color: #8d8f9a;
          font-size: 24px;
          cursor: pointer;
        }

        .product-image {
          height: 338px;
          width: 356px;
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
        }

        .circle {
          height: 52px;
          width: 52px;
          background-color: #5ece7b;
          border-radius: 50%;
          position: absolute;
          bottom: -26px;
          right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          display: none;
          z-index: 1;
          cursor: pointer;
        }
      }

      .content {
        width: 354px;
        height: 58px;
        padding: 16px;

        .name {
          margin: 0;
          line-height: 28.8px;
          font-family: Raleway;
          font-size: 18px;
          font-weight: 300;
        }
        .price {
          margin: 0;
          line-height: 28.8px;
          font-family: Raleway;
          font-size: 18px;
          font-weight: 500;
        }
      }
    }
  }
`;
