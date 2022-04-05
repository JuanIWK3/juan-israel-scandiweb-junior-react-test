import styled from 'styled-components';

export const OverlayContainer = styled.div`
  position: relative;
`;

export const Image = styled.div`
  height: 137px;
  width: 105px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${(props: { image: string }) => props.image});
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;

  img {
    cursor: pointer;
    padding: 5px 11px;
    z-index: 2;
  }
`;

export const Badge = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding-bottom: 4px;

  width: 20px;
  height: 20px;
  background-color: #000;
`;

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

      .brand-name {
        font-size: 16px;
        font-weight: 300;
      }

      .price {
        font-size: 16px;
        font-weight: 500;
      }
      .attr {
        font-size: 12px;
      }

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

      img {
        cursor: pointer;
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
