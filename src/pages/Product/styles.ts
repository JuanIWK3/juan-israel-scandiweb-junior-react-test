import { Attribute } from "./../../interfaces";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .dim-overlay {
    background: rgba(57, 55, 72, 0.22);
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media (min-width: 500px) {
      .gallery {
        .images-list {
          width: max-content;
          .image {
            width: 60px;
            height: 60px;
          }
        }

        .selected-image {
          width: 457px;
          height: 382px;
        }
      }
    }

    @media (min-width: 1000px) {
      flex-direction: row;

      .gallery {
        flex-direction: row;

        .images-list {
          flex-direction: column;
          width: max-content;
          .image {
            width: 80px;
            height: 80px;
          }
        }

        .selected-image {
          width: 610px;
          height: 510px;
        }
      }

      .content {
        width: 293px;
        padding: 0;
      }
    }

    @media (min-width: 1400px) {
      width: 1238px;
      .gallery {
        .selected-image {
          margin-left: 100px;
        }
      }
    }
    @media (min-width: 1800px) {
      width: 1664px;
    }
  }

  .gallery {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .images-list {
      display: flex;
      flex-direction: row;
      width: 200px;
      overflow: auto;

      .image {
        width: 40px;
        height: 40px;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
    .selected-image {
      width: 250px;
      height: 204px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;

      @media (min-width: 1400px) {
      }
    }
  }

  .content {
    padding: 20px;

    .brand {
      font-size: 30px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .name {
      font-size: 30px;
      margin-bottom: 43px;
    }

    .options {
      margin-bottom: 40px;

      .attr {
        margin-bottom: 8px;

        .attr-name {
          font-family: Roboto;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .attr-values {
          display: flex;
          flex-wrap: wrap;
          .attr-value {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 63px;
            height: 45px;

            margin-right: 12px;
            margin-bottom: 12px;

            border: 1px solid #1d1f22;
            font-family: Source Sans Pro;
            font-size: 16px;
          }

          .attr-value:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .price-wrapper {
      margin-bottom: 20px;

      .price {
        font-family: Roboto;
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 10px;
      }

      .amount {
        font-family: Raleway;
        font-weight: 700;
        font-size: 24px;
      }
    }

    .add-to-cart {
      width: 292px;
      height: 52px;
      border: none;
      background: #5ece7b;
      color: #fff;
      margin-bottom: 40px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
    }

    .description {
      font-size: 16px;
      font-family: Roboto;
      font-weight: 400;
      line-height: 25.59px;
    }
  }
`;