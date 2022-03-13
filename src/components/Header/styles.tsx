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

      &.active {
        border-bottom: 2px solid #5ece7b;
      }
    }
  }

  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .currency-cart {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
