import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 80px;

  @media (max-width: 1000px) {
    padding: 0 32px;
  }

  @media (min-width: 1000px) {
    width: 812px;
  }

  @media (min-width: 1400px) {
    width: 1238px;
  }
  @media (min-width: 1800px) {
    width: 1664px;
  }

  .cart-item-wrapper {
    width: 100%;
  }

  .title {
    text-align: left;
    margin-top: 8px;
    height: 60px;
    width: 100%;
    font-family: Raleway;
    font-weight: 700;
    font-size: 32px;
  }

  .divider {
    height: 1px;
    width: 100%;
    margin: 20px 0;
    background-color: #e5e5e5;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 186px;

    .wrapper {
      display: flex;
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 300px;

      .brand {
        font-family: Raleway;
        font-weight: 600;
        font-size: 30px;
      }

      .name {
        font-family: Raleway;
        font-weight: 400;
        font-size: 30px;
      }
      .price {
        font-family: Raleway;
        font-weight: 700;
        font-size: 24px;
      }
    }

    .quantity {
      width: 45px;
      height: 185px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      p {
        font-family: Raleway;
        font-size: 24px;
        font-weight: 500;
      }

      img {
        width: 45px;
        height: 45px;
        cursor: pointer;
      }
    }
    figure {
      margin-left: 12px;

      .image {
        height: 185px;
        width: 141px;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }

  .cart-item:last-child {
    margin-bottom: 0;
  }
`;
