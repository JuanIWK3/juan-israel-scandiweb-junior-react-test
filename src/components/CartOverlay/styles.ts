import styled from "styled-components";

export const DimOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  display: flex;

  justify-content: center;
  flex-direction: column;
  width: 325px;
  background-color: #fff;

  position: absolute;
  top: 56px;
  right: 0;
  z-index: 2;

  padding: 8px 16px 20px 16px;

  .title {
    margin-top: 8px;
    height: 60px;
  }

  .cart-item {
    display: flex;

    margin-bottom: 41px;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 144px;

      svg:first-child {
        margin-right: 8px;
      }
    }

    .quantity {
      width: 44px;
      height: 137px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    figure {
      height: 137px;
      width: 105px;
      .image {
        height: 137px;
        width: 105px;
        background-position: center;
        background-size: cover;
      }
    }
  }

  .cart-item:last-child {
    margin-bottom: 0;
  }

  .total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    button {
      width: 140px;
      height: 43px;

      cursor: pointer;

      &.bag {
        border: 1px solid #1d1f22;
        background-color: transparent;
      }
      &.check-out {
        color: #fff;
        border: none;
        background-color: #5ece7b;
      }
    }
  }
`;