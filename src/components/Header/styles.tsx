import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
  z-index: 2;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

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
  }

  .filters {
    button {
      height: 80px;
      padding: 0 16px;
      background: transparent;
      border: none;
      font-family: "Raleway", serif;
      font-size: 16px;
      &.active {
        border-bottom: 2px solid #5ece7b;
      }
    }
  }

  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    min-width: 32px;
  }

  .currency-cart {
    display: flex;
    align-items: center;
    justify-content: center;

    .currency {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      img {
        margin-left: 8px;
      }
      .currency-menu {
        appearance: none;
        position: absolute;
        top: 80px;
        background-color: #fff;
        box-shadow: 0px 0px 40px 0px #ccc;

        .currency {
          width: 100%;
          padding-left: 20px;
          padding-right: 40px;

          &:hover {
            background: #ddd;
          }
          p {
            margin: 21px 4px;
          }
        }
      }
    }
  }
`;
