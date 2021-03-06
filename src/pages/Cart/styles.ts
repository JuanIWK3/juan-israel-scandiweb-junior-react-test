import styled from 'styled-components';

export const AttrButton = styled.button`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 51px;
  height: 37px;
  text-align: center;
  margin-right: 12px;
  margin-bottom: 12px;

  border: 1px solid #ccc;
  font-family: Source Sans Pro;
  font-size: 16px;
  cursor: pointer;
  position: relative;

  &.swatch {
    background: ${(props: { attrColor: string }) => props.attrColor};
  }
`;

export const Image = styled.div`
  position: relative;
  .image {
    height: 185px;
    width: 141px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(${(props: { image: string }) => props.image});
    margin: 0 8px;
  }

  .left {
    left: 0;
  }
  .right {
    right: 0;
  }

  .left,
  .right {
    background-color: rgba(255, 255, 255, 0.5);
    padding: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 12px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 80px;
  margin-bottom: 80px;

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
    min-height: 186px;

    .wrapper {
      display: flex;
    }
    .content {
      display: flex;
      flex-direction: column;
      width: 300px;
      justify-content: space-between;

      .brand {
        font-family: Raleway;
        font-weight: 600;
        font-size: 30px;
        margin-bottom: 16px;
      }

      .name {
        font-family: Raleway;
        font-weight: 400;
        font-size: 30px;
        margin-bottom: 16px;
        margin-bottom: 16px;
      }
      .price {
        font-family: Raleway;
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 16px;
      }
      .attributes {
        display: flex;
        flex-direction: column;
        width: max-content;
        .attr {
          display: flex;
          flex-direction: column;
          margin-bottom: 4px;
          .attr-name {
            font-family: Roboto;
            font-weight: 500;
            margin-right: 8px;
            margin-bottom: 4px;
          }
        }
      }
    }

    .quantity {
      width: 45px;
      height: 185px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin-right: 12px;

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
  }

  .cart-item:last-child {
    margin-bottom: 0;
  }
`;
