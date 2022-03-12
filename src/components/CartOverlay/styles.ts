import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  justify-content: center;
  flex-direction: column;
  width: 325px;
  background-color: #ddd;

  position: absolute;
  right: 0;
  z-index: 1;

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
`;
